export type isOptional<Structure, MemberUnion extends keyof Structure> = Omit<
  Structure,
  MemberUnion
> &
  Partial<Pick<Structure, MemberUnion>>;

export type Primitive = string | number | boolean | symbol;
export interface AnyObject {
  [key: Exclude<Primitive, boolean>]: unknown;
}
