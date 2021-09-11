import { ComponentRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { instanceOfGetFormValue } from './get-form-value';

/**
 * The instance model for a form element.
 */
export class FormElementInstanceModel {
  componentRef!: ComponentRef<unknown>;

  isActive = false;

  /** Form group reference for any element */
  formGroup = new FormGroup({});

  /** Form array reference when element is an array or a list */
  formArray?: FormArray;

  /** Checks of element component is an instance that implements getFormValue() */
  get instanceOfGetFormValue() {
    return instanceOfGetFormValue(this.componentRef?.instance);
  }

  /** If element component implements getFormValue(), return that form value */
  get formValueInstance(): unknown | undefined {
    return instanceOfGetFormValue(this.componentRef?.instance)
      ? this.componentRef?.instance?.getFormValue()
      : undefined;
  }
}
