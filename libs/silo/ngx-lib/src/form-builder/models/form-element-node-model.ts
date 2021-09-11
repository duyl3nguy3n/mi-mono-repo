import { FormMultiSelectDefinitionModel } from '../form-builder.public-api';
import { FormElementDefinitionModel } from './definitions/form-element-definition-model';
import { FormGroupDefinitionModel } from './definitions/form-group-definition-model';
import { FormTextDefinitionModel } from './definitions/form-text-definition-model';
import { FormElementInstanceModel } from './form-element-instance-model';
import { FormElementMemberModel } from './form-element-member-model';

/**
 * The node model for a form element.
 */
export class FormElementNodeModel {
  /** Parent member key of this node */
  parentMemberKey = '';

  /** Member key and member model for this node */
  memberKey = '';
  memberModel!: FormElementMemberModel;

  /** Definition key and definition model for this node */
  definitionKey = '';
  definitionModel!:
    | FormElementDefinitionModel
    | FormTextDefinitionModel
    | FormGroupDefinitionModel
    | FormMultiSelectDefinitionModel;

  /** The children of this node */
  children: Array<FormElementNodeModel> = [];

  /** The instance model of a form element */
  instance = new FormElementInstanceModel();

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
   * Get form value instance of this node.
   */
  get formValueInstance(): unknown {
    // return form value instance for field level component that implement getFormValue()
    if (this.instance.instanceOfGetFormValue) {
      return this.instance.formValueInstance;
    }

    // raw value here is the value that is implemented per field component which
    // could have any shape that is tailored for that field component
    const rawValue = this.instance.formGroup.value;

    // for each property key in raw value, find the node model then extract
    // form value instance to build form value instance we need to return
    const formValueInstance: { [key: string]: unknown } = {};
    Object.keys(rawValue).forEach((key) => {
      const nodeModel = this.children.find(
        (c) => c.definitionModel.propertyKey === key,
      );
      if (!nodeModel) {
        console.warn(`Cannot find node model for property: ${key}`);
        return;
      }
      formValueInstance[key] = nodeModel.instance.formValueInstance;
    });

    return formValueInstance;
  }
}
