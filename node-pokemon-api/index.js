import express from "express";
import morgan from "morgan";
import { Sequelize, DataTypes } from "sequelize";
import { pokemonModel } from "./src/pokemon.js";
import { pokemons } from "./src/mock-pokemon.js";
import { success } from "./helper.js";

const app = express();
const port = 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Connexion à la base de données Sequelize
const sequelize = new Sequelize(
    'pokedex',
    'balde',
    '161100',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
);

// Initialisation du modèle Pokémon
const Pokemon = pokemonModel(sequelize, DataTypes);

// Synchronisation de la base de données et injection des données mockées
sequelize.sync({ force: true })
    .then(_ => {
        console.log('La synchronisation de notre modèle dans la base de données est réussie');
        
        // Injection des Pokémon de test
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()));
        });
    })
    .catch(error => console.error(`échec de synchronisation de notre modèle dans la base de données avec l'erreur ${error}`));

app.get('/', (req, res) => {
    res.send("hello cloud campus");
});

app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`);
});