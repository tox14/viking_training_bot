const express = require("express");

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

module.exports = (bot) => {
  app.post("/" + bot.token, (req, res) => {
    console.log(req.body);
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
