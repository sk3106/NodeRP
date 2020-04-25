var mysql = require('mysql');

var con = mysql.createConnection({
  host: Config.DB.Host,
  user: Config.DB.User,
  password: Config.DB.Pass,
  database: Config.DB.Name
});

con.connect(function(err) {
  if (err) throw err;
  console.log("\x1b[33m[NodeRP MySQL] \x1b[32mConnected to Database!");
});