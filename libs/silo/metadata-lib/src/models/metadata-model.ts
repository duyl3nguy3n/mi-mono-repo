import { merge } from 'lodash';
import 'reflect-metadata';
import { getMetadataIdentifier } from '../decorators/metadata-identifier';
import { ClassMetadata } from './class-metadata';
import { MetadataMap } from './metadata-map';
import { PropertyMetadata } from './property-metadata';
import { PropertyMetadataMap } from './property-metadata-map';

/**
 * Model with metadata for it's class and properties.
 */
export class MetadataModel {
  metadataMap?: MetadataMap;
}

export class MetadataModelExtensions {
  /**
   * Create metadata map for metadata model.
   *
   * @static
   * @param {MetadataModel} metadataModel The metadata model to get metadata from.
   * @param {MetadataMap} [metadataMap={}] Optional metadata map to use instead of create a new one.
   * @return {MetadataMap}  {MetadataMap} The metadata map or empty.
   */
  static createMetadataMap(
    metadataModel: MetadataModel,
    metadataMap: MetadataMap = {},
  ): MetadataMap {
    const classMetadata = MetadataModelExtensions.createClassMetadata(
      metadataModel,
    );

    if (!classMetadata?.metadataIdentifier) {
      throw new Error('metadataIdentifier is required');
    }

    const propertyMetadataMap = MetadataModelExtensions.createPropertyMetadataMap(
      metadataModel,
      metadataMap,
    );

    metadataMap[classMetadata.metadataIdentifier] = {
      classMetadata: classMetadata,
      propertyMetadataMap: propertyMetadataMap,
    };

    return metadataMap;
  }

  /**
   * Create class metadata for metadata model.
   *
   * @static
   * @param {MetadataModel} metadataModel The metadata model to get metadata from.
   * @return {ClassMetadata}  {ClassMetadata} The class metadata or undefined.
   */
  static createClassMetadata(metadataModel: MetadataModel): ClassMetadata {
    const classMetadata = Reflect.getMetadataKeys(
      metadataModel,
    ).reduce<ClassMetadata>(
      (classMetadata: ClassMetadata, metadataKey: string) => {
        const metadata = Reflect.getMetadata(metadataKey, metadataModel);
        if (metadata) {
          classMetadata[metadataKey] = metadata;
        }
        return classMetadata;
      },
      {},
    );

    return Object.keys(classMetadata).length ? classMetadata : undefined;
  }

  /**
   * Create property metadata map for metadata model.
   *
   * @static
   * @param {MetadataModel} metadataModel The metadata model to get metadata from.
   * @param {MetadataMap} [metadataMap] The metadata map to populate when property is a metadata model.
   * @return {PropertyMetadataMap}  {PropertyMetadataMap} The property metadata map or undefined.
   */
  static createPropertyMetadataMap(
    metadataModel: MetadataModel,
    metadataMap: MetadataMap,
  ): PropertyMetadataMap {
    const propertyMetadataMap = Object.keys(
      metadataModel,
    ).reduce<PropertyMetadataMap>(
      (propertyMetadataMap: PropertyMetadataMap, propertyKey: string) => {
        const propertyMetadata: PropertyMetadata =
          MetadataModelExtensions.createPropertyMetadata(
            metadataModel,
            propertyKey,
          ) ?? {};

        const propertyValue = metadataModel[propertyKey];

        let propertyClassMetadata: ClassMetadata;

        // when property is MetadataModel, append its own class metadata to this metadata map
        if (propertyValue instanceof MetadataModel) {
          propertyClassMetadata = MetadataModelExtensions.createClassMetadata(
            propertyValue,
          );
          if (propertyClassMetadata?.metadataIdentifier) {
            MetadataModelExtensions.createMetadataMap(
              propertyValue,
              metadataMap,
            );
          }
        }

        // when property is array, append item class metadata to this metadata map
        if (Array.isArray(propertyValue)) {
          if (!propertyMetadata.itemMetadataModel) {
            throw new Error('itemMetadataModel is required');
          }
          propertyClassMetadata = MetadataModelExtensions.createClassMetadata(
            propertyMetadata.itemMetadataModel(),
          );
          if (propertyClassMetadata?.metadataIdentifier) {
            MetadataModelExtensions.createMetadataMap(
              propertyMetadata.itemMetadataModel(),
              metadataMap,
            );
          }
        }

        // property metadata have priority over class metadata
        const mergedPropertyMetadata = merge(
          {},
          propertyClassMetadata,
          propertyMetadata,
        );

        if (Object.keys(propertyMetadata).length) {
          propertyMetadataMap[propertyKey] = mergedPropertyMetadata;
        }

        return propertyMetadataMap;
      },
      {},
    );

    return Object.keys(propertyMetadataMap).length
      ? propertyMetadataMap
      : undefined;
  }

  /**
   * Create property metadata for a property of metadata model.
   *
   * @static
   * @param {MetadataModel} metadataModel The metadata model to get metadata from.
   * @param {string} propertyKey The property key to create property metadata for.
   * @return {PropertyMetadata}  {PropertyMetadata} The property metadata or undefined.
   */
  static createPropertyMetadata(
    metadataModel: MetadataModel,
    propertyKey: string,
  ): PropertyMetadata {
    const metadataKeys = Reflect.getMetadataKeys(metadataModel, propertyKey);
    const propertyMetadata = metadataKeys
      .filter((metadataKey: string) => !metadataKey.startsWith('design:'))
      .reduce<PropertyMetadata>(
        (propertyMetadata: PropertyMetadata, metadataKey: string) => {
          const metadata = Reflect.getMetadata(
            metadataKey,
            metadataModel,
            propertyKey,
          );

          if (metadata) {
            propertyMetadata[metadataKey] = metadata;
          }

          return propertyMetadata;
        },
        {},
      );

    return Object.keys(propertyMetadata).length ? propertyMetadata : undefined;
  }

  /**
   * Get property metadata for a property of metadata model.
   *
   * @param metadataModel The metadata model to get metadata from.
   * @param fullPropertyPath The full path to the property
   */
  static getPropertyMetadata(
    metadataModel: MetadataModel,
    metadataIdentifier: string,
    fullPropertyPath: string,
  ): PropertyMetadata {
    metadataIdentifier =
      metadataIdentifier || getMetadataIdentifier(metadataModel);
    const propertyKeys = fullPropertyPath.split('.');
    return propertyKeys.reduce<PropertyMetadata>(
      (previousPropertyMetadata, currentKey) => {
        const metadata = previousPropertyMetadata
          ? metadataModel.metadataMap[
              previousPropertyMetadata.metadataIdentifier
            ]
          : metadataModel.metadataMap[metadataIdentifier];
        return metadata.propertyMetadataMap[currentKey];
      },
      null,
    );
  }
}
