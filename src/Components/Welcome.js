export default function Welcome({ welcome, setWelcome }) {
  const modalStyleHidden =
    " transition-all duration-500 ease-in-out absolute top-0 h-screen w-full bg-black bg-opacity-70 flex justify-center items-center font-Dosis opacity-0 invisible ";
  const modalStyle =
    " transition-all duration-1000 delay-500 ease-in-out absolute top-0 h-screen w-full bg-black bg-opacity-70 flex justify-center items-center font-Dosis opacity-100 ";

  return (
    <div className={!welcome?.display ? modalStyleHidden : modalStyle}>
      <section className=" h-4/6 w-4/6 rounded-xl bg-green-500 text-white text-center p-10 flex justify-between flex-col items-center ">
        <h1 className="text-2xl font-bold">
          Bienvenue sur TEAMIFY !
          <p className="text-xl ">L'application des amoureux du foot</p>
        </h1>

        <section className="font-bold bg-black bg-opacity-50 rounded-2xl p-5 m-5 border-white border-2 border-solid">
          L'application est en ce moment même en cours de construction. Nous
          travaillons dur afin que le site soit opérationnel le plus vite
          possible. Pour l'instant, tu peux d'ors et déja :
          <p className="font-normal">
            _Rechercher tes joueurs préférés, les ajouter à ton équipe, ou
            rompre leurs contrats.
          </p>
          <p className="font-normal">
            _Evaluer la valeur de ton équipe en fonction des prix IRL du marché
            (LivePricing) <br />
          </p>
          <p className="font-normal">
            _Creer ton compte, et t'authentifier. Tu pourras ainsi retrouver les
            équipes que tu as sauvegarder dès que tu le voudras .
          </p>
          Bientôt tu pourras :
          <p className="font-normal">
            _Rechercher tes joueurs dans la totalités des équipes composants les
            5 grands championnats européens de football.
          </p>
        </section>
        <button
          className="p-1 rounded bg-white text-green-600 w-1/6 shadow-lg "
          onClick={() => {
            setWelcome({ ...welcome, display: false });
          }}
        >
          Compris !
        </button>
      </section>
    </div>
  );
}
