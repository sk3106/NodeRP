var geoip = require('geoip-lite');

NodeRP.Player = {};

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()

	const player = global.source;

    setTimeout(() => {
        deferrals.update(`Hello ${name}. Your steam ID is being checked.`)
		
        let steamIdentifier = null;
		let ip = null;
		let license = null;
		let discord = null;
		
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
				let fields = [{
					name: `IP`,
					value: `${ip}`,
					inline: false
				},
				{
					name: `Steam Identifier`,
					value: `${steamIdentifier}`,
					inline: false
				}]
				
				con.query('SELECT * FROM players WHERE identifier = ?', `${steamIdentifier}`, function (err, result, fields) {
				  if(err) throw err;

				  if(result[0].identifier == null) {
					let skin = "mp_m_freemode_01";
					let pos = JSON.stringify({X: -1070.906250, Y: -2972.122803, Z: 13.773568});
					//var geo = geoip.lookup(`${ip}`);
					//var country = geo.country;
					
					const playerdata = [steamIdentifier, license, discord, ip, skin, pos];
					
					con.query('INSERT INTO players (identifier, license, discord, ip, skin, pos) VALUES (?, ?, ?, ?, ?, ?)', playerdata, (err, res) => {
					  if(err) throw err;
					  
					  NodeRP.Player[player] = {};
					  NodeRP.Player[player].Pos = JSON.parse(pos);
					  NodeRP.Player[player].Skin = skin;
					  NodeRP.Player[player].Steam = steamIdentifier;
					  NodeRP.Player[player].firstspawn = true;
					  console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} has been inserted in Database`);
					});
				  }
				  else {
					NodeRP.Player[player] = {};
					NodeRP.Player[player].Pos = JSON.parse(result[0].pos);
					NodeRP.Player[player].Skin = result[0].skin;
					NodeRP.Player[player].Steam = result[0].identifier;
					NodeRP.Player[player].firstspawn = true;
					console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} has been loaded from Database`);
				  }
				});
				
				emit("discord.sendEmbed", 'Player Joined', `${name}`, fields, 4289797);
                deferrals.done()
            }
        }, 0)
    }, 0)
});

on("playerDropped", (reason) => {
    let player = global.source;
	let name = GetPlayerName(player);
	let ip = null;
	
	NodeRP.Player[player] = null;
	
	for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);

        if (identifier.includes('ip:')) {
            ip = identifier;
        }
    }
	
	let fields = [{
		name: `IP`,
		value: `${ip}`,
		inline: false
	},
	{
		name: `Reason`,
		value: `${reason}`,
		inline: false
	}]

	discord.sendEmbed('Player Dropped', `${name}`, fields, discord.colors.RED);
});

RegisterNetEvent("NodeRP.Server.Log");
onNet("NodeRP.Server.Log", (arg) => {
	console.log(`[NodeRP] Log: ${arg}`);
});

onNet("chatMessage", (player, name, message) => {
	if (!message.includes('/')) {
		CancelEvent();
		
		emitNet('chat:addMessage', -1, { args: [ `[GLOBAL] ^0${name}(${player}): ${message}` ], color: [189, 248, 255] });
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