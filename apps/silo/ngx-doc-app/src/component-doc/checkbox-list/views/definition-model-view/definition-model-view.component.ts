import { Component, OnInit } from '@angular/core';
import {
  FormElementDefinitionModel,
  FormMultiSelectDefinitionModel,
} from '@silo/ngx';
import { merge } from 'lodash';

@Component({
  selector: 'silo-definition-model-view',
  templateUrl: './definition-model-view.component.html',
  styleUrls: ['./definition-model-view.component.scss'],
})
export class DefinitionModelViewComponent implements OnInit {
  definitionModel = new FormMultiSelectDefinitionModel();

  ngOnInit() {
    this.definitionModel.label = 'Check all that apply to you';
    this.definitionModel.fieldSize = 'col-12';
  }

  updateDefinitionModel(formValue: FormElementDefinitionModel): void {
    merge(this.definitionModel, formValue);
  }
}
