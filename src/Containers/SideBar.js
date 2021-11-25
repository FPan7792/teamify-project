import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  displayMyTeam,
  removeFromMyTeam,
  saveMyTeams,
} from "../Requests/requests";

const SideBar = () => {
  const fetchMyTeam = useQuery("MyTeam", displayMyTeam, {
    initialData: "MyTeam",
  });
  const { isSuccess, data } = fetchMyTeam;
  // isSuccess && console.log("c'est valeur de data ");
  // isSuccess && console.log(data);

  const parseValue = (value) => {
    // console.log("ca c'est value");
    // console.log(value);
    let result;
    let valueAmount = "";
    if (value !== 0) {
      if (value / 1000000000 > 1) {
        valueAmount = " MM";
        result = value / 1000000000;
      } else if (value / 1000000 > 1) {
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
    if (value === "0" || value === "-") {
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

  // enregistrer mes équipes

  const Save = () => useQuery("MyTeam", saveMyTeams);

  return (
    <div className=" border-black flex-initial shadow-md h-full m-3 p-5 bg-white bg-opacity-80 rounded sticky top-10 font-Dosis flex justify-center items-center flex-col">
      <p className=" text-green-700 text-xl  text-center mx-8">
        Budget engagé : <br />
        {isSuccess && (
          <strong className="text-green-700 ">
            {parseValue(data.valeur) + "€"}
          </strong>
        )}
      </p>
      {isSuccess &&
        data.equipe &&
        data.equipe.map((player, index) => {
          return (
            <section
              className="bg-green-100 bg-opacity-50 rounded shadow m-2 p-2 transform hover:scale-110"
              key={index}
              onClick={async () => {}}
            >
              <div>
                <strong>{player.name}</strong>
                <p className="px-1 text-xs text-green-500 bg-white w-20 shadow rounded ml-16">
                  {parsePlayerValue(player.value)}
                </p>
              </div>
              <button
                className="bg-red-400 rounded-xl mt-4 px-2 text-xs shadow hover:bg-black hover:text-white"
                onClick={() => {
                  removePlayer.mutate(player);
                }}
              >
                Licencier
              </button>
            </section>
          );
        })}
      <button
        className="rounded-2xl bg-yellow-600 px-2"
        onClick={() => {
          saveMyTeams();
        }}
      >
        Save my team
      </button>
    </div>
  );
};

export default SideBar;

// Mettre en place système de limitation de prix
