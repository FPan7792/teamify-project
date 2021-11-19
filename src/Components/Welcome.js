export default function Welcome({ welcome, setWelcome }) {
  const modalStyleHidden =
    " transition-all duration-500 ease-in-out absolute top-0 h-screen w-full bg-black bg-opacity-70 flex justify-center items-center font-Dosis opacity-0 invisible ";
  const modalStyle =
    " transition-all duration-1000 delay-500 ease-in-out absolute top-0 h-screen w-full bg-black bg-opacity-70 flex justify-center items-center font-Dosis opacity-100 ";

  return (
    <div className={!welcome?.display ? modalStyleHidden : modalStyle}>
      <section className=" h-3/6 w-3/6 rounded bg-green-400 text-white text-center p-10 flex justify-between flex-col border-white border-2 border-solid items-center ">
        <h1 className="text-2xl font-bold">
          Bienvenue sur TEAMIFY !
          <p className="text-xl ">L'application des amoureux du foot</p>
        </h1>

        <p>
          Ici tu pourras construire une équipe, la gérer en fonction de tes
          joueurs favoris et les licencier !
        </p>
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
