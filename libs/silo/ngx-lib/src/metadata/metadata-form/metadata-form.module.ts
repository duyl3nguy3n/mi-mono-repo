import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutoFocusModule } from '../../directives/auto-focus/auto-focus.module';
import { FieldsetModule } from '../../fieldset/fieldset.module';
import { MetadataFormElementPortalComponent } from './metadata-form-element-portal/metadata-form-element-portal.component';
import { MetadataFormGroupComponent } from './metadata-form-group/metadata-form-group.component';
import { MetadataFormListItemComponent } from './metadata-form-list-item/metadata-form-list-item.component';
import { MetadataFormListComponent } from './metadata-form-list/metadata-form-list.component';
import { MetadataFormComponent } from './metadata-form.component';
import { MetadataTemplateRegistryService } from './services/metadata-template-registry.service';

@NgModule({
  imports: [
    AutoFocusModule,
    CommonModule,
    FieldsetModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    PortalModule,
  ],
  declarations: [
    MetadataFormComponent,
    MetadataFormElementPortalComponent,
    MetadataFormGroupComponent,
    MetadataFormListComponent,
    MetadataFormListItemComponent,
  ],
  exports: [
    MetadataFormComponent,
    MetadataFormElementPortalComponent,
    MetadataFormGroupComponent,
    MetadataFormListComponent,
    MetadataFormListItemComponent,
  ],
})
export class MetadataFormModule {
  constructor(
    metadataTemplateRegistryService: MetadataTemplateRegistryService,
  ) {
    metadataTemplateRegistryService.register('FormGroup', {
      templateIdentifier: 'FormGroup',
      metadataComponent: MetadataFormGroupComponent,
    });

    metadataTemplateRegistryService.register('FormList', {
      templateIdentifier: 'FormList',
      metadataComponent: MetadataFormListComponent,
    });
  }
}
