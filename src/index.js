const getJson = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item))
  } catch (e) {
    return item;
  }
}

class EasyLocalStorage {
  constructor() {
    if (window.easyLocalStorage) {
      return window.easyLocalStorage;
    }
    this.storageMap = {};
    const current = Object.keys(localStorage)
      .reduce((obj, k) => {
        return {
          ...obj, [k]:
            getJson(k)
        };
      }, {});
    this.storageMap = current;
    localStorage.__proto__._setItem = localStorage.__proto__.setItem;
    const newSetItem = (key, message) => {
      return this.add(key, message);
    }
    localStorage.__proto__.setItem = newSetItem;
    window.easyLocalStorage = this;
    return this;
  }

  add(key, message) {
    this.storageMap[key] = message;
    localStorage._setItem(key, JSON.stringify(message));
  }

  get(key) {
    return this.storageMap[key];
  }

  getAll() {
    return this.storageMap;
  }
}