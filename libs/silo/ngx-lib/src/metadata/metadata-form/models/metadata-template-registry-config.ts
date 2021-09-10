import { ComponentType } from '@angular/cdk/portal';
import { FormGroup } from '@angular/forms';
import { FormElementTemplateIdentifier } from '../../../form-builder/models/form-definition-types';

export interface MetadataTemplateRegistryConfig {
  templateIdentifier: FormElementTemplateIdentifier;
  metadataComponent: ComponentType<unknown>;
  getComponentValue?: (formGroup: FormGroup) => unknown;
}
