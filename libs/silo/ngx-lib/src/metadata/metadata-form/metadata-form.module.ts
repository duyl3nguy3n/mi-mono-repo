import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetadataFormElementPortalModule } from '../metadata-form-element-portal/metadata-form-element-portal.module';
import { MetadataFormGroupModule } from '../metadata-form-group/metadata-form-group.module';
import { MetadataFormComponent } from './metadata-form.component';

@NgModule({
  imports: [
    CommonModule,
    MetadataFormElementPortalModule,
    MetadataFormGroupModule,
  ],
  declarations: [MetadataFormComponent],
  exports: [MetadataFormComponent],
})
export class MetadataFormModule {}
