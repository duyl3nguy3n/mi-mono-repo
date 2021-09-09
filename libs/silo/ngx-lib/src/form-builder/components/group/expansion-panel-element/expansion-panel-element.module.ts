import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpansionPanelModule } from '../../../../expansion-panel/expansion-panel.module';
import { newGuid } from '../../../../utils/new-guid';
import { FormGroupDefinitionModel } from '../../../models/definitions/form-group-definition-model';
import { FormBuilderRegistryService } from '../../../services/form-builder-registry.service';
import { FormElementDefinitionFormComponent } from '../../form-element-definition-form/form-element-definition-form.component';
import { FormElementPortalModule } from '../../form-element-portal/form-element-portal.module';
import { FormElementContainerModule } from './../../form-element-definition-container/form-element-definition-container.module';
import { ExpansionPanelElementComponent } from './expansion-panel-element.component';

@NgModule({
  imports: [
    CommonModule,
    ExpansionPanelModule,
    FormElementContainerModule,
    FormElementPortalModule,
  ],
  declarations: [ExpansionPanelElementComponent],
  exports: [ExpansionPanelElementComponent],
})
export class ExpansionPanelElementModule {
  constructor(formBuilderRegistryService: FormBuilderRegistryService) {
    formBuilderRegistryService.register('ExpansionPanel', {
      templateIdentifier: 'ExpansionPanel',
      templateDisplayName: 'Expansion Panel',
      dataType: 'Object',
      elementComponent: ExpansionPanelElementComponent,
      definitionFormComponent: FormElementDefinitionFormComponent,
      createDefinitionModel: () => {
        const definitionModel = new FormGroupDefinitionModel();
        definitionModel.key = newGuid();
        definitionModel.templateIdentifier = 'ExpansionPanel';
        definitionModel.templateDisplayName = 'Expansion Panel';
        definitionModel.title = 'Expansion Panel Title';
        return definitionModel;
      },
    });
  }
}
