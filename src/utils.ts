import { AnyObject } from './types';

export function extractSetFromCollection<ArrA, ArrB>(
  collectionOne: ArrA[],
  collectionTwo: (ArrA | ArrB)[],
  excludeSubset = false
) {
  return collectionOne.filter(elem => {
    const elemIsInSubset = collectionTwo.includes(elem);
    return excludeSubset ? !elemIsInSubset : elemIsInSubset;
  });
}

export function pickObjPropsToAnotherObj<O extends {}, P extends keyof O>(
  initialObject: O,
  targetProperties: P[],
  excludeProperties: true
): Omit<O, P>;
export function pickObjPropsToAnotherObj<O extends {}, P extends keyof O>(
  initialObject: O,
  targetProperties: P[],
  excludeProperties: false
): Pick<O, P>;
export function pickObjPropsToAnotherObj<O extends {}, P extends keyof O>(
  initialObject: O,
  targetProperties: P[]
): Pick<O, P>;
export function pickObjPropsToAnotherObj<O extends {}, P extends keyof O>(
  initialObject: O,
  targetProperties: P[],
  excludeProperties?: boolean
) {
  const desiredPropertyKeys = extractSetFromCollection(
    Object.keys(initialObject),
    targetProperties,
    excludeProperties
  ) as P[];

  const objWithDesiredProperties = desiredPropertyKeys.reduce((filteredObj, propName) => {
    filteredObj[propName] = initialObject[propName];
    return filteredObj;
  }, {} as O);

  return objWithDesiredProperties;
}

export function includedInCollection<T extends U, U>(
  collection: readonly T[],
  itemToCheck: U
): itemToCheck is T {
  return collection.includes(itemToCheck as T);
}

// Copy on write ops
export function objSet<
  Obj extends AnyObject,
  Prop extends string | number,
  NewValue extends Obj[Prop]
>(obj: Obj, property: Prop, value: NewValue) {
  return {
    ...obj,
    ...{ [property]: value },
  } as { [Key in keyof Obj | Prop]: Key extends Prop ? NewValue : Obj[Key] };
}
