require("dotenv").config();

const express = require("express");
const bot = require("./bot");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Web server started on port: " + port);
});

app.post("/" + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
