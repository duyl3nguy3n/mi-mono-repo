import { Component, OnInit } from '@angular/core';
import {
  customMerge,
  FormElementDefinitionModel,
  FormMultiSelectDefinitionModel,
  LookupConfigModel,
} from '@silo/ngx';

@Component({
  selector: 'silo-definition-model-view',
  templateUrl: './definition-model-view.component.html',
  styleUrls: ['./definition-model-view.component.scss'],
})
export class DefinitionModelViewComponent implements OnInit {
  definitionModel = new FormMultiSelectDefinitionModel();
  lookupConfig = new LookupConfigModel();

  ngOnInit() {
    this.definitionModel.label =
      'Which of the following electronic devices do you own?';
    this.definitionModel.hint = 'Check all that apply';
    this.definitionModel.fieldSize = 'col-12';
    this.definitionModel.options = [
      { key: '1', displayName: 'Laptop' },
      { key: '2', displayName: 'Phone' },
      { key: '3', displayName: 'Tablet' },
    ];
    this.setLookupConfig();
  }

  setLookupConfig() {
    this.lookupConfig = new LookupConfigModel();
    this.lookupConfig.lookups = this.definitionModel.options;
  }

  updateDefinitionModel(formValue: FormElementDefinitionModel): void {
    this.definitionModel = customMerge(this.definitionModel, formValue);
    this.setLookupConfig();
  }
}
