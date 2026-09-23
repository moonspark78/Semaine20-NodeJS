const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


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



app.get("/", (req, res) => {
    res.render("home");
});


app.get("/formulaire", (req, res) => {
    res.render("formulaire");
});

app.post("/formulaire", (req, res) => {
    console.log(req.body);

    res.send(`
        <h1>Formulaire reçu</h1>

        <p>Nom : ${req.body.nom}</p>

        <p>Métier : ${req.body.metier}</p>

        <p>
            Aime Node.js :
            ${req.body.node ? "Oui" : "Non"}
        </p>

        <a href="/">Retour à l'accueil</a>
    `);
});

app.get("/formulaire2", (req, res) => {
    res.render("formulaire2");
});

app.post("/formulaire2", (req, res) => {
});

app.get("/upload", (req, res) => {
    res.render("upload", {
        image: null
    });
}); 

app.post("/upload", upload.single("image"), (req, res) => {
    res.render("upload", {
        image: req.file
    });
});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});