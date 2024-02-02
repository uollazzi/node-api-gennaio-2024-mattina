import { Request, Response, Router } from "express";
import * as db from "../db";
import { CalciatoreAddDTO, TrasferimentoDTO, convertToCalciatore } from "../models/calciatore";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // /?limit=20&page=1&squadra=Milan
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const squadra = req.query.squadra ? String(req.query.squadra) : undefined;

        const calciatori = await db.getCalciatori(page, limit, squadra);
        res.json(calciatori.map(c => convertToCalciatore(c)));
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const calciatore = await db.getCalciatoreById(id);

        if (calciatore) {
            res.json(convertToCalciatore(calciatore));
        } else {
            res.status(404).json({ message: "Calciatore non trovato" });
        }
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto." });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const calciatore: CalciatoreAddDTO = req.body;
        console.log(calciatore);

        const r = await db.addCalciatore(calciatore);
        res.json(convertToCalciatore(r));
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto." });
    }
});  // CRUD

router.post("/trasferimento/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const trasferimento: TrasferimentoDTO = req.body;
        console.log(trasferimento);

        const r = await db.trasferisciById(id, trasferimento);

        if (r) {
            res.json(convertToCalciatore(r));
        } else {
            res.status(404).json({ message: "Calciatore non trovato" });
        }
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto." });
    }
});


export default router;