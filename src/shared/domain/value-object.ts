export interface ValueObjectProps {
  [key: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected constructor(protected readonly props: T) {}

  public isEqual(vo?: ValueObject<T>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(vo?.props);
  }

  public getValues(): T {
    return this.props;
  }
}
