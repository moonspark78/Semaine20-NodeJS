const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Configuration EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Permet d'accéder aux fichiers du dossier uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuration de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Autoriser uniquement les images
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Seules les images sont autorisées."));
        }
    }
});

// Affichage du formulaire
app.get("/", (req, res) => {
    res.render("form");
});

// Traitement de l'upload
app.post("/upload", upload.single("image"), (req, res) => {
    res.render("form", {
        image: req.file
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});