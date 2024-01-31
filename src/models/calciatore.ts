import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

// MODELLI DB
const calciatoreSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome obbligatorio"] },
    dataNascita: { type: Date, required: [true, "Data nascita obbligatoria"] },
    piede: { type: String, required: [true, "Piede obbligatorio"] },
    ruolo: { type: String, required: [true, "Ruolo obbligatorio"] },
    numero: { type: String, required: [true, "Numero obbligatorio"] },
    squadra: { type: String, required: [true, "Squadra obbligatorio"] },
    infortunato: { type: Boolean, default: false },
});

export type Calciatore = HydratedDocument<InferSchemaType<typeof calciatoreSchema>>;
export const CalciatoreModel = mongoose.model("Calciatore", calciatoreSchema, "calciatori");
// MODELLI DB

// MODELLI API
export class CalciatoreAddDTO {
    constructor(
        public nome: string,
        public dataNascita: number,
        public piede: string,
        public ruolo: string,
        public numero: string,
        public squadra: string,
        public infortunato: boolean,
    ) {

    }
}

export interface ICalciatore {
    id: string;
    nome: string;
    dataNascita: number;
    piede: string;
    ruolo: string;
    numero: string;
    squadra: string;
    infortunato: boolean;
}
// MODELLI API

export const convertToCalciatore = (calciatore: Calciatore): ICalciatore => {

    const c: ICalciatore = {
        id: calciatore.id,
        nome: calciatore.nome,
        dataNascita: calciatore.dataNascita.getTime(),
        piede: calciatore.piede,
        ruolo: calciatore.ruolo,
        squadra: calciatore.squadra,
        numero: calciatore.numero,
        infortunato: calciatore.infortunato
    }

    return c;
}

