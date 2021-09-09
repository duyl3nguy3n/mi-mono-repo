import { Component, Input, OnInit } from '@angular/core';
import { FormBooleanDefinitionModel } from '../../../models/definitions/form-boolean-definition-model';
import { FormElementNodeModel } from '../../../models/form-element-node-model';
import { HasNodeModel } from '../../../models/has-node-model';

@Component({
  selector: 'silo-boolean-checkbox-element',
  templateUrl: './boolean-checkbox-element.component.html',
  styleUrls: ['./boolean-checkbox-element.component.scss'],
})
export class BooleanCheckboxElementComponent implements OnInit, HasNodeModel {
  booleanDefinitionModel!: FormBooleanDefinitionModel;

  @Input()
  nodeModel!: FormElementNodeModel;

  ngOnInit() {
    this.booleanDefinitionModel = this.nodeModel
      .definitionModel as FormBooleanDefinitionModel;
  }
}
