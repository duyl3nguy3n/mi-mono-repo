import { ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { instanceOfGetFormValue } from './get-form-value';

/**
 * The instance model for a form element.
 */
export class FormElementInstanceModel {
  componentRef!: ComponentRef<unknown>;

  isActive = false;

  formGroup = new FormGroup({});

  get instanceOfGetFormValue() {
    return instanceOfGetFormValue(this.componentRef?.instance);
  }

  get formValueInstance(): unknown | undefined {
    return instanceOfGetFormValue(this.componentRef?.instance)
      ? this.componentRef?.instance?.getFormValue()
      : undefined;
  }
}
