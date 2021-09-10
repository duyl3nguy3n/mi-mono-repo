import { Component, Input } from '@angular/core';
import { FormElementNodeModel } from '../../../form-builder/models/form-element-node-model';
import { HasNodeModel } from '../../../form-builder/models/has-node-model';

@Component({
  selector: 'silo-metadata-form-group',
  templateUrl: './metadata-form-group.component.html',
  styleUrls: ['./metadata-form-group.component.scss'],
})
export class MetadataFormGroupComponent implements HasNodeModel {
  @Input()
  nodeModel: FormElementNodeModel = null;
}
