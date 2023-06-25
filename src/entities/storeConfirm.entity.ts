export class StoreConfirm {
  storeId: number;
  state: 'Ready' | 'Confirm' | 'Reject';
  reason: string;
  checkerId: number;

  static of(state: 'Ready' | 'Confirm' | 'Reject', reason: string, checkerId: number): StoreConfirm {
    const storeConfirm = new StoreConfirm();
    storeConfirm.state = state;
    storeConfirm.reason = reason;
    storeConfirm.checkerId = checkerId;
    return storeConfirm;
  }
}
