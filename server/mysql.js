var mysql = require('mysql');

var con = mysql.createConnection({
  host: Config.DB.Host,
  user: Config.DB.User,
  password: Config.DB.Pass,
  database: Config.DB.Name
});

con.connect(function(err) {
	if (err) throw err;
  
	console.log("\x1b[33m[NodeRP MySQL] \x1b[32mConnected to Database!\x1b[37m");
  
	NodeRP.DB.Query('SHOW TABLES LIKE ?', 'players', function (err, res) {
		if (err) throw err;
		
		if (typeof res[0] != 'object') {
			NodeRP.DB.Build();
		} else {
			emit('NodeRP.Ready');
		}
    });
});

NodeRP.DB.Query = (q, args, cb) => {
	con.query(q, args, cb);
};

NodeRP.DB.Build = (cb) => {
	console.log('\x1b[33m[NodeRP MySQL] \x1b[36mBuilding Database...\x1b[37m');
	
	setImmediate(() => {
		console.log('\x1b[33m[NodeRP MySQL] \x1b[32mTables created, build succeeded!\x1b[37m');
		emit('NodeRP.Ready');
	});
	
	NodeRP.DB.Query(BuildSQL[1], [], function (err, res) {
		if (err) {
			console.log('\x1b[33m[NodeRP MySQL] \x1b[31mDatabase Build failed!\x1b[37m');
			
			throw err;
		}
	});
	
	NodeRP.DB.Query(BuildSQL[2], [], function (err, res) {
		if (err) {
			console.log('\x1b[33m[NodeRP MySQL] \x1b[31mDatabase Build failed!\x1b[37m');
			
			throw err;
		}
	});
	
	NodeRP.DB.Query(BuildSQL[3], [], function (err, res) {
		if (err) {
			console.log('\x1b[33m[NodeRP MySQL] \x1b[31mDatabase Build failed!\x1b[37m');
			
			throw err;
		}
	});
	
	NodeRP.DB.Query(BuildSQL[4], [], function (err, res) {
		if (err) {
			console.log('\x1b[33m[NodeRP MySQL] \x1b[31mDatabase Build failed!\x1b[37m');
			
			throw err;
		}
	});
};