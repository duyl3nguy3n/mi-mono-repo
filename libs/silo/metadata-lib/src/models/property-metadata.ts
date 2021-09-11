import { MetadataModel } from './metadata-model';

export interface PropertyMetadata {
  defaultValue?: unknown;
  description?: string;
  displayOrder?: number;
  fieldOutlineSize?: string;
  fieldSize?: string;
  hint?: string;
  isRequired?: boolean;
  isRequiredToSubmit?: boolean;
  itemMetadataModel?: () => MetadataModel;
  label?: string;
  metadataIdentifier?: string;
  placeholder?: string;
  templateDisplayName?: string;
  templateIdentifier?: string;
  title?: string;
}
