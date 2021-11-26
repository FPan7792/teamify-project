import axios from "axios";
import leagues from "../Datas/Leagues.json";
import _ from "lodash";

export const fetchLeagues = () => {
  return leagues.response;
};

// Faire une requete TM
export const fetchTransfertInfos = async (playerName) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3001/player/transfert/${playerName}`
    );
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};

// Ajouter un joueur a l'équipe

let myTeam = { equipe: [], valeur: 0 };
export const displayMyTeam = () => {
  return myTeam;
};

export const AddPlayerToMyTeam = (player) => {
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

  return myTeam;
};

export const removeFromMyTeam = (player) => {
  console.log("ca c'est player");
  console.log(player);
  _.pull(myTeam.equipe, player);
  console.log(myTeam.equipe);

  function parseValue() {
    let parse;

    if (player.value === 0 || player.value === "0") {
      parse = 0;
      return parse;
    }

    if (_.endsWith(player.value, "mio. €")) {
      parse = _.replace(player.value, " mio. €", "");
    } else if (_.endsWith(player.value, "K €")) {
      parse = _.replace(player.value, " K €", "");
    }

    parse = _.replace(parse, ",", ".");

    if (_.endsWith(player.value, "mio. €")) {
      return Number(parse) * 1000000;
    } else if (_.endsWith(player.value, "K €")) {
      return Number(parse) * 1000;
    }
  }
  const value = parseValue();

  console.log(value);

  console.log(myTeam.valeur);

  myTeam.valeur -= value;

  console.log(myTeam);
  return myTeam;
};

export const saveMyTeams = async (number_of_teams, owner) => {
  const value = {
    number_of_teams,
    teams: myTeam,
    owner,
  };

  if (owner) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/user/myteams/create",
        value
      );

      console.log(response.data);
      if (response.status === 200) return console.log("SUCCESS");
    } catch (error) {
      return console.log(error.response);
    }
  } else console.log("Pas d'identifiant. Requis");
};
