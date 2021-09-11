import { Component, Input, ViewChild } from '@angular/core';
import { MetadataFormComponent } from '../../..';
import { MetadataModel } from '../../../../../metadata-lib/src';

@Component({
  selector: 'silo-metadata-form-list-item',
  templateUrl: './metadata-form-list-item.component.html',
  styleUrls: ['./metadata-form-list-item.component.scss'],
})
export class MetadataFormListItemComponent {
  @Input()
  index = 0;

  @Input()
  metadataModel!: MetadataModel;

  @ViewChild(MetadataFormComponent)
  metadataForm!: MetadataFormComponent;

  get formValueInstance() {
    return this.metadataForm.nodeModel.formValueInstance;
  }
}
