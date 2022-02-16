import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import Cookies from 'js-cookie';
import leagues from '../Datas/Leagues.json';

import { Player, Team, UserBox } from './Intefaces/interfaces-requests';

export const URL = 'https://teamify-project.herokuapp.com/';

// Faire une requete TransferMarket
export const fetchTransfertInfos = async (playerName: string) => {
   try {
      const response = await axios.get(`${URL}player/transfert/${playerName}`);
      return response.data;
   } catch (error: any) {
      return error.response.status;
   }
};

// MODE SANS CONNEXION
// ==============================>
// EQUIPE DE BASE
let myTeam: Team = { equipe: [], valeur: 0 };

export const displayMyTeam = () => {
   console.log(myTeam);
   return myTeam;
};

export const AddPlayerToMyTeam = async (player: Player) => {
   fetchMySavedTeams();

   myTeam.equipe.push(player);

   if (player.value === '-') {
      player.value = '0';
   }

   const value = player.value.split('');

   const newValue = [];
   let millions = true;

   for (let i = 0; i < value.length; i++) {
      if (value[i] === 'm') {
         break;
      } else if (value[i] === 'K') {
         millions = false;
         break;
      } else if (value[i] === ',') {
         newValue.push('.');
      } else newValue.push(value[i]);
   }

   const playerFinalValue = Number(newValue.join(''));
   if (millions) {
      myTeam.valeur += playerFinalValue * 1000000;
   } else myTeam.valeur += playerFinalValue * 1000;

   if (Cookies.get('userToken')) {
      await updateMyTeams();
   }

   return { ...myTeam };
};

// RETIRER JOUEUR DE L'EQUIPE
export const removeFromMyTeam = async (player: {
   player: Player;
   index: number;
}) => {
   fetchMySavedTeams();

   // await _.pull(myTeam.equipe, player);
   await myTeam.equipe.splice(player.index, 1);
   console.log(myTeam.equipe);

   function parseValue(): number {
      let parse = '';
      let result = 0;

      if (player.player.value === '0') {
         return result;
      } else {
         if (_.endsWith(player.player.value, 'mio. €')) {
            parse = _.replace(player.player.value, ' mio. €', '');
         } else if (_.endsWith(player.player.value, 'K €')) {
            parse = _.replace(player.player.value, ' K €', '');
         }

         parse = _.replace(parse, ',', '.');

         if (_.endsWith(player.player.value, 'mio. €')) {
            result = Number(parse) * 1000000;
         } else if (_.endsWith(player.player.value, 'K €')) {
            result = Number(parse) * 1000;
         }
      }

      return result;
   }
   const value = parseValue();

   myTeam.valeur -= value;

   if (Cookies.get('userToken')) {
      await updateMyTeams();
   }

   return { ...myTeam };
};

export const resetMyTeam = async () => {
   myTeam.equipe = [];
   myTeam.valeur = 0;

   if (Cookies.get('userToken')) {
      await updateMyTeams();
   }
};

// ==============================>
// ==============================>

// MODE USER CONNECTE
// ==============================>

// enregistrer une équipe
export const saveMyTeams = async () => {
   const user_id = Cookies.get('userToken');

   const newTeam = { ...myTeam };

   const value = {
      number_of_teams: 1,
      teams: [newTeam],
      user_id,
   };
   console.log(value);

   if (user_id) {
      try {
         const response = await axios.post(`${URL}user/myteams/create`, value, {
            headers: {
               Authorization: 'Bearer ' + user_id,
            },
         });

         console.log(response.data);
         if (response.status === 200) return console.log('SUCCESS');
      } catch (error: any) {
         return console.log(error.response);
      }
   } else console.log("Pas d'identifiant. Requis");
};
// --------------------------->

// fetch mes equipes A PARTIR DE LA DTB

export const fetchMySavedTeams = async () => {
   const user_id = Cookies.get('userToken');

   if (user_id) {
      try {
         const response = (await axios.get(
            `${URL}user/myteam?user_id=${user_id}`
         )) as AxiosResponse;
         console.log(response.data);

         const { teams } = <UserBox>response.data;

         myTeam = { equipe: [], valeur: 0 };

         await teams[0].equipe.forEach((item: Player) => {
            myTeam.equipe.push(item);
         });
         myTeam.valeur = teams[0].valeur;

         return { ...myTeam };
      } catch (error) {
         console.log(error);
         return error;
      }
   } else {
      return { ...myTeam };
   }
};

// Modifier mes équipes
export const updateMyTeams = async () => {
   const user_id = Cookies.get('userToken');

   const value = {
      number_of_teams: 1,
      teams: [{ ...myTeam }],
      user_id,
   };
   console.log(value);
   try {
      const response = await axios.put(`${URL}user/myteam/update`, value, {
         headers: {
            Authorization: 'Bearer ' + user_id,
         },
      });
   } catch (error) {
      return error;
   }
};

console.log('EXECUTION');
fetchMySavedTeams();

// ==============================>
// ==============================>
