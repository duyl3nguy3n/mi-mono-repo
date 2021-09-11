import { Component, OnInit } from '@angular/core';
import {
  customMerge,
  FormElementDefinitionModel,
  FormSingleSelectDefinitionModel,
  LookupConfigModel,
} from '@silo/ngx';

@Component({
  selector: 'silo-definition-model-view',
  templateUrl: './definition-model-view.component.html',
  styleUrls: ['./definition-model-view.component.scss'],
})
export class DefinitionModelViewComponent implements OnInit {
  definitionModel = new FormSingleSelectDefinitionModel();
  lookupConfig = new LookupConfigModel();

  ngOnInit() {
    this.definitionModel.label = 'What is your favorite color?';
    this.definitionModel.fieldSize = 'col-12';
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
