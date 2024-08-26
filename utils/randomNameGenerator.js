import { strings } from "./strings.js";

function generateRandomString() {
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10000); // generates a number from 0 to 9999
}

export function getRandomName() {
  const str1 = generateRandomString();
  const str2 = generateRandomString();
  const num = generateRandomNumber().toString().padStart(4, "0"); // pad to ensure 4 digits
  return `${str1}${str2}${num}`;
}
