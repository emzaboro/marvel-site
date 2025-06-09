const CryptoJS = require('crypto-js');


const publicKey = "0e695b539c9633587c4e544807cf7721";
const privateKey = "8efb7c121a5657cc3d7b444122366d64245c85e4";

const ts = new Date().getTime().toString();

const toHash = ts + privateKey + publicKey;
const hash = CryptoJS.MD5(toHash).toString();

console.log('ts:', ts);
console.log('hash:', hash);

const characterName = 'hulk';
const baseURL = 'https://gateway.marvel.com/v1/public/characters';
const url = `${baseURL}?name=${encodeURIComponent(characterName)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const character = data.data.results[0];
    if (character) {
      console.log('Name:', character.name);
      console.log('Description:', character.description);
      console.log('Thumbnail:', `${character.thumbnail.path}.${character.thumbnail.extension}`);
    } else {
      console.log('Character not found.');
    }
  })
  .catch(error => {
    console.error('Error fetching character:', error);
  });