import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MetadataTemplateRegistryService } from '../../../metadata/metadata-form/services/metadata-template-registry.service';
import { ResponsiveContainerModule } from '../../../responsive/responsive-container/responsive-container.module';
import { LabelModule } from './../../label/label.module';
import { TextAreaComponent } from './text-area.component';

@NgModule({
  imports: [
    CommonModule,
    LabelModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ResponsiveContainerModule,
  ],
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent],
})
export class TextAreaModule {
  constructor(
    metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {
    metadataTemplateRegistryService.register('TextArea', {
      templateIdentifier: 'TextArea',
      metadataComponent: TextAreaComponent,
    });
  }
}
