import { Injectable } from '@angular/core';
import { merge } from 'lodash';
import { newGuid } from '../../utils/new-guid';
import { FormDefinitionModel } from '../models/definitions/form-definition-model';
import { FormElementDefinitionModel } from '../models/definitions/form-element-definition-model';
import {
  FormElementDataType,
  FormElementTemplateIdentifier,
} from './../models/form-definition-types';
import { FormElementMemberModel } from './../models/form-element-member-model';
import { FormBuilderRegistryService } from './form-builder-registry.service';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(
    private _formBuilderRegistryService: FormBuilderRegistryService,
  ) {}

  createFormDefinition(): FormDefinitionModel {
    const formDefinitionModel = new FormDefinitionModel();
    formDefinitionModel.key = newGuid();

    return formDefinitionModel;
  }

  addElement(
    formDefinitionModel: FormDefinitionModel,
    templateIdentifier: FormElementTemplateIdentifier,
    templateDisplayName: string,
    parentMemberKey: string,
  ): {
    definitionModel: FormElementDefinitionModel<unknown>;
    memberModel: FormElementMemberModel;
  } {
    const config = this._formBuilderRegistryService.get(templateIdentifier);

    // allow non-registered template to be added because form definition structure
    // should be completed even if don't have all the config data
    if (!config) {
      const {
        definitionModel,
        memberModel,
      } = this._createElementDefinitionAndMemberModels(
        templateIdentifier,
        templateDisplayName,
        'Unknown',
      );
      formDefinitionModel.definitionList.push(definitionModel);
      this._addMember(formDefinitionModel, memberModel, parentMemberKey);
      return { definitionModel, memberModel };
    }

    // handle custom create definition model factory function
    if (config.createDefinitionModel) {
      const definitionModel = config.createDefinitionModel();
      const memberModel = this._createMember(
        definitionModel.key,
        definitionModel.dataType,
      );
      formDefinitionModel.definitionList.push(definitionModel);
      this._addMember(formDefinitionModel, memberModel, parentMemberKey);
      return { definitionModel, memberModel };
    }

    // default element definition creation
    const {
      definitionModel,
      memberModel,
    } = this._createElementDefinitionAndMemberModels(
      config.templateIdentifier,
      config.templateDisplayName,
      config.dataType,
    );
    formDefinitionModel.definitionList.push(definitionModel);
    this._addMember(formDefinitionModel, memberModel, parentMemberKey);
    return { definitionModel, memberModel };
  }

  removeElement(
    formDefinitionModel: FormDefinitionModel,
    memberKey: string,
  ): void {
    const memberModel = formDefinitionModel.memberList.find(
      (member) => member.key === memberKey,
    );
    // remove member from member list
    formDefinitionModel.memberList = formDefinitionModel.memberList.filter(
      (member) => member.key !== memberKey,
    );
    // remove member from member children list
    formDefinitionModel.memberList.forEach((member) => {
      member.children = member.children.filter(
        (child) => child.key !== memberKey,
      );
    });
    // remove definition
    formDefinitionModel.definitionList = formDefinitionModel.definitionList.filter(
      (definition) => definition.key !== memberModel.definitionKey,
    );
    // if this is root, remove from root
    if (formDefinitionModel.rootMemberKey === memberKey) {
      formDefinitionModel.rootMemberKey = '';
    }
  }

  updateElementDefinition(
    formDefinitionModel: FormDefinitionModel,
    formElementDefinitionModel: FormElementDefinitionModel,
  ) {
    let definition = formDefinitionModel.definitionList.find(
      (x) => x.key == formElementDefinitionModel.key,
    );
    if (!definition) {
      throw new Error(`Cannot find definition`);
    }
    merge(definition, formElementDefinitionModel);
  }

  private _createMember(definitionKey: string, dataType: FormElementDataType) {
    const memberModel = new FormElementMemberModel();
    memberModel.key = newGuid();
    memberModel.definitionKey = definitionKey;
    memberModel.dataType = dataType;

    return memberModel;
  }

  private _addMember(
    formDefinitionModel: FormDefinitionModel,
    memberModel: FormElementMemberModel,
    parentMemberKey: string,
  ): void {
    // if this is first member, it is root
    if (!formDefinitionModel.memberList.length) {
      formDefinitionModel.rootMemberKey = memberModel.key;
    }
    // add to parent's children list
    if (parentMemberKey) {
      const parentMember = formDefinitionModel.memberList.find(
        (member) => member.key === parentMemberKey,
      );
      parentMember.children.push(memberModel);
    }
    // add to member list
    formDefinitionModel.memberList.push(memberModel);
  }

  private _createElementDefinitionAndMemberModels(
    templateIdentifier: string,
    templateDisplayName: string,
    dataType: FormElementDataType,
  ): {
    definitionModel: FormElementDefinitionModel<unknown>;
    memberModel: FormElementMemberModel;
  } {
    const definitionModel = new FormElementDefinitionModel();
    definitionModel.key = newGuid();
    definitionModel.templateIdentifier = templateIdentifier;
    definitionModel.templateDisplayName = templateDisplayName;
    definitionModel.dataType = dataType;

    const memberModel = this._createMember(
      definitionModel.key,
      definitionModel.dataType,
    );

    return { definitionModel, memberModel };
  }
}
