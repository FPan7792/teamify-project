module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "ligue1-logo":
          "url('https://assets-fr.imgfoot.com/media/cache/642x382/ballon-uhlsport-ligue-1-2021-2022-img2.jpg')",
        "premierleague-logo": "url('/src/assets/bundeslogo.jpeg')",
        "bundesliga-logo":
          "url('https://media.api-sports.io/football/leagues/78.png')",
        "seriea-logo":
          "url('https://media.api-sports.io/football/leagues/135.png')",
        "liga-logo":
          "url('https://media.api-sports.io/football/leagues/140.png')",
        "primeira-logo":
          "url('https://media.api-sports.io/football/leagues/94.png')",
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
