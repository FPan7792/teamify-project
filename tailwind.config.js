module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Dosis: ['"Dosis"', "sans-serif"],
      Ceviche: ['"Ceviche One"', "cursive"],
    },
    extend: {
      backgroundImage: {
        "main-bg": "url('./assets/terrain1.jpg')",
        "ligue1-logo":
          "url('https://static.actu.fr/uploads/2021/06/25757-210611155127954-1.png')",
        "premleague-logo": "url('./assets/premier-league-logo2.png')",
        "bundeslogo": "url('./assets/bundesliga-logo-sporty-trader.jpg')",
        "liga-logo": "url('./assets/liga-santander.jpg')",
        "seria-logo": "url('./assets/serieA-logo.jpeg')",
        "portoliga-logo": "url('./assets/liganoslogo.jpg')",
        "terrain": "url('./assets/terrain5.jpg')",
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
      scale: ["active", "group-hover"],
      animation: ["motion-reduce", "motion-safe"],
    },
  },
  plugins: [],
};
