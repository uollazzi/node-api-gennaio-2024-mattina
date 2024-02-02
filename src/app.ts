// gestione variabili d'ambiente
import { config } from "dotenv";
config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index";
import fantacalcioRouter from "./routes/fantacalcio";

const app = express();
const port = Number(process.env.PORT) || 3000;

// middleware per i logs
app.use(cors());
app.use(express.static("public"));
app.use(morgan('tiny'));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/fanta", fantacalcioRouter);

// errore 500
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.message);
    res.status(500).json({ message: "Qualcosa è andato storto." });
});

app.listen(port, () => { console.log(`Server in ascolto su http://localhost:${port}`); });
