require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const checkEmailQuery = "SELECT * FROM NewsLetter WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already subscribed!" });
    }

    const insertEmailQuery = "INSERT INTO NewsLetter (email) VALUES (?)";
    db.query(insertEmailQuery, [email], (err, result) => {
      if (err) {
        console.error("Error inserting email:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Subscribed successfully!" });
    });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
