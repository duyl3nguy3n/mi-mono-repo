import { Component, OnInit } from '@angular/core';
import { FormElementDefinitionModel, FormTextDefinitionModel } from '@silo/ngx';
import { merge } from 'lodash';

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
    merge(this.textDefinitionModel, formValue);
  }
}
