import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Focusable } from '../..';
import { AutoFocusDirective } from '../../directives/auto-focus/auto-focus.directive';
import { GetFormValue } from '../../form-builder/models/get-form-value';
import { ClassExpression } from '../../responsive/responsive-container/models/class-expression';
import { newHtmlId } from '../../utils/new-html-id';
import { ValidatorService } from '../services/validator.service';
import { TextValidatorFactory } from './text-validator.factory';

@Component({
  template: '',
})
export abstract class TextFieldComponent
  implements OnInit, AfterViewInit, GetFormValue, Focusable {
  formGroup!: FormGroup;

  textFormControl!: FormControl;

  hasValidators = false;

  labelId = newHtmlId();

  describebyId = newHtmlId();

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
  minLength?: number;

  @Input()
  maxLength = 250;

  @Input()
  defaultValue = '';

  @Input()
  fieldSize: ClassExpression = 'col-2';

  @Input()
  fieldOutlineSize: ClassExpression;

  @ViewChild('textarea', { static: true })
  textarea?: ElementRef<HTMLTextAreaElement>;

  constructor(
    protected _elementRef: ElementRef<HTMLElement>,
    protected _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.setForm(this.defaultValue);
  }

  ngAfterViewInit(): void {
    this.setTextAreaHeightInReadOnly();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isRequired && !changes.isRequired.isFirstChange()) {
      this.setForm(this.textFormControl.value);
    }
    if (changes.defaultValue && !changes.defaultValue.isFirstChange()) {
      this.textFormControl.setValue(this.defaultValue);
    }
  }

  focus() {
    AutoFocusDirective.focusFirstFocusable(this._elementRef);
  }

  setForm(value: string): void {
    const validators = TextValidatorFactory.createValidators(this);
    this.hasValidators = !!validators.length;
    this.textFormControl = this._formBuilder.control(value, validators);
    this.formGroup = this._formBuilder.group({
      text: this.textFormControl,
    });
  }

  clearForm(): void {
    this.textFormControl.setValue(null);
  }

  getErrorMessage(): string {
    return ValidatorService.getFormControlErrorMessage(this.textFormControl);
  }

  getFormValue(): string {
    return this.textFormControl.value;
  }

  setTextAreaHeightInReadOnly(): void {
    if (!this.isReadOnly || !this.textarea) {
      return;
    }
    // NOTE: On refresh, scroll height may not be accurate so do this next cycle
    setTimeout(() => {
      if (this.textarea) {
        this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
      }
    });
  }
}
