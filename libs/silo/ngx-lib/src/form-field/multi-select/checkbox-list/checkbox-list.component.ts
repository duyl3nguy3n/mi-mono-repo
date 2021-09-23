import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ClassExpression } from '../../../responsive/responsive-container/models/class-expression';
import { MultiSelectFieldComponent } from '../multi-select-field.component';

@Component({
  selector: 'silo-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent extends MultiSelectFieldComponent {
  @ViewChildren(MatListOption)
  matListOptions: QueryList<MatListOption>;

  @Input()
  fieldSize: ClassExpression = 'col-6';
}
