import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import i18next from "i18next";

const prisma = new PrismaClient();

export const subscribeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const lang = req.language || "en";

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    res
      .status(400)
      .json({ message: i18next.t("errors.invalid_email", { lng: lang }) });
    return;
  }

  try {
    const existingUser = await prisma.newsLetter.findUnique({
      where: { email },
    });

    if (existingUser) {
      res
        .status(409)
        .json({ message: i18next.t("errors.email_exists", { lng: lang }) });
      return;
    }

    await prisma.newsLetter.create({ data: { email } });

    res
      .status(200)
      .json({
        message: i18next.t("success.subscription_successful", { lng: lang }),
      });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: i18next.t("errors.database_error", { lng: lang }) });
  }
};
