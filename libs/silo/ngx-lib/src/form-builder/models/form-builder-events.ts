import { FormElementDefinitionModel } from './definitions/form-element-definition-model';
import { FormElementTemplateIdentifier } from './form-definition-types';

export type FormBuilderEvent =
  | AddFormElementEvent
  | RemoveFormElementEvent
  | ImportFormEvent
  | UpdateFormElementDefinitionEvent;

export class AddFormElementEvent {
  templateIdentifier!: FormElementTemplateIdentifier;
  templateDisplayName = '';
  parentMemberKey = '';
}

export class RemoveFormElementEvent {
  memberKey = '';
}

export class ImportFormEvent {
  formDefinitionJson = '';
}

export class UpdateFormElementDefinitionEvent {
  formElementDefinitionModel!: FormElementDefinitionModel;
}
