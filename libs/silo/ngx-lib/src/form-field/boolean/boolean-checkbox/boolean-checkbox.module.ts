import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MetadataTemplateRegistryService } from '../../../metadata/metadata-form/services/metadata-template-registry.service';
import { ResponsiveContainerModule } from '../../../responsive/responsive-container/responsive-container.module';
import { BooleanCheckboxComponent } from './boolean-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ResponsiveContainerModule,
  ],
  declarations: [BooleanCheckboxComponent],
  exports: [BooleanCheckboxComponent],
})
export class BooleanCheckboxModule {
  constructor(
    metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {
    metadataTemplateRegistryService.register('BooleanCheckbox', {
      templateIdentifier: 'BooleanCheckbox',
      metadataComponent: BooleanCheckboxComponent,
    });
  }
}
