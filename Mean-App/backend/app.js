const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const missionsRoutes = require("./routes/missions");
const userRoutes = require("./routes/user");

const app = express();


/*Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js */
/*Configuration mongoose*/
mongoose
  .connect(
    "mongodb://root:rootpassword@127.0.0.1:27017"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images"))); /*map the image directory as store for all images*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); /*configure the cross origin to allow the client app to communicate with the backend*/
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/missions", missionsRoutes);/* all requet that started by /api/missions should be routed tp missions.js file*/
app.use("/api/user", userRoutes);

module.exports = app;
