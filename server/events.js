RegisterNetEvent('NodeRP.Ready');
onNet('NodeRP.Ready', () => {
	console.log("\x1b[33m[NodeRP] \x1b[32mNodeRP is ready!\x1b[37m");
});

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()

	const player = global.source;

    setTimeout(() => {
        deferrals.update(`Hello ${name}. Your steam ID is being checked.`)
		
        let steamIdentifier = null;
		let ip = null;
		let license = null;
		let discord = null;
		let PC = null;
		
        for(let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
            const identifier = GetPlayerIdentifier(player, i);

            if (identifier.includes('steam:')) {
                steamIdentifier = identifier;
            }
			
			if (identifier.includes('ip:')) {
                ip = identifier;
            }
			
			if (identifier.includes('license:')) {
                license = identifier;
            }
			
			if (identifier.includes('discord:')) {
                discord = identifier;
            }
        }

        // pretend to be a wait
        setTimeout(() => {
            if (steamIdentifier === null) {
                deferrals.done("You are not connected to Steam.")
            } else {
				NodeRP.DB.Query('SELECT * FROM players WHERE identifier = ?', steamIdentifier, function (err, result, fields) {
				  if(err) throw err;

				  if(result[0] == null || result[0].identifier == null) {
					let skin = "mp_m_freemode_01";
					let pos = JSON.stringify({X: -1070.906250, Y: -2972.122803, Z: 13.773568});
					let newip = ip.slice("ip:");
					var geo = exports['NodeRP']['GetGeoIP'](newip);
					if (geo != null) PC = geo.country else PC = 'unknown';
					
					const playerdata = [steamIdentifier, license, discord, ip, skin, pos, PC];
					
					NodeRP.DB.Query('INSERT INTO players (identifier, license, discord, ip, skin, pos, country) VALUES (?, ?, ?, ?, ?, ?, ?)', playerdata, (err, res) => {
						if(err) throw err;
					  
						NodeRP.Player[player] = {};
						NodeRP.Player[player].Pos = JSON.parse(pos);
						NodeRP.Player[player].Skin = skin;
						NodeRP.Player[player].Steam = steamIdentifier;
						NodeRP.Player[player].firstspawn = true;
						NodeRP.Player[player].Dead = 0;
						NodeRP.Player[player].Loadout = {};
						NodeRP.Player[player].Level = 0;
						NodeRP.Player[player].Job = 'unemployed';
						NodeRP.Player[player].Job_rank = 0;
						NodeRP.Player[player].Country = PC;
					
						console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} ${NodeRP.Locales[Config.Locale]["Player_Inserted"]}`);
					});
				  }
				  else {
					NodeRP.Player[player] = {};
					NodeRP.Player[player].Pos = JSON.parse(result[0].pos);
					NodeRP.Player[player].Skin = result[0].skin;
					NodeRP.Player[player].Steam = result[0].identifier;
					NodeRP.Player[player].Dead = result[0].dead;
					NodeRP.Player[player].Loadout = result[0].loadout;
					NodeRP.Player[player].Level = result[0].adminlevel;
					NodeRP.Player[player].Job = result[0].job;
					NodeRP.Player[player].Job_rank = result[0].job_rank;
					NodeRP.Player[player].Country = result[0].country;
					
					if (NodeRP.Player[player].Skin == null) {
						NodeRP.Player[player].Skin = 'mp_m_freemode_01';
					}
					
					if (NodeRP.Player[player].Loadout == null) {
						NodeRP.Player[player].Loadout = {};
					}
					
					console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} ${NodeRP.Locales[Config.Locale]["Player_Loaded"]}`);
				  }
				});
				
				let embedip = ip.slice('ip:');
				let embedsteam = steamIdentifier.slice('steam:');
				let embeddiscord = discord.slice('discord:');
				
				if (PC == null) PC = 'Unknown';
				
				let fields = [{
					name: `Name`,
					value: GetPlayerName(player),
					inline: true
				},
				{
					name: `IP`,
					value: embedip,
					inline: true
				},
				{
					name: `Steam Identifier`,
					value: embedsteam,
					inline: true
				},
				{
					name: `Discord`,
					value: embeddiscord,
					inline: true
				},
				{
					name: `Country`,
					value: PC,
					inline: true
				}];
				
				emit("discord.sendEmbed", `${NodeRP.Locales[Config.Locale]["Discord-Player_Joined"]}`, `${name}`, fields, 4289797);
                deferrals.done()
            }
        }, 0)
    }, 0)
});

