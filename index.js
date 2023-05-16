const { Router } = require("express");
const express = require("express");
const { route } = require("./routes/index");
const app = express();
const port = 3000;
const router = require("./routes/index");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
