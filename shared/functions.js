exports('NodeRP.Server.GetPlayerIdentifier', (player, name) => {
	if (player != null && name != null) {
		for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
			const identifier = GetPlayerIdentifier(player, i);

			if (identifier.includes(`${name}:`)) {
				return identifier;
			}
		}
	}
});

exports('NodeRP.Server.GetAdminLevel', (id, cb) => {
	let mylvl = null;
	let identifier = GetPlayerIdentifier(id, 0);
	
	NodeRP.DB.Query('SELECT adminlevel FROM players WHERE identifier = ?', identifier, function (err, result, fields) {
		if(err) throw err;
		
		if (result[0] != null && result[0].adminlevel != null) {
			mylvl = result[0].adminlevel;
			
			return cb(mylvl);
		}
		else {
			return cb(null);
		}
	});
});

exports('NodeRP.Server.GetPos', (id, cb) => {
	let mypos = null;
	let identifier = GetPlayerIdentifier(id, 0);
	
	NodeRP.DB.Query('SELECT pos FROM players WHERE identifier = ?', identifier, function (err, result, fields) {
		if(err) throw err;
		
		if (result[0] != null && result[0].pos != null) {
			mypos = JSON.parse(result[0].pos);
			
			return cb(mypos);
		}
		else {
			return cb(null);
		}
	});
});

exports('NodeRP.Server.GetPlayerData', (id, cb) => {
	let data = null;
	let identifier = GetPlayerIdentifier(id, 0);
	
	NodeRP.DB.Query('SELECT * FROM players WHERE identifier = ?', identifier, function (err, result, fields) {
		if(err) throw err;
		
		if (result[0] != null && result[0].identifier != null) {
			data = result[0];
			
			return cb(data);
		}
		else {
			return cb(null);
		}
	});
});