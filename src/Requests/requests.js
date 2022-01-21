import axios from "axios";
import leagues from "../Datas/Leagues.json";
import _ from "lodash";
import Cookies from "js-cookie";

const PROD = "https://teamify-project.herokuapp.com/";
const DEV = "http://127.0.0.1:3001/";

export const fetchLeagues = () => {
  return leagues.response;
};

// Faire une requete TM
export const fetchTransfertInfos = async (playerName) => {
  try {
    const response = await axios.get(`${PROD}player/transfert/${playerName}`);
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

// MODE SANS CONNEXION
// ==============================>
// EQUIPE DE BASE
let myTeam = { equipe: [], valeur: 0 };

export const displayMyTeam = () => {
  console.log(myTeam);
  return myTeam;
};

export const AddPlayerToMyTeam = async (player) => {
  fetchMySavedTeams();

  myTeam.equipe.push(player);

  if (player.value === "-") {
    player.value = "0";
  }

  const value = player.value.split("");

  let newValue = [];
  let millions = true;

  for (let i = 0; i < value.length; i++) {
    if (value[i] === "m") {
      break;
    } else if (value[i] === "K") {
      millions = false;
      break;
    } else if (value[i] === ",") {
      newValue.push(".");
    } else newValue.push(value[i]);
  }

  let playerFinalValue = Number(newValue.join(""));
  if (millions) {
    myTeam.valeur += playerFinalValue * 1000000;
  } else myTeam.valeur += playerFinalValue * 1000;

  if (Cookies.get("userToken")) {
    await updateMyTeams();
  }

  return { ...myTeam };
};

// RETIRER JOUEUR DE L'EQUIPE
export const removeFromMyTeam = async (player) => {
  fetchMySavedTeams();

  // await _.pull(myTeam.equipe, player);
  await myTeam.equipe.splice(player.index, 1);
  console.log(myTeam.equipe);

  function parseValue() {
    let parse;

    if (player.player.value === 0 || player.player.value === "0") {
      parse = 0;
      return parse;
    }

    if (_.endsWith(player.player.value, "mio. €")) {
      parse = _.replace(player.player.value, " mio. €", "");
    } else if (_.endsWith(player.player.value, "K €")) {
      parse = _.replace(player.player.value, " K €", "");
    }

    parse = _.replace(parse, ",", ".");

    if (_.endsWith(player.player.value, "mio. €")) {
      return Number(parse) * 1000000;
    } else if (_.endsWith(player.player.value, "K €")) {
      return Number(parse) * 1000;
    }
  }
  const value = parseValue();

  console.log(value);

  console.log(myTeam.valeur);

  myTeam.valeur -= value;

  if (Cookies.get("userToken")) {
    await updateMyTeams();
  }

  return { ...myTeam };
};

export const resetMyTeam = async () => {
  myTeam.equipe = [];
  myTeam.valeur = 0;

  if (Cookies.get("userToken")) {
    await updateMyTeams();
  }
};

// ==============================>
// ==============================>

// MODE USER CONNECTE
// ==============================>

// enregistrer une équipe
export const saveMyTeams = async () => {
  const user_id = Cookies.get("userToken");

  const newTeam = { ...myTeam };

  const value = {
    number_of_teams: 1,
    teams: [newTeam],
    user_id,
  };
  console.log(value);

  if (user_id) {
    try {
      const response = await axios.post(`${PROD}user/myteams/create`, value, {
        headers: {
          Authorization: "Bearer " + user_id,
        },
      });

      console.log(response.data);
      if (response.status === 200) return console.log("SUCCESS");
    } catch (error) {
      return console.log(error.response);
    }
  } else console.log("Pas d'identifiant. Requis");
};
// --------------------------->

// fetch mes equipes A PARTIR DE LA DTB

export const fetchMySavedTeams = async () => {
  const user_id = Cookies.get("userToken");

  if (user_id) {
    try {
      const response = await axios.get(`${PROD}user/myteam?user_id=${user_id}`);
      console.log(response.data);

      myTeam = { equipe: [], valeur: 0 };

      await response.data.teams[0].equipe.forEach((item) => {
        myTeam.equipe.push(item);
      });
      myTeam.valeur = response.data.teams[0].valeur;

      return { ...myTeam };
    } catch (error) {
      console.log(error.data);
      return error.data.response;
    }
  } else {
    return { ...myTeam };
  }
};

// Modifier mes équipes
export const updateMyTeams = async () => {
  const user_id = Cookies.get("userToken");

  const value = {
    number_of_teams: 1,
    teams: [{ ...myTeam }],
    user_id,
  };
  console.log(value);
  try {
    const response = await axios.put(`${PROD}user/myteam/update`, value, {
      headers: {
        Authorization: "Bearer " + user_id,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response);
    return error;
  }
};

console.log("EXECUTION");
fetchMySavedTeams();

// ==============================>
// ==============================>
