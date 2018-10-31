const getValue = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (e) {
    return localStorage.getItem(item);
  }
};

export default getValue;
