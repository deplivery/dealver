export abstract class Entity<T> {
  public readonly props: T;
  protected readonly id: number; //auto increment을 사용했기때문!

  constructor(props: T, id?: number) {
    this.id = id;
    this.props = props;
  }

  isEqual(entity: Entity<T>) {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (!(entity instanceof this.constructor)) {
      return false;
    }
    return entity.id === this.id;
  }

  getId() {
    return this.id;
  }
}
