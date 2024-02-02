import mongoose from "mongoose";
import { CalciatoreModel, CalciatoreAddDTO, TrasferimentoDTO } from "./models/calciatore";

export const getCalciatori = async (page: number = 1, pageSize: number = 20, squadra?: string) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: "fantacalcio" });

        let search = {};

        if (squadra) {
            search = { squadra: squadra };
        }

        return await CalciatoreModel.find(search).skip((page - 1) * pageSize).limit(pageSize);
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

        return await CalciatoreModel.findById(id);
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

        const c = new CalciatoreModel();
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

export const trasferisciById = async (id: string, datiTrasferimento: TrasferimentoDTO) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: "fantacalcio" });

        const calciatore = await CalciatoreModel.findById(id);

        if (calciatore) {
            calciatore.squadra = datiTrasferimento.squadra;
            calciatore.numero = datiTrasferimento.numero;

            return await calciatore.save();
        }

        return undefined;
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
};