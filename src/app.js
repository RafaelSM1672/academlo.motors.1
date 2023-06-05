const express = require("express");

const app = express();

//routes

const usersRoutes = require("./routes/users.routes");

const repairsRoutes = require("./routes/repairs.routes");

//middleware

app.use(express.json());

app.use((req,res,next) => {
  const time = new Date().toISOString();
  req.requestTime = time;
  next();
})

app.use("/api/v1/users", usersRoutes)

app.use("/api/v1/repairs", repairsRoutes)

module.exports = app;