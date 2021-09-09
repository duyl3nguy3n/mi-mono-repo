import {
  DisplayOrder,
  FieldSize,
  IsRequired,
  Label,
  MetadataIdentifier,
  MetadataModelExtensions,
  Template,
} from '@silo/metadata';
import { FormElementDataType } from '../form-definition-types';
import { FormElementDefinitionModel } from './form-element-definition-model';

/**
 * The definition model for a group element of a form.
 */
@MetadataIdentifier('FormGroupDefinitionModel')
@Template('FormGroup', 'Form')
export class FormGroupDefinitionModel extends FormElementDefinitionModel<unknown> {
  dataType: FormElementDataType = 'Object';

  @DisplayOrder(10)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Title')
  @IsRequired()
  title: string = null;

  @DisplayOrder(20)
  @Template('TextArea', 'Text Area')
  @FieldSize('col-12')
  @Label('Description')
  description: string = null;

  constructor() {
    super();
    this.metadataMap = MetadataModelExtensions.createMetadataMap(this);
  }
}
