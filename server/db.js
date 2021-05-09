NodeRP.DB.Query = (q, args, cb) => {
	setTimeout( () => {
		exports[ 'NodeRP' ][ 'Query' ]( q, args, cb );
	}, 0 );
};

NodeRP.DB.Shutdown = ( cb ) => exports[ 'NodeRP' ][ 'PoolEND' ]( cb );

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