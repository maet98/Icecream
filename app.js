const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import Routes
const userRoute = require("./routes/userRoute");

//Use Routes
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("We are on home");
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    dbName: "Icecream",
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err =>
    console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err)
  );

app.listen(3000);
