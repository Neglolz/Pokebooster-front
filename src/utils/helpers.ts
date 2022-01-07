export const getImgUrl = (
  pic: string,
  directory: string,
  type: string
): string => {
  return require("@/assets/" + directory + "/" + pic + "." + type);
};
export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getFirstSentence = (string: string): string => {
  const indexOfFirstDot = string.indexOf(".");
  return string.slice(0, indexOfFirstDot + 1);
};
