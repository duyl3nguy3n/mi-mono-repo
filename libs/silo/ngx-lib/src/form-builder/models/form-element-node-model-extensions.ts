import { flow, map, sortBy } from 'lodash/fp';
import { FormDefinitionModel } from './definitions/form-definition-model';
import { FormElementMemberModel } from './form-element-member-model';
import { FormElementNodeModel } from './form-element-node-model';

export class FormElementNodeModelExtensions {
  /**
   * Map flat form definition model to tree-like form element node model.
   *
   * @static
   * @param {FormDefinitionModel} formDefinitionModel - The form definition model to map from
   * @param {string} memberKey - Current member key that need to be mapped
   * @param {string} [parentMemberKey] - Parent member key of current member
   * @return {FormElementNodeModel} The
   */
  static mapFromFormDefinitionModel(
    formDefinitionModel: FormDefinitionModel,
    memberKey: string,
    parentMemberKey?: string,
  ): FormElementNodeModel {
    const nodeModel = new FormElementNodeModel();

    // map keys
    nodeModel.memberKey = memberKey;
    nodeModel.parentMemberKey = parentMemberKey
      ? parentMemberKey
      : formDefinitionModel.memberList.find((x) =>
          x.children.find((c) => c.key === memberKey),
        )?.key ?? '';

    // map member model
    const memberModel = formDefinitionModel.memberList.find(
      (x) => x.key === memberKey,
    );
    if (!memberModel) {
      throw new Error('Cannot find member model.');
    }
    nodeModel.memberModel = memberModel;

    // map definition model
    nodeModel.definitionKey = memberModel.definitionKey;
    const definitionModel = formDefinitionModel.definitionList.find(
      (x) => x.key === memberModel.definitionKey,
    );
    if (!definitionModel) {
      throw new Error('Cannot find definition model.');
    }
    nodeModel.definitionModel = definitionModel;

    // map children
    nodeModel.children = flow(
      map<FormElementMemberModel, FormElementNodeModel>((x) =>
        FormElementNodeModelExtensions.mapFromFormDefinitionModel(
          formDefinitionModel,
          x.key,
          memberKey,
        ),
      ),
      sortBy<FormElementNodeModel>('definitionModel.displayOrder'),
    )(memberModel.children);

    return nodeModel;
  }
}
