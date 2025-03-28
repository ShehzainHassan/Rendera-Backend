import { Router } from "express";
import { subscribeUser } from "../controllers/newsletterController";

const router: Router = Router();

router.post("/subscribe", subscribeUser);

export default router;
