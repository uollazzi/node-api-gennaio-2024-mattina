import mongoose from "mongoose";
import { Calciatore, CalciatoreAddDTO } from "./models/calciatore";

export const getCalciatori = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: "fantacalcio" });

        return await Calciatore.find();
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const getCalciatoreById = async (id: string) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: "fantacalcio" });

        return await Calciatore.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};

export const addCalciatore = async (calciatore: CalciatoreAddDTO) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: "fantacalcio" });

        const c = new Calciatore();
        c.nome = calciatore.nome;
        c.dataNascita = new Date(calciatore.dataNascita);
        c.piede = calciatore.piede;
        c.ruolo = calciatore.ruolo;
        c.numero = calciatore.numero;
        c.squadra = calciatore.squadra;
        c.infortunato = calciatore.infortunato;

        return await c.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};