import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClassExpression } from '../../responsive/responsive-container/models/class-expression';
import { newHtmlId } from '../../utils/new-html-id';
import { LookupModel } from '../models/lookup-model';
import { ValidatorService } from '../services/validator.service';
import { CustomDateAdapter, NativeDate } from './custom-date-adapter';
import { DateValidatorFactory } from './date-validator.factory';

@Component({
  template: '',
})
export abstract class DateFieldComponent implements OnInit {
  formGroup!: FormGroup;

  dateFormControl!: FormControl;

  hasValidators = false;

  labelId = newHtmlId();

  describebyId = newHtmlId();

  options: Array<LookupModel> = [];

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  hint = '';

  @Input()
  isReadOnly = false;

  @Input()
  isRequired = false;

  @Input()
  defaultValue: NativeDate = null;

  @Input()
  fieldSize: ClassExpression = 'col-2';

  @Input()
  fieldOutlineSize: ClassExpression;

  constructor(protected _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setForm(this.defaultValue);
  }

  setForm(value: NativeDate): void {
    const validators = DateValidatorFactory.createValidators(this);
    this.hasValidators = !!validators.length;
    this.dateFormControl = this._formBuilder.control(
      CustomDateAdapter.toLocaleDate(value),
      validators,
    );
    this.formGroup = this._formBuilder.group({
      date: this.dateFormControl,
    });
  }

  clearForm($event: Event): void {
    $event.stopPropagation();
    this.dateFormControl.setValue(null);
  }

  getErrorMessage(): string {
    return ValidatorService.getFormGroupErrorMessage(this.formGroup);
  }

  compareWith(o1: LookupModel, o2: LookupModel): boolean {
    return o1 && o2 && o1.key === o2.key;
  }
}
