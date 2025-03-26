require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsletterRoutes = require("./routes/newsletter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/newsletter", newsletterRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
