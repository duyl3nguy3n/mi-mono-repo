import { Injectable } from '@angular/core';
import { FormElementTemplateIdentifier } from '../../../form-builder/models/form-definition-types';
import { MetadataTemplateRegistryConfig } from '../models/metadata-template-registry-config';

@Injectable({
  providedIn: 'root',
})
export class MetadataTemplateRegistryService {
  private _templateRegistryConfigMap = new Map<
    FormElementTemplateIdentifier,
    MetadataTemplateRegistryConfig
  >();

  register(
    templateIdentifier: FormElementTemplateIdentifier,
    templateRegistryConfig: MetadataTemplateRegistryConfig,
  ) {
    this._templateRegistryConfigMap.set(
      templateIdentifier,
      templateRegistryConfig,
    );
  }

  get(templateIdentifier: string) {
    return this._templateRegistryConfigMap.get(templateIdentifier);
  }
}
