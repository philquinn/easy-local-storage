import getJson from './helpers';

export default class EasyLocalStorage {
  constructor() {
    if (window.easyLocalStorage) {
      return window.easyLocalStorage;
    }
    this.storageMap = {};
    Object.keys(localStorage).forEach((key) => {
      this.storageMap[key] = getJson(key);
    });
    let originalSetItem = Object.getPrototypeOf(localStorage).setItem;
    Object.getPrototypeOf(localStorage).originalSetItem = originalSetItem;
    const newSetItem = (key, message) => this.add(key, message);
    originalSetItem = newSetItem;
    window.easyLocalStorage = this;
    return this;
  }

  add(key, message) {
    this.storageMap[key] = message;
    localStorage.originalSetItem(key, JSON.stringify(message));
  }

  get(key) {
    return this.storageMap[key];
  }

  getAll() {
    return this.storageMap;
  }
}
