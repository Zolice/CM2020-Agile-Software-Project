/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit"],
      },
      gridTemplateRows: {
        '25': 'repeat(25, minmax(0, 1fr))',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        darkgreen: {
          "primary": "#9ad4a2",
          "secondary": "#445747",
          "accent": "#87b2bc",
          "neutral": "#262b26",
          "base-100": "#1c211c",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },
        lightgreen: {
          "primary": "#326941",
          "secondary": "#9ad4a2",
          "accent": "#87b2bc",
          "neutral": "#f6fbf2",
          "base-100": "#ebefe7",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },
        tuttifrutti: {
          "primary": "#93aec1",
          "secondary": "#9dbdba",
          "accent": "#f8b042",
          "neutral": "#f3b7ad",
          "base-100": "#ec6a52",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },
        desire: {
          "primary": "#cc92c1",
          "secondary": "#dcaed1",
          "accent": "#ae4c9d",
          "neutral": "#f5e7ef",
          "base-100": "#e2b6d5",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },
        sweetberries: {
          "primary": "#bf94e5",
          "secondary": "#bac0e6",
          "accent": "#e4646e",
          "neutral": "#fcd2df",
          "base-100": "#5d496c",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },
        magentamoment: {
          "primary": "#9b283c",
          "secondary": "#c2465c",
          "accent": "#d8769a",
          "neutral": "#d998ba",
          "base-100": "#e3bcd6",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#dc8422",
          "error": "#dea2a4",
        },

      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]
  }
};
