const db = require("../db");

const subscribeUser = (req, res) => {
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
    db.query(insertEmailQuery, [email], (err) => {
      if (err) {
        console.error("Error inserting email:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json({ message: "Subscribed successfully!" });
    });
  });
};

module.exports = { subscribeUser };
