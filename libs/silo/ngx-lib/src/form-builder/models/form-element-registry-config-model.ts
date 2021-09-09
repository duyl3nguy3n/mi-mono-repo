import { ComponentType } from '@angular/cdk/portal';
import { FormElementDefinitionModel } from './definitions/form-element-definition-model';
import {
  FormElementDataType,
  FormElementTemplateIdentifier,
} from './form-definition-types';

export class FormElementRegistryConfigModel {
  templateIdentifier!: FormElementTemplateIdentifier;
  templateDisplayName!: string;
  dataType!: FormElementDataType;
  elementComponent!: ComponentType<unknown>;
  definitionFormComponent!: ComponentType<unknown>;
  createDefinitionModel?: () => FormElementDefinitionModel;
}
