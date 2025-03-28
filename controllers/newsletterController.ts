import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const subscribeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    res.status(400).json({ message: "Invalid email address" });
    return;
  }

  try {
    const existingUser = await prisma.newsLetter.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ message: "Email already subscribed!" });
      return;
    }

    await prisma.newsLetter.create({ data: { email } });

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
};
