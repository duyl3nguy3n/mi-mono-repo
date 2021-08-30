import { Component, Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { render } from '@testing-library/angular';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SaveSubject } from './save-subject';

class PersonDto {
  constructor(
    public id: string,
    public name: { firstName: string; lastName: string },
    public age: number,
  ) {}
}

class PersonModel extends PersonDto {}

@Injectable()
class TestHttpService {
  getPerson(id: string) {
    const responseDto = new PersonDto(
      id,
      { firstName: 'John', lastName: 'Doe' },
      30,
    );
    return of(responseDto);
  }

  postPerson(personDto: PersonDto) {
    return of(personDto);
  }
}

@Injectable()
class TestService {
  constructor(private _testHttpService: TestHttpService) {}

  getPerson(id: string) {
    return this._testHttpService.getPerson(id);
  }

  savePerson(personDto: PersonDto) {
    return this._testHttpService.postPerson(personDto);
  }
}

@Component({
  template: '',
})
class TestComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<boolean>();
  isLoading = false;

  personDto: PersonDto;

  saveDebounceTime = 1000;
  saveSubject: SaveSubject<PersonDto, PersonModel>;
  personFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public testService: TestService,
  ) {}

  setSaveDebounceConfig() {
    this.saveSubject = new SaveSubject<
      PersonDto,
      PersonModel
    >().setupDebounceConfig(
      this.testService.savePerson.bind(this.testService),
      (response) => {
        this.setPersonDto(response);
      },
      null,
      this.saveDebounceTime,
      this._destroy$,
    );
    this.saveSubject.isSaving$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isSaving) => {
        this.isLoading = isSaving;
      });
  }

  getData() {
    this.testService.getPerson('john.doe').subscribe((personDto) => {
      this.setPersonDto(personDto);
      this.setForm(personDto);
    });
  }

  setPersonDto(personDto: PersonDto) {
    this.personDto = personDto;
  }

  setForm(personDto: PersonDto) {
    this.personFormGroup = this._formBuilder.group({
      id: personDto.id,
      name: this._formBuilder.group({
        firstName: this._formBuilder.control(personDto.name.firstName),
        lastName: this._formBuilder.control(personDto.name.lastName),
      }),
      age: this._formBuilder.control(personDto.age),
    });
    this.saveSubject.setPreviousSubject(personDto);
    this.personFormGroup.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => this.saveSubject.save$.next(value));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

const setup = async () => {
  const renderResult = await render(TestComponent, {
    providers: [TestHttpService, TestService, FormBuilder],
  });
  const fixture = renderResult.fixture;
  const testComponent = fixture.componentInstance;

  return { renderResult, fixture, testComponent };
};

describe('SaveSubject', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.useFakeTimers('modern');
  });

  it('should compile', async () => {
    const { testComponent } = await setup();
    expect(testComponent).toBeTruthy();
  });

  it('should only save latest person even if its called multiple time in less than 1 sec', async () => {
    // arrange
    const { testComponent } = await setup();
    testComponent.saveDebounceTime = 1000;
    testComponent.setSaveDebounceConfig();
    testComponent.getData();
    const setPersonDtoSpy = spyOn(testComponent, 'setPersonDto');

    // act
    const firstNameFormControl = testComponent.personFormGroup.get(
      'name.firstName',
    );
    firstNameFormControl.setValue('M');
    firstNameFormControl.setValue('Ma');
    firstNameFormControl.setValue('Mar');
    firstNameFormControl.setValue('Mary');

    // assert
    jest.advanceTimersByTime(999);
    expect(setPersonDtoSpy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(setPersonDtoSpy).toHaveBeenCalledWith(
      new PersonDto('john.doe', { firstName: 'Mary', lastName: 'Doe' }, 30),
    );
  });

  it('should not save when new person is still the same person', async () => {
    // arrange
    const { testComponent } = await setup();
    testComponent.saveDebounceTime = 1000;
    testComponent.setSaveDebounceConfig();
    testComponent.getData();
    const setPersonDtoSpy = spyOn(testComponent, 'setPersonDto');

    // act
    const firstNameFormControl = testComponent.personFormGroup.get(
      'name.firstName',
    );
    firstNameFormControl.setValue('John');

    // assert
    jest.advanceTimersByTime(999);
    expect(setPersonDtoSpy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(setPersonDtoSpy).not.toHaveBeenCalled();
  });
});
