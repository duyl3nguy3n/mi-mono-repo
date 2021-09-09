import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldsetModule } from '../../fieldset/fieldset.module';
import { MetadataTemplateRegistryService } from '../services/metadata-template-registry.service';
import { MetadataFormListComponent } from './metadata-form-list.component';

@NgModule({
  imports: [CommonModule, FieldsetModule, MatButtonModule, MatIconModule],
  declarations: [MetadataFormListComponent],
  exports: [MetadataFormListComponent],
})
export class MetadataFormListModule {
  constructor(
    metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {
    metadataTemplateRegistryService.register('FormList', {
      templateIdentifier: 'FormList',
      metadataComponent: MetadataFormListComponent,
    });
  }
}
