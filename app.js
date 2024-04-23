require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// Connectione a MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Conncting a MongoDB"))
  .catch((err) => console.error("Error at MongoDB ", err));

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server at port ${PORT}`));
