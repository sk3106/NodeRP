RegisterNetEvent('NodeRP.Server.Load');
onNet('NodeRP.Server.Load', function (cb) {
	return cb(NodeRP);
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

exports('NodeRP.Server.SavePlayer', (id, cb) => {
	if (id != null) {
		if (NodeRP.Player[id]['Skin'] == null) NodeRP.Player[id].Skin = 'test';
		
		let data = null;
		let identifier = GetPlayerIdentifier(id, 0);
		let skin = NodeRP.Player[id].Skin, pos = JSON.stringify(NodeRP.Player[id].Pos), level = NodeRP.Player[id].Level, job = NodeRP.Player[id].Job, job_rank = NodeRP.Player[id].Job_rank, loadout = NodeRP.Player[id].Loadout, dead = NodeRP.Player[id].Dead;
		let playa = [skin, pos, level, job, job_rank, loadout, dead];
		
		NodeRP.DB.Query('UPDATE players SET skin = ?, pos = ?, adminlevel = ?, job = ?, job_rank = ?, loadout = ?, dead = ?', playa, (err, res) => {
			if (err) {
				cb(false);
				throw err;
			}
			else {
				return cb(true);
			}
		});
	}
});