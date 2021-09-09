import { Component, Input, OnInit } from '@angular/core';
import { FormTextDefinitionModel } from '../../../models/definitions/form-text-definition-model';
import { FormElementNodeModel } from '../../../models/form-element-node-model';
import { HasNodeModel } from '../../../models/has-node-model';

@Component({
  selector: 'silo-text-area-element',
  templateUrl: './text-area-element.component.html',
  styleUrls: ['./text-area-element.component.scss'],
})
export class TextAreaElementComponent implements OnInit, HasNodeModel {
  textDefinitionModel: FormTextDefinitionModel;

  @Input()
  nodeModel: FormElementNodeModel;

  ngOnInit() {
    this.textDefinitionModel = this.nodeModel
      .definitionModel as FormTextDefinitionModel;
  }
}
