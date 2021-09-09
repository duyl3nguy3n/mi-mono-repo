import { MetadataModel } from '@silo/metadata';
import { FormElementDataType } from '../form-definition-types';

/**
 * The base definition model for a form element.
 */
export class FormElementDefinitionModel<T = unknown> extends MetadataModel {
  key!: string;

  propertyKey?: string;

  metadataIdentifier?: string;

  templateIdentifier!: string;

  templateDisplayName!: string;

  dataType!: FormElementDataType;

  defaultValue?: T;

  title?: string;

  label?: string;

  description?: string;

  placeholder?: string;

  hint?: string;

  isRequired?: boolean;

  isReadOnly?: boolean;

  isRequiredToSubmit?: boolean;

  displayOrder?: number;

  fieldOutlineSize?: string;

  fieldSize?: string;
}
