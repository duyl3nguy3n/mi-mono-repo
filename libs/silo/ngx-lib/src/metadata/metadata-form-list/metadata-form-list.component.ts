import { Component, Input } from '@angular/core';
import { FormElementNodeModel } from '../../form-builder/models/form-element-node-model';
import { HasNodeModel } from '../../form-builder/models/has-node-model';

@Component({
  selector: 'silo-metadata-form-list',
  templateUrl: './metadata-form-list.component.html',
  styleUrls: ['./metadata-form-list.component.scss'],
})
export class MetadataFormListComponent implements HasNodeModel {
  @Input()
  nodeModel: FormElementNodeModel = null;
}
