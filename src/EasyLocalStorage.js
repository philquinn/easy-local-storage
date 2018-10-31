import getValue from './getValue';

export default class EasyLocalStorage {
  constructor() {
    if (window.easyLocalStorage) {
      return window.easyLocalStorage;
    }
    this.storageMap = {};
    Object.keys(localStorage).forEach((key) => {
      this.storageMap[key] = getValue(key);
    });
    Object.getPrototypeOf(localStorage)
      .originalSetItem = Object.getPrototypeOf(localStorage).setItem;
    const newSetItem = (key, message) => this.add(key, message);
    Object.getPrototypeOf(localStorage).setItem = newSetItem;
    window.easyLocalStorage = this;
    return this;
  }

  add(key, message) {
    this.storageMap[key] = message;
    const item = typeof message === 'object' ? JSON.stringify(message) : message;
    localStorage.originalSetItem(key, item);
  }

  get(key) {
    return this.storageMap[key];
  }

  getAll() {
    return this.storageMap;
  }
}
