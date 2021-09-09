import { flow, map, sortBy } from 'lodash/fp';
import { FormDefinitionModel } from './definitions/form-definition-model';
import { FormElementDefinitionModel } from './definitions/form-element-definition-model';
import { FormGroupDefinitionModel } from './definitions/form-group-definition-model';
import { FormTextDefinitionModel } from './definitions/form-text-definition-model';
import { FormElementMemberModel } from './form-element-member-model';
import { FormElementStateModel } from './form-element-state-model';

/**
 * The node model for a form element.
 */
export class FormElementNodeModel {
  parentMemberKey = '';

  memberKey = '';
  memberModel!: FormElementMemberModel;

  definitionKey = '';
  definitionModel!:
    | FormElementDefinitionModel
    | FormTextDefinitionModel
    | FormGroupDefinitionModel;

  children: Array<FormElementNodeModel> = [];

  state = new FormElementStateModel();

  /**
   * Traverse and apply callback function to this node and all of its children.
   *
   * @param callbackfn The callback function to apply
   */
  forEach(callbackfn: (node: FormElementNodeModel) => void) {
    callbackfn(this);
    this.children.forEach((c) => callbackfn(c));
  }

  /**
   * Getter for form value instance of this node.
   */
  get formValueInstance(): unknown {
    // field level component should have form group instance which will have form value instance
    if (this.state.instanceOfGetFormValue) {
      return this.state.formValueInstance;
    }

    // container level component will construct form value instance object
    // with children property keys and their respective form value instances
    const rawValue = this.state.formGroup.value;
    const formValueInstance: { [key: string]: unknown } = {};
    Object.keys(rawValue).forEach((key) => {
      formValueInstance[key] = this.children.find(
        (c) => c.definitionModel.propertyKey === key,
      )?.state?.formValueInstance;
    });

    return formValueInstance;
  }
}

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
