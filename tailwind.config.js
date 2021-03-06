module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      Dosis: ['"Dosis"', "sans-serif"],
      Ceviche: ['"Ceviche One"', "cursive"],
    },
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
    },
    extend: {
      backgroundImage: {
        "main-bg": "url('./assets/terrain5.jpg')",
        "ligue1-logo":
          "url('https://static.actu.fr/uploads/2021/06/25757-210611155127954-1.png')",
        "premleague-logo": "url('./assets/premier-league-logo2.png')",
        bundeslogo: "url('./assets/bundesliga-logo-sporty-trader.jpg')",
        "liga-logo": "url('./assets/liga-santander.jpg')",
        "seria-logo": "url('./assets/serieA-logo.jpeg')",
        "portoliga-logo": "url('./assets/liganoslogo.jpg')",
        terrain: "url('./assets/terrain5.jpg')",
      },
      animation: {
        "pulse-slower": "pulse 5s linear infinite",
      },
      colors: {},
    },
  },

  plugins: [],
};
