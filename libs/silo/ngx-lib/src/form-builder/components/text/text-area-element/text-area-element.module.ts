import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { newGuid } from '../../../../utils/new-guid';
import { FormTextDefinitionModel } from '../../../models/definitions/form-text-definition-model';
import { FormBuilderRegistryService } from '../../../services/form-builder-registry.service';
import { FormElementDefinitionFormComponent } from '../../form-element-definition-form/form-element-definition-form.component';
import { TextAreaModule } from './../../../../form-field/text/text-area/text-area.module';
import { FormElementContainerModule } from './../../form-element-definition-container/form-element-definition-container.module';
import { TextAreaElementComponent } from './text-area-element.component';

@NgModule({
  imports: [CommonModule, FormElementContainerModule, TextAreaModule],
  declarations: [TextAreaElementComponent],
  exports: [TextAreaElementComponent],
})
export class TextAreaElementModule {
  constructor(formBuilderRegistryService: FormBuilderRegistryService) {
    formBuilderRegistryService.register('TextArea', {
      templateIdentifier: 'TextArea',
      templateDisplayName: 'Text Area',
      dataType: 'Text',
      elementComponent: TextAreaElementComponent,
      definitionFormComponent: FormElementDefinitionFormComponent,
      createDefinitionModel: () => {
        const definitionModel = new FormTextDefinitionModel();
        definitionModel.key = newGuid();
        definitionModel.templateIdentifier = 'TextArea';
        definitionModel.templateDisplayName = 'Text Area';
        definitionModel.label = 'Text Area Label';
        definitionModel.fieldSize = 'col-12';
        return definitionModel;
      },
    });
  }
}
