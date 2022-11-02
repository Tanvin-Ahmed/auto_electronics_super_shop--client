export const getSubString = (str = "", position = 1) => {
  return str.length > position ? `${str.substring(0, position)}` : str;
};
