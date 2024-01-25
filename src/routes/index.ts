import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Benvenuti sul Blog REST API");
});

router.get("/contatti", (req: Request, res: Response) => {
    res.send("Conatattaci per saperne di più!");
});

router.get("/chi-siamo", (req: Request, res: Response) => {
    res.send("Siamo solo noi");
});

export default router;