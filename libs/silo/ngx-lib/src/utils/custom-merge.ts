import { isArray, mergeWith } from 'lodash/fp';

/**
 * Custom merge wrapper for lodash where the strategy for array is an override.
 * The default for lodash is concatenation.
 * NOTE: this method will not mutate object
 */
export function customMerge<TObject, TSource>(
  object: TObject,
  source: TSource,
): TObject {
  return mergeWith(
    (o, s) => {
      if (isArray(o)) {
        // if there is a new source, replace it.
        return s ? [...s] : undefined;
      }
    },
    object,
    source,
  );
}
