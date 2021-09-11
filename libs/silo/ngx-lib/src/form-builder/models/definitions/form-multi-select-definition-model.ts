import {
  DisplayOrder,
  FieldSize,
  IsRequired,
  ItemMetadataModel,
  Label,
  MetadataIdentifier,
  MetadataModelExtensions,
  Template,
} from '@silo/metadata';
import { LookupModel } from '../../../form-field/models/lookup-model';
import { FormElementDataType } from '../form-definition-types';
import { FormElementDefinitionModel } from './form-element-definition-model';

/**
 * The definition model for a group element of a form.
 */
@MetadataIdentifier('FormGroupDefinitionModel')
@Template('FormGroup', 'Form')
export class FormMultiSelectDefinitionModel extends FormElementDefinitionModel<unknown> {
  dataType: FormElementDataType = 'Array';

  @DisplayOrder(10)
  @Template('TextBox', 'Text Box')
  @FieldSize('col-12')
  @Label('Label')
  @IsRequired()
  label: string = null;

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

  @DisplayOrder(100)
  @Template('FormList', 'Form List')
  @ItemMetadataModel(() => new LookupModel())
  @FieldSize('col-12')
  @Label('Options')
  options: Array<LookupModel> = [];

  constructor() {
    super();
    this.metadataMap = MetadataModelExtensions.createMetadataMap(this);
  }
}
