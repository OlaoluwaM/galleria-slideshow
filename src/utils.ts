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

export function toDecimalInt(possibleNumber: string): number {
  const BASE_TEN_RADIX = 10;
  return parseInt(possibleNumber, BASE_TEN_RADIX);
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms = 0
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  // eslint-disable-next-line func-names
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): any {
    // eslint-disable-next-line
    clearTimeout(timeoutId!);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function generateRandomId(initVal: number = 3): string {
  const initialValue = new Uint32Array(initVal);
  window.crypto.getRandomValues(initialValue);

  return (
    performance.now().toString(36) +
    Array.from(initialValue)
      .map(A => A.toString(36))
      .join('')
  ).replace(/\./g, '');
}

export function concatenateClassNames(
  initialClassName: string,
  otherClassNames: string
): string {
  const SEPARATOR = ' ';
  const concatenatedClassNames = initialClassName.concat(SEPARATOR, otherClassNames);
  return concatenatedClassNames;
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

export function arrSet<T, R>(arr: T[], newArrElement: R) {
  return [...arr, newArrElement];
}
