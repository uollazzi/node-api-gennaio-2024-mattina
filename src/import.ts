// gestione variabili d'ambiente
import { config } from "dotenv";
config();

import fs from "node:fs";
import { parse } from "csv";
import * as db from "./db";
import { CalciatoreAddDTO } from "./models/calciatore";

const main = async () => {
    const calciatori = [];
    const parser = fs
        .createReadStream("./data/seriea.csv")
        .pipe(
            parse({ from_line: 2 })
        );

    let contatore = 0;
    for await (const calciatore of parser) {
        // 01/07/2000 00:00:00
        const dataString = String(calciatore[14]).substring(0, 10);

        const dataStringSplit = dataString.split("/");

        const giorno = Number(dataStringSplit[0]);
        const mese = Number(dataStringSplit[1]);
        const anno = Number(dataStringSplit[2]);

        const dataNascita = Date.UTC(anno, mese - 1, giorno);

        const c = new CalciatoreAddDTO(
            calciatore[2],
            dataNascita,
            calciatore[12],
            calciatore[4],
            "0",
            calciatore[9],
            false
        );

        await db.addCalciatore(c);
        contatore++;
        console.log(contatore, c.nome);
    }

    console.log(`Importati ${contatore} calciatori.`);
}

main();