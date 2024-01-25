import mongoose from "mongoose";

const calciatoreSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome obbligatorio"] },
    dataNascita: { type: Date, required: [true, "Data nascita obbligatoria"] },
    piede: { type: String, required: [true, "Piede obbligatorio"] },
    ruolo: { type: String, required: [true, "Ruolo obbligatorio"] },
    numero: { type: String, required: [true, "Numero obbligatorio"] },
    squadra: { type: String, required: [true, "Squadra obbligatorio"] },
    infortunato: { type: Boolean, default: false }
});

export const Calciatore = mongoose.model("Calciatore", calciatoreSchema, "calciatori");