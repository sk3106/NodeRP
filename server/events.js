RegisterNetEvent( 'NodeRP.Ready' );
onNet( 'NodeRP.Ready', () => {
	console.log( "\x1b[33m[NodeRP] \x1b[32mNodeRP is ready!\x1b[37m" );
});

RegisterNetEvent( 'NodeRP.Player.Get' );
onNet( 'NodeRP.Player.Get', ( id, cb ) => {
	let p = Player[ id ];
	
	cb( p );
});

on( 'playerConnecting' , ( name, setKickReason, deferrals ) => {
    deferrals.defer()

	const player = global.source;

    setTimeout(() => {
        deferrals.update( `Hello ${name}. Your ID is being checked.` )
		
        let steamIdentifier = null;
		let ip = null;
		let license = null;
		let discord = null;
		let PC = null;
		
        for ( let i = 0; i < GetNumPlayerIdentifiers( player ); i++ ) {
            const identifier = GetPlayerIdentifier( player, i );

            if ( identifier.includes( 'steam:' ) ) {
                steamIdentifier = identifier;
            }
			
			if ( identifier.includes( 'ip:' ) ) {
                ip = identifier;
            }
			
			if ( identifier.includes( 'license:' ) ) {
                license = identifier;
            }
			
			if ( identifier.includes( 'discord:' ) ) {
                discord = identifier;
            }
        }

        // pretend to be a wait
        setTimeout(() => {
            if ( license === null ) {
                deferrals.done( "ERROR! License not found. Please try reconnecting." )
            } else {
				let newip = ip.replace( 'ip:', '' );
				
				NodeRP.DB.Query( 'SELECT * FROM players WHERE identifier = ?', license, ( err, result, fields ) => {
					if ( err ) console.error( err );
				
					if ( result[0] == null || result[0].identifier == null ) {
						let geo = exports[ 'NodeRP' ][ 'GetGeoIP' ]( newip );
						let skin = 'mp_m_freemode_01';

						if ( geo != null ) PC = geo.country;
						else PC = 'unknown';

						const playerdata = [ license, steamIdentifier, discord, newip, skin, PC ];

						NodeRP.DB.Query( 'INSERT INTO players ( identifier, steam, discord, ip, skin, country ) VALUES ( ?, ?, ?, ?, ?, ? )', playerdata, ( err, res ) => {
							if ( err ) console.error( err );
						  
							Player[ license ] = new NodeRP.Player( license );
							Player[ license ].Steam = steamIdentifier;
							Player[ license ].Loadout = {};
							Player[ license ].Country = PC;
							Player[ license ].IP = newip;

							console.log( `\x1b[33m[NodeRP MySQL] \x1b[37m${name} ${NodeRP.Locales[Config.Locale]["Player_Inserted"]}` );
						});
					}
					else {
						Player[ license ] = new NodeRP.Player( license );
						Player[ license ].Pos = ( result[0].pos == null ) ? null : JSON.parse( result[0].pos );
						Player[ license ].Skin = result[0].skin;
						Player[ license ].Identifier = result[0].identifier;
						Player[ license ].Dead = result[0].dead;
						Player[ license ].Loadout = result[0].loadout;
						Player[ license ].Level = result[0].adminlevel;
						Player[ license ].Country = result[0].country;
						Player[ license ].Steam = result[0].steam;
						Player[ license ].IP = newip;

						console.log( `\x1b[33m[NodeRP MySQL] \x1b[37m${name} ${NodeRP.Locales[Config.Locale]["Player_Loaded"]}` );
					}
				});
				
				let embedip = ip.replace( 'ip:', '' );
				let embedid = license.replace( 'license:', '' );
				let embeddiscord = ( discord ) ? discord.replace( 'discord:', '' ) : 'Not found';
				
				if ( PC == null ) PC = 'Unknown';
				
				let fields = [{
					name: `Name`,
					value: GetPlayerName( player ),
					inline: true
				},
				{
					name: `IP`,
					value: embedip,
					inline: true
				},
				{
					name: `Identifier`,
					value: embedid,
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
				
				emit( "discord.sendEmbed", `${NodeRP.Locales[Config.Locale]["Discord-Player_Joined"]}`, `${name}`, fields, 4289797 );
                deferrals.done()
            }
        }, 0)
    }, 0)
});

on( 'playerDropped', ( reason ) => {
    const player = global.source;
	const id = GetPlayerIdentifier( player, 1 );
	let name = GetPlayerName( player );
	let ip = Player[ id ].IP;
	
	if ( !Player[ id ].FirstSpawn ) {
		Player[ id ].SavePlayer( result => {
			if ( result ) {
				console.log( `\x1b[33m[NodeRP MySQL]\x1b[32m ${name} ${NodeRP.Locales[Config.Locale]["Saved"]}\x1b[37m` );
				Player[ player ] = null;
			}
			else {
				console.log(`\x1b[33m[NodeRP MySQL]\x1b[31m ${NodeRP.Locales[Config.Locale]["Save_Error"]} ${name}\x1b[37m`);
			}
		});
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

	emit( 'discord.sendEmbed', `${NodeRP.Locales[Config.Locale]["Discord-Player_Dropped"]}`, `${name}`, fields, discord.colors.RED );
});

on( 'onResourceStop', ( resourceName ) => {
	if ( GetCurrentResourceName() != resourceName ) return 0;

	NodeRP.DB.Shutdown();
	NodeRP.Server.Log( false, '\x1b[33m[NodeRP] \x1b[31mNodeRP is shutting down!\x1b[37m' );
});

RegisterNetEvent( 'NodeRP.Server.Log' );
onNet( 'NodeRP.Server.Log', ( dfault, ...arg ) => NodeRP.Server.Log( dfault, ...arg ) );

RegisterNetEvent( 'NodeRP.Server.PlayerSpawned' );
onNet( 'NodeRP.Server.PlayerSpawned', ( player, firstspawn ) => {
	if ( !firstspawn ) return;
	
	const id = GetPlayerIdentifier( player, 1 );
	
	Player[ id ].FirstSpawn = false;
});

RegisterNetEvent( 'NodeRP.Server.SavePos' );
onNet( 'NodeRP.Server.SavePos', ( player, coords ) => {
	const id = GetPlayerIdentifier( player, 1 );
	
	if ( !id ) return 0;
	
	let posx = coords[0], posy = coords[1], posz = coords[2];
	let newpos = { x: posx, y: posy, z: posz };
	
	Player[ id ].Pos = newpos;
});

NodeRP.Server.SavePlayers = () => {
	const numIndices = GetNumPlayerIndices();
	
	for ( let pidx = 0; pidx < numIndices; pidx++ ) {
		const player = GetPlayerFromIndex( pidx );
		let curid = GetPlayerIdentifier( player, 1 );
		
		if ( curid == null ) continue;
		
		let plpos = ( Player[ curid ].Pos ? Player[ curid ].Pos : Config.DefaultPos );
		let pos = JSON.stringify({ x: plpos.x, y: plpos.y, z: plpos.z }), skin = Player[ curid ].Skin, dead = Player[ curid ].Dead;
		let loadout = Player[ curid ].Loadout, level = Player[ curid ].Level, country = Player[ curid ].Country;
		
		if ( !Player[ curid ].Loadout || Player[ curid ].Loadout == null || Player[ curid ].Loadout == '' ) Player[ curid ].Loadout = JSON.stringify({});
		
		let playa = [ skin, pos, level, loadout, dead, country ];
		
		NodeRP.DB.Query( 'UPDATE players SET skin = ?, pos = ?, adminlevel = ?, loadout = ?, dead = ?, country = ?', playa, ( err, res ) => {
			if ( err ) console.error( err );
			
			console.log(`\x1b[33m[NodeRP]\x1b[37m Saved ${numIndices} players!`);
		});
	}
}

setInterval( NodeRP.Server.SavePlayers, Config.SaveInterval );

onNet( 'chatMessage', ( player, name, message ) => {
	if ( !message.includes( '/' ) ) {
		CancelEvent();
		
		emitNet( 'chat:addMessage', -1, { args: [ `${NodeRP.Locales[Config.Locale]["Global_Chat"]} ^0${name}(${player}): ${message}` ], color: [189, 248, 255] });
	}
	else {
		let commands = GetRegisteredCommands();
		let index = null;
		
		for ( index in commands ) {
			let cmdname = commands[ index ][ 'name' ];
		  
			if ( message.slice( '/' ) != cmdname ) {
				emitNet( 'chat:addMessage', -1, { args: [ NodeRP.Locales[Config.Locale]['invalid_cmd'] ] });
				CancelEvent();
				break;
			}
		}
	}
});