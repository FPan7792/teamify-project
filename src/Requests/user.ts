import Cookies from 'js-cookie';
import { User } from './Intefaces/interfaces-requests';

const user: User = {
   token: Cookies.get('userToken') || null,
   userName: Cookies.get('userName') || null,
   connected: Cookies.get('userToken') ? true : false,
   hasTeamsExisting: false,
};

export const getUser = () => {
   const newUser = { ...user };
   return newUser;
};

export const setUserToken: any = (username: string) => {
   user.token = Cookies.get('userToken');
   user.connected = true;
   user.userName = username;

   const newUser = { ...user };

   console.log('TOKEN INSTALLE');
   console.log(newUser);
   return newUser;
};

export const removeUserTokenToDefault = async () => {
   await Cookies.remove('userToken');
   await Cookies.remove('userName');
   console.log('TOKEN EFFACE');

   user.connected = false;
   user.token = null;
   user.userName = null;
   const newUser = { ...user };

   return newUser;
};

export const setUserHasTeamsExisting = () => {
   user.hasTeamsExisting = true;
   const newUser = { ...user };
   return newUser;
};
