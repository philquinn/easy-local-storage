const getJson = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (e) {
    return item;
  }
};

export default getJson;
