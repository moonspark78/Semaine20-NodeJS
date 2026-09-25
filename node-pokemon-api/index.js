import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// Middlewares
app.use(morgan('dev'));[cite: 5, 6]
app.use(express.json());[cite: 6] // ou express.urlencoded({ extended: true })

app.get('/', (req, res) => {
    res.send("hello cloud campus");[cite: 1]
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));[cite: 1]