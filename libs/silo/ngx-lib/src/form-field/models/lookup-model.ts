import {
  DisplayOrder,
  FieldSize,
  Label,
  MetadataIdentifier,
  MetadataModel,
  MetadataModelExtensions,
  Template,
} from '@silo/metadata';

@MetadataIdentifier('LookupModel')
@Template('FormGroup', 'Form')
export class LookupModel<T = string> extends MetadataModel {
  @DisplayOrder(10)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-6, inline-block--start')
  @Label('Key')
  key: T | null = null;

  @DisplayOrder(20)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-6, inline-block')
  @Label('Name')
  displayName = '';

  constructor() {
    super();
    this.metadataMap = MetadataModelExtensions.createMetadataMap(this);
  }
}