on("playerDropped", (reason) => {
    const player = global.source;
	let name = GetPlayerName(player);
	let ip = null;
	
	exports["NodeRP"]["NodeRP.Server.SavePlayer"](player,
		function(result) {
			if (result) {
				console.log(`\x1b[33m[NodeRP MySQL]\x1b[32m ${name} ${NodeRP.Locales[Config.Locale]["Saved"]}\x1b[37m`);
				NodeRP.Player[player] = null;
			}
			else {
				console.log(`\x1b[33m[NodeRP MySQL]\x1b[31m ${NodeRP.Locales[Config.Locale]["Save_Error"]} ${name}\x1b[37m`);
			}
		}
	);
	
	for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);

        if (identifier.includes('ip:')) {
            ip = identifier.slice('ip:');
			break;
        }
    }
	
	let fields = [{
		name: `IP`,
		value: ip,
		inline: false
	},
	{
		name: `Reason`,
		value: `${reason}`,
		inline: false
	}]

	discord.sendEmbed(`NodeRP.Locales[Config.Locale]["Discord-Player_Dropped"]`, `${name}`, fields, discord.colors.RED);
});

RegisterNetEvent("NodeRP.Server.Log");
onNet("NodeRP.Server.Log", (arg) => {
	console.log(`[NodeRP] Log: ${arg}`);
});

RegisterNetEvent("NodeRP.Server.PlayerSpawned");
onNet("NodeRP.Server.PlayerSpawned", (pos, skin) => {
	const player = global.source;
	let name = GetPlayerName(player);
	
	if (NodeRP.Player[player] == null) NodeRP.Player[player] = {};
	
	NodeRP.Player[player].Skin = skin;
	NodeRP.Player[player].Pos = pos;
	
	console.log(`\x1b[33m[NodeRP]\x1b[37m ${name} spawned & saved!`);
});

NodeRP.Server.SavePlayers = function() {
	console.log('HELLLO');
	const numIndices = GetNumPlayerIndices();
	
	console.log(`HELLI: ${numIndices}`);
	
	for (let pidx = 0; pidx < numIndices; pidx++) {
		console.log(`YEYE: ${pidx}`);
		const player = GetPlayerFromIndex(pidx);
		console.log(`PLAYA: ${player}`);
		let curid = GetPlayerIdentifier(player, 0);
		let pos = JSON.stringify(NodeRP.Player[player].Pos), skin = NodeRP.Player[player].Skin, dead = NodeRP.Player[player].Dead;
		let loadout = NodeRP.Player[player].Loadout, level = NodeRP.Player[player].Level, job = NodeRP.Player[player].Job, job_rank = NodeRP.Player[player].Job_rank, country = NodeRP.Player[player].Country;
		let playa = [skin, pos, level, job, job_rank, loadout, dead, country];
		
		NodeRP.DB.Query('UPDATE players SET skin = ?, pos = ?, adminlevel = ?, job = ?, job_rank = ?, loadout = ?, dead = ?, country = ?', playa, (err, res) => {
			if (err) throw err;
			
			if (!err) {
				console.log(`\x1b[33m[NodeRP]\x1b[37m Saved ${numIndices} players!`);
				break;
			}
		});
	}
}

setInterval(NodeRP.Server.SavePlayers, 10000);

onNet("chatMessage", (player, name, message) => {
	if (!message.includes('/')) {
		CancelEvent();
		
		emitNet('chat:addMessage', -1, { args: [ `${NodeRP.Locales[Config.Locale]["Global_Chat"]} ^0${name}(${player}): ${message}` ], color: [189, 248, 255] });
	}
	else {
		let commands = GetRegisteredCommands();
		let index = null;
		
		for (index in commands) {
			let cmdname = commands[index]['name'];
		  
			if (message.slice('/') != cmdname) {
				emitNet('chat:addMessage', -1, { args: [ NodeRP.Locales[Config.Locale]['invalid_cmd'] ] });
				CancelEvent();
				break;
			}
		}
	}
});