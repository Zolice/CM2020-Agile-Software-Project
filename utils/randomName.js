// randomNameGenerator.js
const names = [
  "Alpha1",
  "Bravo2",
  "Charlie3",
  "Delta4",
  "Echo5",
  "Foxtrot6",
  "Golf7",
  "Hotel8",
  "India9",
  "Juliet0",
  "KiloMouse",
  "LimaCar",
  "MikeBike",
  "NovemberStar",
  "OscarMoon",
  "PapaSun",
  "QuebecTree",
  "RomeoFish",
  "SierraBoat",
  "TangoCloud",
  "UniformStar",
];

export function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
