const express = require("express");

const app = express();
const PORT = 3000;

// Configuration de EJS
app.set("view engine", "ejs");

// Route Home
app.get("/", (req, res) => {
    res.render("home", {
        title: "Accueil",
        message: "Bienvenue sur mon application Express !"
    });
});

// Route About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "À propos",
        description: "Cette application a été créée avec Express et EJS."
    });
});

// Route Contact
app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        email: "contact@example.com"
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});