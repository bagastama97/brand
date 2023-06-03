const { Router } = require("express");
const express = require("express");
const { route } = require("./routes/index");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes/index");
const cors = require("cors");
const errorHandling = require("./middleware/errorHandler");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandling);
module.exports = app;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
