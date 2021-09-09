import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClassExpression } from '../../responsive/responsive-container/models/class-expression';
import { newHtmlId } from '../../utils/new-html-id';
import { LookupConfigModel } from '../models/lookup-config-model';
import { LookupModel } from '../models/lookup-model';
import { ValidatorService } from '../services/validator.service';
import { MultiSelectValidatorFactory } from './multi-select-validator.factory';

@Component({
  template: '',
})
export abstract class MultiSelectFieldComponent implements OnInit {
  formGroup!: FormGroup;

  lookupListFormControl!: FormControl;

  hasValidators = false;

  labelId = newHtmlId();

  describebyId = newHtmlId();

  options: Array<LookupModel> = [];

  @Input()
  label = '';

  @Input()
  hint = '';

  @Input()
  isReadOnly = false;

  @Input()
  isRequired = false;

  @Input()
  defaultValue: Array<LookupModel> = [];

  @Input()
  fieldSize: ClassExpression = 'col-2';

  @Input()
  fieldOutlineSize: ClassExpression;

  @Input()
  set lookupConfig(lookupConfig: LookupConfigModel) {
    this.options = lookupConfig.lookups;
  }

  constructor(
    protected _elementRef: ElementRef<HTMLElement>,
    protected _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.setForm(this.defaultValue);
  }

  setForm(value: Array<LookupModel>): void {
    const validators = MultiSelectValidatorFactory.createValidators(this);
    this.hasValidators = !!validators.length;
    this.lookupListFormControl = this._formBuilder.control(value, validators);
    this.formGroup = this._formBuilder.group({
      lookupList: this.lookupListFormControl,
    });
  }

  clearForm($event: Event): void {
    $event.stopPropagation();
    this.lookupListFormControl.setValue(null);
  }

  getErrorMessage(): string {
    return ValidatorService.getFormGroupErrorMessage(this.formGroup);
  }

  compareWith(o1: LookupModel, o2: LookupModel): boolean {
    return o1 && o2 && o1.key === o2.key;
  }

  isSelected(option: LookupModel): boolean {
    const valueList = this.lookupListFormControl.value as Array<LookupModel>;
    return valueList && !!valueList.find((x) => x.key === option.key);
  }

  selectAll() {
    this.lookupListFormControl.setValue(this.options);
  }

  clearAll() {
    this.lookupListFormControl.reset();
  }
}
