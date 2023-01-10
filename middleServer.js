const config = require('./appConfig/appConfig');
const routes = require("./utils/routes");
const { logger } = require("./logger/logger");
var express = require("express");
const path = require('path');
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());



app.get("/", function (req, res, next) {
  res.json({ msg: "This has CORS enabled" });
});


//logger.logIndex().info(JSON.stringify(config.app));
  
app.listen(config.app.port,  function () {
      logger.logIndex().info(`Listening Middleware server at port:${config.app.port}`);
    });
// Routes
app.use(`${config.app.publicUrl}`, routes);


//const app_front = express();
var PUBLIC_URL = process.env.PUBLIC_URL || '/ssp';

app.use(PUBLIC_URL,express.static(path.join(__dirname, '../build')));

app.get(PUBLIC_URL+"/*", function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// const frontServer={
//   port: process.env.SSP_FRONT_PORT || "4000"
// };
// logger.logIndex().info(JSON.stringify(frontServer));

// app_front.listen(frontServer.port,()=>{
//   logger.logIndex().info(`Listenning Front server at ${frontServer.port}`);
// })
