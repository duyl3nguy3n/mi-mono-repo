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
 * The definition model for a text element of a form.
 */
@MetadataIdentifier('FormTextDefinitionModel')
@Template('FormGroup', 'Form')
export class FormTextDefinitionModel extends FormElementDefinitionModel<string> {
  dataType: FormElementDataType = 'Text';

  @DisplayOrder(10)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Label')
  @IsRequired()
  label: string = null;

  @DisplayOrder(20)
  @Template('TextArea', 'Text Area')
  @FieldSize('col-12')
  @Label('Placeholder')
  placeholder: string = null;

  @DisplayOrder(30)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Hint')
  hint: string = null;

  @DisplayOrder(40)
  @Template('BooleanCheckbox', 'Checkbox')
  @FieldSize('col-2, inline-block--start')
  @Label('Required')
  isRequired = false;

  @DisplayOrder(50)
  @Template('BooleanCheckbox', 'Checkbox')
  @FieldSize('col-2, inline-block')
  @Label('Read-Only')
  isReadOnly = false;

  isRequiredToSubmit = false;

  @DisplayOrder(70)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Default Value')
  defaultValue: string = null;

  @DisplayOrder(80)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-6, inline-block--start')
  @Label('Field Size')
  fieldSize = 'col-6';

  @DisplayOrder(90)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-6, inline-block')
  @Label('Field Outline Size')
  fieldOutlineSize = 'col-12';

  constructor() {
    super();
    this.metadataMap = MetadataModelExtensions.createMetadataMap(this);
  }
}
