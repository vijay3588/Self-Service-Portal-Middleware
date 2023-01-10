require("dotenv").config();
const config = require("./appConfig/appConfig");
const routes = require("./utils/routes");
const { logger } = require("./logger/logger");
var express = require("express");
var app = express();
var cors = require("cors");
var helmet = require("helmet");
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(helmet());
app.use(
  express.json({ limit: "50mb", parameterLimit: 100000, extended: false })
);
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: false })
);

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

app.get("/", function (req, res, next) {
  res.json({ msg: "This has CORS enabled" });
});

// app.listen(appURL(config.app.url), appURL(config.app.url), ()=>{
//   logger.logIndex().info(`Listenning at ${config.app.url}`);
// })
//logger.logIndex().info(JSON.stringify(config.app));

app.listen(config.app.port, function () {
  logger
    .logIndex()
    .info(`Listening to middleware server at port:${config.app.port}`);
});

// Routes
app.use(`${config.app.publicUrl}`, routes);
