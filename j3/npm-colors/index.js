const colors = require("ansi-colors");

const texte = process.argv[2];
const couleur = process.argv[3];

console.log(colors[couleur](texte));