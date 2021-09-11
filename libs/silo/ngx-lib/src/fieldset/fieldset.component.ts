import { Component, Input } from '@angular/core';

@Component({
  selector: 'silo-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent {
  @Input()
  legend = '';

  @Input()
  legendStyle: 'legend' | 'label' = 'legend';
}
