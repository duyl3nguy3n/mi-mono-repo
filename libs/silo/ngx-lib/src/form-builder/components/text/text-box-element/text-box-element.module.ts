import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextBoxModule } from '../../../../form-field/text/text-box/text-box.module';
import { newGuid } from '../../../../utils/new-guid';
import { FormTextDefinitionModel } from '../../../models/definitions/form-text-definition-model';
import { FormBuilderRegistryService } from '../../../services/form-builder-registry.service';
import { FormElementDefinitionFormComponent } from '../../form-element-definition-form/form-element-definition-form.component';
import { FormElementContainerModule } from './../../form-element-definition-container/form-element-definition-container.module';
import { TextBoxElementComponent } from './text-box-element.component';

@NgModule({
  imports: [CommonModule, FormElementContainerModule, TextBoxModule],
  declarations: [TextBoxElementComponent],
  exports: [TextBoxElementComponent],
})
export class TextBoxElementModule {
  constructor(formBuilderRegistryService: FormBuilderRegistryService) {
    formBuilderRegistryService.register('TextBox', {
      templateIdentifier: 'TextBox',
      templateDisplayName: 'Text Box',
      dataType: 'Text',
      elementComponent: TextBoxElementComponent,
      definitionFormComponent: FormElementDefinitionFormComponent,
      createDefinitionModel: () => {
        const definitionModel = new FormTextDefinitionModel();
        definitionModel.key = newGuid();
        definitionModel.templateIdentifier = 'TextBox';
        definitionModel.templateDisplayName = 'Text Box';
        definitionModel.label = 'Text Box Label';
        return definitionModel;
      },
    });
  }
}
