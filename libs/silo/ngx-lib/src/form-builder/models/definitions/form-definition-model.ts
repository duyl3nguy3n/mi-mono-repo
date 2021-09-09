import { FormElementMemberModel } from '../form-element-member-model';
import { FormElementDefinitionModel } from './form-element-definition-model';

/**
 * The definition model for a form.
 */
export class FormDefinitionModel {
  key = '';
  displayName = '';
  description = '';
  rootMemberKey = '';
  memberList: Array<FormElementMemberModel> = [];
  definitionList: Array<FormElementDefinitionModel<unknown>> = [];
}
