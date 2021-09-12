import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { LookupModel } from '../../models/lookup-model';
import { SingleSelectFieldComponent } from '../single-select-field.component';

@Component({
  selector: 'silo-single-autocomplete',
  templateUrl: './single-autocomplete.component.html',
  styleUrls: ['./single-autocomplete.component.scss'],
})
export class SingleAutocompleteComponent
  extends SingleSelectFieldComponent
  implements OnInit, AfterViewInit {
  filterFormControl = new FormControl();

  filteredOptions: Observable<Array<LookupModel>>;

  @ViewChild('textarea', { static: false })
  textarea: ElementRef<HTMLTextAreaElement>;

  ngOnInit() {
    super.ngOnInit();
    this.setFilterForm();
  }

  ngAfterViewInit() {
    this.setTextAreaHeightInReadOnly();
  }

  setFilterForm() {
    if (this.isReadOnly) {
      this.filterFormControl.setValue(this.defaultValue?.displayName);
    } else {
      this.filteredOptions = this.filterFormControl.valueChanges.pipe(
        startWith(''),
        tap((value) => {
          this.lookupFormControl.setValue(
            typeof value !== 'string' ? value : null,
          );
          this.formGroup.markAsDirty();
        }),
        map((value) =>
          typeof value === 'string' ? value : value?.displayName,
        ),
        map((value) => this._filter(value)),
      );
    }
  }

  displayLookupDisplayName(option: LookupModel): string {
    return option?.displayName || '';
  }

  clearFilterForm() {
    // if user didn't select an option then we should clear filter
    // NOTE: schedule to do this next 0.1 sec where filter form control value has been updated with actual user value
    setTimeout(() => {
      if (typeof this.filterFormControl.value !== 'object') {
        this.filterFormControl.setValue('');
      }
    }, 100);
  }

  clearForm($event: Event) {
    $event.stopPropagation();
    this.lookupFormControl.setValue(null);
    this.filterFormControl.setValue(null);
  }

  private _filter(value: string) {
    const filterValue = value?.toLowerCase().trim();
    return filterValue
      ? this.options.filter((o) =>
          o.displayName.toLowerCase().includes(filterValue),
        )
      : this.options.slice();
  }

  setTextAreaHeightInReadOnly(): void {
    if (!this.isReadOnly || !this.textarea) {
      return;
    }
    // NOTE: On refresh, scroll height may not be accurate so do this next cycle
    setTimeout(() => {
      this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
    });
  }
}
