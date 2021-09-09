import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ClassExpression } from './models/class-expression';

@Directive({
  selector: '[siloResponsiveContainer]',
})
export class ResponsiveContainerDirective implements OnInit {
  static readonly RESPONSIVE_CONTAINER_CLASS = 'silo-responsive-container';

  @Input('siloResponsiveContainer')
  classExpression: ClassExpression;

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.addClassExpression(this.classExpression);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.classExpression && !changes.classExpression.isFirstChange()) {
      this.removeClassExpression(changes.classExpression.previousValue);
      this.addClassExpression(changes.classExpression.currentValue);
    }
  }

  addClassExpression(classExpression: ClassExpression) {
    if (!classExpression) {
      return;
    }

    this._elementRef.nativeElement.classList.add(
      ResponsiveContainerDirective.RESPONSIVE_CONTAINER_CLASS,
    );

    if (Array.isArray(classExpression)) {
      this._elementRef.nativeElement.classList.add(...classExpression);
      return;
    }

    if (typeof classExpression === 'string') {
      classExpression
        .split(',')
        .map((c) => c.trim())
        .filter(
          (c) => c && !this._elementRef.nativeElement.classList.contains(c),
        )
        .forEach((c) => {
          this._elementRef.nativeElement.classList.add(c);

          // if this is a start of inline block, insert a div before
          if (c === 'inline-block--start') {
            this._elementRef.nativeElement.before(
              document.createElement('div'),
            );
          }
        });
      return;
    }

    if (typeof classExpression === 'object') {
      Object.keys(classExpression)
        .filter(
          (key) =>
            classExpression[key] &&
            !this._elementRef.nativeElement.classList.contains(key),
        )
        .forEach((key) => {
          this._elementRef.nativeElement.classList.add(key);
        });
      return;
    }
  }

  removeClassExpression(classExpression: ClassExpression) {
    if (!classExpression) {
      return;
    }

    if (Array.isArray(classExpression)) {
      this._elementRef.nativeElement.classList.remove(...classExpression);
      return;
    }

    if (typeof classExpression === 'string') {
      classExpression
        .split(',')
        .map((c) => c.trim())
        .filter(
          (c) => c && this._elementRef.nativeElement.classList.contains(c),
        )
        .forEach((c) => {
          this._elementRef.nativeElement.classList.remove(c);

          // if this was a start of inline block, remove the before div that was inserted
          if (c === 'inline-block--start') {
            this._elementRef.nativeElement.previousElementSibling?.remove();
          }
        });
      return;
    }

    if (typeof classExpression === 'object') {
      Object.keys(classExpression)
        .filter((key) => this._elementRef.nativeElement.classList.contains(key))
        .forEach((key) => {
          this._elementRef.nativeElement.classList.remove(key);
        });
      return;
    }
  }
}
