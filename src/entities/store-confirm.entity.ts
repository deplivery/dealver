type StoreState = 'Ready' | 'Confirm' | 'Reject' | 'Delete';
export class StoreConfirm {
  storeId: number;
  state: StoreState;
  reason: string;
  checkerId: number;

  static of(state: StoreState, reason: string, checkerId: number): StoreConfirm {
    const storeConfirm = new StoreConfirm();
    storeConfirm.state = state;
    storeConfirm.reason = reason;
    storeConfirm.checkerId = checkerId;
    return storeConfirm;
  }
}
