import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello cloud campus");
});

app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`);
});