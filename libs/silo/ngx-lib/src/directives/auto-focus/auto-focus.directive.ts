import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';

/**
 * @description
 * This directive will auto focus HTMLElement that it is on when element is first rendered.
 *
 * @usageNotes
 * ```html
 * <!-- auto focus first focusable child in this div -->
 * <div siloAutoFocus>...<div>
 *
 * <!-- auto focus this div since its focusable -->
 * <div siloAutoFocus tabindex=0>...</div>
 *
 * <!-- conditionally enable/disable this directive -->
 * <div [siloAutoFocus]="isEnable">...</div>
 *
 * <!-- auto focus first element with id or class "header" -->
 * <div siloAutoFocus focusChildSelectors=".header, #header">...</div>
 * ```
 */
@Directive({
  selector: '[siloAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  static readonly DEFAULT_SELECTORS =
    '[tabindex]:not([tabindex="-1"]), button, input, textarea';

  /**
   * Reference to last focus element.
   */
  lastFocusElement: HTMLElement | null = null;

  /**
   * Indicate whether this directive is enable.
   * Note: If nothing is bind, this will be empty string which will be treated as enable anyway.
   */
  @Input('siloAutoFocus')
  isEnable = true;

  /**
   * First child that match the specified group of selectors will be focus.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll}
   */
  @Input()
  focusChildSelectors = '';

  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
  ) {}

  static focusFirstFocusable(
    elementRef: ElementRef<HTMLElement> | HTMLElement,
    selectors: string = this.DEFAULT_SELECTORS,
  ): HTMLElement | null {
    const element =
      elementRef instanceof ElementRef
        ? (elementRef as ElementRef<HTMLElement>).nativeElement
        : elementRef;

    // self focus
    if (element.tabIndex === 0) {
      element.focus();
      return element;
    }

    // find focusable
    const focusable = element.querySelectorAll(selectors);
    if (!focusable.length) {
      return null;
    }

    const firstFocusable = Array.from(focusable).find((x: any) => {
      if (x.disabled !== undefined) {
        return !x.disabled;
      }
      return true;
    });
    (firstFocusable as HTMLElement)?.focus();
    return <HTMLElement>firstFocusable;
  }

  ngAfterViewInit() {
    this.focusFirstFocusable(
      this.focusChildSelectors || AutoFocusDirective.DEFAULT_SELECTORS,
    );
  }

  /**
   * Focus first child element that match the specified group of selectors.
   */
  focusFirstFocusable(selectors: string) {
    if (this.isEnable === false) {
      return;
    }

    // self focus
    if (
      this._elementRef.nativeElement.tabIndex === 0 &&
      !this.focusChildSelectors
    ) {
      this._elementRef.nativeElement.focus();
      this.lastFocusElement = this._elementRef.nativeElement;
      return;
    }

    this.lastFocusElement = AutoFocusDirective.focusFirstFocusable(
      this._elementRef,
      selectors,
    );

    this._cdr.detectChanges();
  }
}
