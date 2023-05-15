const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");
const cores = require("cors");
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
