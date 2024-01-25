import { Request, Response, Router } from "express";
import * as db from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const calciatori = await db.getCalciatori();
    res.json(calciatori);
});


export default router;