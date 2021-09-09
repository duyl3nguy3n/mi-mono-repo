import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetadataFormElementPortalModule } from '../metadata-form-element-portal/metadata-form-element-portal.module';
import { MetadataTemplateRegistryService } from '../services/metadata-template-registry.service';
import { MetadataFormGroupComponent } from './metadata-form-group.component';

@NgModule({
  imports: [CommonModule, MetadataFormElementPortalModule],
  declarations: [MetadataFormGroupComponent],
  exports: [MetadataFormGroupComponent],
})
export class MetadataFormGroupModule {
  constructor(
    metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {
    metadataTemplateRegistryService.register('FormGroup', {
      templateIdentifier: 'FormGroup',
      metadataComponent: MetadataFormGroupComponent,
    });
  }
}
