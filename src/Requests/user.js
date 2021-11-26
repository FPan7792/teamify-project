import Cookies from "js-cookie";

let userToken = Cookies.get("userToken") || null;
console.log("Ca c'est UT");
console.log(userToken);

export const setUserToken = (value) => {
  let newUserToken = value;
  console.log("TOKEN MODIFIE");

  return newUserToken;
};

export const removeUserTokenToDefault = () => {
  console.log("TOKEN EFFACE");
  Cookies.remove("userToken");
  let newUserToken = null;
  return newUserToken;
};

export const getUserToken = () => {
  let newUserToken = Cookies.get("userToken");
  console.log("TOKEN RECUPERE");

  return newUserToken;
};
