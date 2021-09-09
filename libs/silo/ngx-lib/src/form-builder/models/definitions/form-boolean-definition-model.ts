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
@MetadataIdentifier('FormBooleanDefinitionModel')
@Template('FormGroup', 'Form')
export class FormBooleanDefinitionModel extends FormElementDefinitionModel<boolean> {
  dataType: FormElementDataType = 'Boolean';

  @DisplayOrder(10)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Label')
  @IsRequired()
  label: string = '';

  @DisplayOrder(20)
  @Template('BooleanCheckbox', 'Checkbox')
  @FieldSize('col-2, inline-block--start')
  @Label('Required')
  isRequired = false;

  @DisplayOrder(30)
  @Template('BooleanCheckbox', 'Checkbox')
  @FieldSize('col-2, inline-block')
  @Label('Read-Only')
  isReadOnly = false;

  defaultValue: boolean = false;

  constructor() {
    super();
    this.metadataMap = MetadataModelExtensions.createMetadataMap(this);
  }
}
