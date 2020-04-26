var geoip = require('geoip-lite');

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

					  console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} has been inserted in Database`);
					});
				  }
				  else {
					console.log(`\x1b[33m[NodeRP MySQL] \x1b[37m${name} has been loaded from Database`);
				  }
				});
				
				emit("discord.sendEmbed", 'Player Joined', `${name}`, fields, 4289797);
                deferrals.done()
            }
        }, 0)
    }, 0)
})

on("playerDropped", (reason) => {
    let player = global.source;
	let name = GetPlayerName(player);
	let ip = null;
	
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