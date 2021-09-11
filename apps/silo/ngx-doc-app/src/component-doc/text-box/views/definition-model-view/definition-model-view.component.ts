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
    this.textDefinitionModel.label = 'Name';
    this.textDefinitionModel.placeholder = 'First Last';
    this.textDefinitionModel.hint = 'Please enter your name';
  }

  updateTextDefinitionModel(formValue: FormElementDefinitionModel): void {
    this.textDefinitionModel = customMerge(this.textDefinitionModel, formValue);
  }
}
