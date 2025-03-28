import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import newsletterRoutes from "./routes/newsletter";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en"],
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
  });

app.use(middleware.handle(i18next));

const allowedOrigins = ["http://localhost:5173", "https://rendera.netlify.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(i18next.t("errors.unauthorized_access")));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/newsletter", newsletterRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
