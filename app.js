require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;

// Connectione a MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
   
  })
  .then(() => console.log("Conncting a MongoDB"))
  .catch((err) => console.error("Error at MongoDB ", err));

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", routes);

app.listen(PORT, () => console.log(`Server at port ${PORT}`));
