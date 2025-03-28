import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import newsletterRoutes from "./routes/newsletter";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors());
app.use(express.json());

app.use("/newsletter", newsletterRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
