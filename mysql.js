var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 50,
	host: Config.DB.Host,
	user: Config.DB.User,
	password: Config.DB.Pass,
	database: Config.DB.Name
});

pool.on( 'connection', ( connection ) => {
	console.log( "\x1b[33m[NodeRP MySQL] \x1b[32mConnected to Pool!\x1b[37m ( ID: %d )", connection.threadId );
});

pool.getConnection( ( err, con ) => {
	if ( err ) throw err;

	con.query( 'SHOW TABLES LIKE ?', 'players', ( error, res ) => {
		if ( typeof res[0] != 'object' ) NodeRP.DB.Build();
		else emit( 'NodeRP.Ready' );
		
		con.release();

		if ( error ) throw error;
	});
});

exports( 'Query', ( q, args, cb ) => {
	setTimeout( () => {
		pool.query( q, args, cb );
	}, 0 );
});