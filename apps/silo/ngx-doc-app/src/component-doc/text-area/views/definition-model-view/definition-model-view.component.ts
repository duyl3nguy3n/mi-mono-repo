import { Component, OnInit } from '@angular/core';
import {
  customMerge,
  FormElementDefinitionModel,
  FormTextDefinitionModel,
} from '@silo/ngx';

@Component({
  selector: 'silo-definition-model-view',
  templateUrl: './definition-model-view.component.html',
  styleUrls: ['./definition-model-view.component.scss'],
})
export class DefinitionModelViewComponent implements OnInit {
  textDefinitionModel = new FormTextDefinitionModel();

  ngOnInit() {
    this.textDefinitionModel.label = 'Describe work experience';
    this.textDefinitionModel.placeholder =
      'Example: previous project, daily responsibility, etc.';
    this.textDefinitionModel.fieldSize = 'col-12';
  }

  updateTextDefinitionModel(formValue: FormElementDefinitionModel): void {
    this.textDefinitionModel = customMerge(this.textDefinitionModel, formValue);
  }
}
