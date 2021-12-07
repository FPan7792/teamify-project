import Cookies from "js-cookie";

let user = {
  token: Cookies.get("userToken") || null,
  userName: Cookies.get("userName") || null,
  connected: Cookies.get("userToken") ? true : false,
  hasTeamsExisting: false,
};

export const getUser = () => {
  let newUser = { ...user };
  return newUser;
};

export const setUserToken = (username) => {
  user.token = Cookies.get("userToken");
  user.connected = true;
  user.userName = username;

  let newUser = { ...user };

  console.log("TOKEN INSTALLE");
  console.log(newUser);
  return newUser;
};

export const removeUserTokenToDefault = async () => {
  await Cookies.remove("userToken");
  await Cookies.remove("userName");
  console.log("TOKEN EFFACE");

  user.connected = false;
  user.token = null;
  user.userName = null;
  let newUser = { ...user };

  return newUser;
};

export const setUserHasTeamsExisting = () => {
  user.hasTeamsExisting = true;
  let newUser = { ...user };
  return newUser;
};
