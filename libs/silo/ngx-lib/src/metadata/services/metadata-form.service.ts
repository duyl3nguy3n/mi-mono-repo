import { Injectable } from '@angular/core';
import {
  getMetadataIdentifier,
  Metadata,
  MetadataModel,
  PropertyMetadata,
} from '@silo/metadata';
import { merge } from 'lodash';
import { FormDefinitionModel } from '../../form-builder/models/definitions/form-definition-model';
import { FormBuilderService } from '../../form-builder/services/form-builder.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataFormService {
  constructor(private _formBuilderService: FormBuilderService) {}

  createFormDefinition(metadataModel: MetadataModel) {
    const formDefinitionModel = this._formBuilderService.createFormDefinition();

    // add root
    const { metadata, memberModel } = this.addMetadataModelAsElement(
      formDefinitionModel,
      null,
      metadataModel,
      null,
      null,
    );
    formDefinitionModel.rootMemberKey = memberModel.key;

    // add children
    this.addEntriesAsElement(
      formDefinitionModel,
      metadataModel,
      metadata,
      memberModel.key,
    );

    return formDefinitionModel;
  }

  addEntriesAsElement(
    formDefinitionModel: FormDefinitionModel,
    metadataModel: MetadataModel,
    metadata: Metadata,
    parentMemberKey: string,
  ) {
    Object.entries(metadataModel).forEach(([propertyKey, propertyValue]) => {
      const propertyMetadata = metadata.propertyMetadataMap[propertyKey];

      if (Array.isArray(propertyValue)) {
        this.addPropertyAsElement(
          formDefinitionModel,
          propertyKey,
          propertyValue,
          propertyMetadata,
          parentMemberKey,
        );
      } else if (propertyValue instanceof MetadataModel) {
        // add metadata model as element
        // const propertyMetadata = metadata.propertyMetadataMap[propertyKey];
        const { memberModel } = this.addMetadataModelAsElement(
          formDefinitionModel,
          propertyKey,
          propertyValue,
          propertyMetadata,
          parentMemberKey,
        );
        // add its children entries as element to itself
        this.addEntriesAsElement(
          formDefinitionModel,
          propertyValue,
          propertyValue.metadataMap[getMetadataIdentifier(propertyValue)],
          memberModel.key,
        );
      } else {
        // add other property as element
        if (propertyMetadata) {
          this.addPropertyAsElement(
            formDefinitionModel,
            propertyKey,
            propertyValue,
            propertyMetadata,
            parentMemberKey,
          );
        }
      }
    });
  }

  addMetadataModelAsElement(
    formDefinitionModel: FormDefinitionModel,
    propertyKey: string,
    propertyValue: MetadataModel,
    propertyMetadata: PropertyMetadata,
    parentMemberKey: string,
  ) {
    const metadataIdentifier = getMetadataIdentifier(propertyValue);
    const metadata = propertyValue.metadataMap[metadataIdentifier];
    const element = this._formBuilderService.addElement(
      formDefinitionModel,
      propertyMetadata?.templateIdentifier ??
        metadata.classMetadata.templateIdentifier,
      propertyMetadata?.templateDisplayName ??
        metadata.classMetadata.templateDisplayName,
      parentMemberKey,
    );

    element.definitionModel.propertyKey = propertyKey;
    element.definitionModel.title =
      propertyMetadata?.title ?? metadata?.classMetadata?.title;
    element.definitionModel.description =
      propertyMetadata?.description ?? metadata?.classMetadata?.description;

    return {
      metadata,
      definitionModel: element.definitionModel,
      memberModel: element.memberModel,
    };
  }

  addPropertyAsElement(
    formDefinitionModel: FormDefinitionModel,
    propertyKey: string,
    propertyValue: unknown,
    propertyMetadata: PropertyMetadata,
    parentMemberKey: string,
  ) {
    const element = this._formBuilderService.addElement(
      formDefinitionModel,
      propertyMetadata.templateIdentifier,
      propertyMetadata.templateDisplayName,
      parentMemberKey,
    );

    merge(element.definitionModel, propertyMetadata);
    element.definitionModel.propertyKey = propertyKey;
    element.definitionModel.defaultValue = propertyValue;
  }
}
