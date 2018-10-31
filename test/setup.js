const setup = () => {
  global.window = {};
  global.localStorage = Object.create({
    getItem: key => global.localStorage[key] || null,
    setItem: (key, item) => {
      if (typeof item === 'object') {
        global.localStorage[key] = JSON.stringify(item);
      } else {
        global.localStorage[key] = item;
      }
    },
  });
};

export default setup;
