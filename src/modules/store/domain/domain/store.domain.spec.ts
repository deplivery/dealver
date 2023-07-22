import { StoreDomain } from './store.domain';

describe('store domain', () => {
  describe('create store', () => {
    it('should create store', () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 10,
        endHour: 20,
        storeManagerId: 1,
      };
      const store = StoreDomain.of(input);
      expect(store.props.name).toBe(input.name);
    });
  });

  describe('change store info', () => {
    it('should change store info', () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 10,
        endHour: 20,
        storeManagerId: 1,
      };

      const store = StoreDomain.of(input);
      const changeInput = {
        name: 'changeName',
      };
      const changedStore = store.changeStoreInfo(changeInput);
      expect(changedStore.props.name).toBe(changeInput.name);
    });
  });

  describe('change activated', () => {
    it('should change activated', () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 10,
        endHour: 20,
        storeManagerId: 1,
      };
      const store = StoreDomain.of(input);
      const changedStore = store.changeActivated(true);
      expect(changedStore.props.isActivated).toBe(true);
    });
  });

  describe('assert opening time', () => {
    it('should assert opening time', () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 20,
        endHour: 10,
        storeManagerId: 1,
      };
      expect(() => {
        StoreDomain.of(input);
      }).toThrow(new Error('영업시간이 영업 마감시간보다 늦습니다.'));
    });
  });

  describe('assert time', () => {
    it('should assert time', () => {
      const input = {
        name: 'name',
        address: 'address',
        startHour: 10,
        endHour: 20,
        storeManagerId: 1,
      };
      const store = StoreDomain.of(input);

      expect(() => {
        store.changeStoreInfo({ startHour: 20, endHour: 10 });
      }).toThrow(new Error('영업시간이 영업 마감시간보다 늦습니다.'));
    });
  });
});
