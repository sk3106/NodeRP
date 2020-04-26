on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()

    setTimeout(() => {
        deferrals.update(`Hello ${name}. Your steam ID is being checked.`)

        const player = global.source;
        let steamIdentifier = null;
		let ip = null;

        for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
            const identifier = GetPlayerIdentifier(player, i);

            if (identifier.includes('steam:')) {
                steamIdentifier = identifier;
            }
			
			if (identifier.includes('ip:')) {
                ip = identifier;
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
				
				discord.sendEmbed('Player Joined', `${name}`, fields, discord.colors.GREEN);
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