import { MetadataModel } from '../models/metadata-model';
import { ReflectMetadataExtensions } from '../utils/reflect-metadata-extensions';

/**
 * Identify this property to have item metadata model metadata.
 *
 * @param createItemMetadataModelFn The create item metadata model function
 */
export function ItemMetadataModel(
  createItemMetadataModelFn: () => MetadataModel,
) {
  return (target, propertyKey?: string) => {
    ReflectMetadataExtensions.defineMetadata(
      'itemMetadataModel',
      createItemMetadataModelFn,
      target,
      propertyKey,
    );
  };
}
