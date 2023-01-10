module.exports = {
  apps : [{
    name: "ssp_mid_app",
    script: "index.js",
    instances : 0,
    exec_mode : "cluster",
    error_file: "./logger/logs/pm2/error.log",
    out_file: "./logger/logs/pm2/out.log",
    pid_file: "./logger/logs/pm2/pm_id.pid",
    log_date_format: "YYYY-MM-DD_HH-mm-ss"
  }]
}
