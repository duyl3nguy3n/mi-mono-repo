import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDefinitionModel } from '../../../models/definitions/form-group-definition-model';
import { FormElementNodeModel } from '../../../models/form-element-node-model';
import { HasNodeModel } from '../../../models/has-node-model';

@Component({
  selector: 'silo-expansion-panel-element',
  templateUrl: './expansion-panel-element.component.html',
  styleUrls: ['./expansion-panel-element.component.scss'],
})
export class ExpansionPanelElementComponent implements OnInit, HasNodeModel {
  definitionModel: FormGroupDefinitionModel;

  @Input()
  nodeModel: FormElementNodeModel;

  ngOnInit() {
    this.definitionModel = this.nodeModel
      .definitionModel as FormGroupDefinitionModel;
  }
}
