import { useQuery, useMutation, useQueryClient } from "react-query";
import _ from "lodash";
import { useState } from "react";
import { displayMyTeam, removeFromMyTeam } from "../Requests/requests";

const SideBar = () => {
  const fetchMyTeam = useQuery("MyTeam", displayMyTeam, {
    initialData: "MyTeam",
  });
  const { isSuccess, data } = fetchMyTeam;
  isSuccess && console.log(data);

  const parseValue = (value) => {
    // let toParse = value.split("");
    // if (toParse.length === 1) {
    //   toParse = " 0 €";
    // } else if (toParse.length > 1 && toParse <= 6) {
    //   toParse = " m €";
    // } else if (toParse.length <= 9) {
    //   toParse = " M €";
    // }
    // return toParse;
    console.log("c'est value");
    console.log(value);
    let result;
    let valueAmount = "";
    if (value !== 0) {
      if (value / 1000000 > 1) {
        valueAmount = " M";
        result = value / 1000000;
      } else if (value / 1000 > 1) {
        valueAmount = " K";
        result = value / 1000;
      } else {
        valueAmount = "";
        result = value;
      }
      result = Number(result) + " " + valueAmount;
      return result;
    } else return value + " ";
  };

  const parsePlayerValue = (value) => {
    if (value === "0") {
      value = "Non valorisé";
    }
    return value;
  };

  // retirer un joueur de l'équipe
  const queryClient = useQueryClient();
  const removePlayer = useMutation("MyTeam", removeFromMyTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("MyTeam");
    },
  });

  return (
    <div className="border-black flex-initial shadow h-full m-5 p-5 bg-green-400 rounded">
      <p className=" text-green-700 font-medium text-center">
        Valeur totale de l'équipe : <br />
        {isSuccess && (
          <strong>
            {/* {_.trimEnd(data.valeur, "0") + parseValue(String(data.valeur))} */}
            {parseValue(data.valeur) + "€"}
          </strong>
        )}
      </p>
      {isSuccess &&
        data.equipe &&
        data.equipe.map((player, index) => {
          return (
            <section
              className="bg-red-100 rounded shadow m-2 p-2 transform hover:scale-110"
              key={index}
              onClick={async () => {}}
            >
              <strong>{player.name}</strong>
              <p className="px-1 text-xs text-green-500 bg-white w-20 shadow rounded ml-16">
                {parsePlayerValue(player.value)}
              </p>
              <button
                className="bg-red-400 rounded-xl p-1 text-xs shadow hover:bg-black hover:text-white"
                onClick={() => {
                  removePlayer.mutate(player);
                }}
              >
                RMV
              </button>
            </section>
          );
        })}
    </div>
  );
};

export default SideBar;

// Mettre en place système de limitation de prix
