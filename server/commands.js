RegisterCommand("l", async (source, args) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet("NodeRP.Client.SendLocalMsg", -1, name, id, msg);
});

RegisterCommand("s", async (source, args) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet("NodeRP.Client.ShoutMsg", -1, name, id, msg);
});

RegisterCommand("me", async (source, args) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet("NodeRP.Client.SendMeMsg", -1, name, id, msg);
});

RegisterCommand("do", async (source, args) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet("NodeRP.Client.SendDoMsg", -1, name, id, msg);
});

RegisterCommand("admins", async (source, args) => {
	con.query('SELECT * FROM players WHERE adminlevel >= ?', 1, function (err, result, fields) {
		if(err) throw err;
		
		if (result[0] != null && result[0].adminlevel >= 1) {
			for (let i = 0; i < result.length; i++) {
				let dbid = result[i].identifier;
				let alvl = result[i].adminlevel;
				const numIndices = GetNumPlayerIndices();
		
				for (let pidx = 0; pidx < numIndices; pidx++) {
					const player = GetPlayerFromIndex(pidx);
					let curid = GetPlayerIdentifier(player, 0);
					
					if (curid == dbid) {
						let rank = Config.ARanks[alvl];
						let name = GetPlayerName(player);
						
						emitNet('chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["admins_online"]}: ${rank} - ${name}` ], color: [66, 245, 138] });
					}
					else {
						emitNet('chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["no_admins_online"]}` ], color: [255, 97, 97] });
					}
				}
			}
		}
		else {
			emitNet('chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["no_admins_online"]}` ], color: [255, 97, 97] });
		}
	});
});