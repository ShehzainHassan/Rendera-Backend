const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const existingUser = await prisma.newsLetter.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already subscribed!" });
    }

    await prisma.newsLetter.create({
      data: { email },
    });

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
};

module.exports = { subscribeUser };
