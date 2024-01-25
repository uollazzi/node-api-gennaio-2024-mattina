import mongoose from "mongoose";
import { Calciatore } from "./models/calciatore";

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