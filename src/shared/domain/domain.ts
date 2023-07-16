export abstract class Domain<T> {
  public readonly props: T;
  protected readonly id: number; //auto increment을 사용했기때문!

  constructor(props: T, id?: number) {
    this.id = id;
    this.props = props;
  }

  isEqual(domain: Domain<T>) {
    if (domain === null || domain === undefined) {
      return false;
    }
    if (!(domain instanceof this.constructor)) {
      return false;
    }
    return domain.id === this.id;
  }

  getId() {
    return this.id;
  }
}
