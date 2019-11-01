const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var schedule = require("node-schedule");
const {checkEmail} = require("./Repository/orderPackRepository");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import Routes
const userRoute = require("./routes/userRoute");
const orderPackRoute = require("./routes/OrderPackRoute");
const orderRoute = require("./routes/orderRoute");

//Use Routes
app.use("/api/user", userRoute);
app.use("/api/orderPack",orderPackRoute);
app.use("/api/order",orderRoute);

app.get("/", (req, res) => {
  res.send("Ice cream order Api");
});


/**
 * @author Miguel Estevez
 * @description Evento para mandar los emails. Chequea cada 5 minutos si alguna lista 
 * ha expirado y manda un email a la persona que le toque.
 */
var event = schedule.scheduleJob("*/1 * * * *",async()=>{
  const check = await checkEmail();
});

//Connection to the database via an orm
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
