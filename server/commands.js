NodeRP.Server.RegisterCommand( "l", "player", async ( source, args ) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet( "NodeRP.Client.SendLocalMsg", -1, name, id, msg );
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "localchat" ] );

NodeRP.Server.RegisterCommand( "s", "player", async ( source, args ) => {
	let msg = args.join(" ");
	let name = GetPlayerName( source );
	let id = source;
	
	emitNet( "NodeRP.Client.ShoutMsg", -1, name, id, msg );
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "shoutchat" ] );

NodeRP.Server.RegisterCommand( "me", "player", async ( source, args ) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet( "NodeRP.Client.SendMeMsg", -1, name, id, msg );
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "me" ] );

NodeRP.Server.RegisterCommand( "do", "player", async ( source, args ) => {
	let msg = args.join(" ");
	let name = GetPlayerName(source);
	let id = source;
	
	emitNet( "NodeRP.Client.SendDoMsg", -1, name, id, msg );
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "do" ] );

NodeRP.Server.RegisterCommand( "revive", "player", async ( source, args ) => {
	let target = ( !args[ 0 ] ) ? source : args[ 0 ];
	let myname = GetPlayerName( source );
	
	emitNet( "NodeRP.Client.SpawnDeadPlayer", target, true, myname );
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "revive" ] );

NodeRP.Server.RegisterCommand( "cmds", "player", async ( source, args ) => {
	let commands = NodeRP.Commands;
	let cmd = null;

	emitNet( 'chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["Available_Commands"]}:` ] } );

	for ( cmd in commands ) {
		if ( NodeRP.Commands[ cmd ].group == 'player' ) {
			emitNet( 'chat:addMessage', source, { args: [ `${cmd}` ] } );
		}
	}
	
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "cmds" ] );

NodeRP.Server.RegisterCommand( "admins", "player", async ( source, args ) => {
	NodeRP.DB.Query( 'SELECT * FROM players WHERE adminlevel >= ?', 1, ( err, result ) => {
		if ( err ) console.error( err );
		
		if ( result[0] != null && result[0].adminlevel >= 1 ) {
			for ( let i = 0; i < result.length; i++ ) {
				let dbid = result[i].identifier;
				let alvl = result[i].adminlevel;
				const numIndices = GetNumPlayerIndices();
		
				for ( let pidx = 0; pidx < numIndices; pidx++ ) {
					const player = GetPlayerFromIndex( pidx );
					let curid = GetPlayerIdentifier( player, 1 );
					
					if ( curid == dbid ) {
						let rank = Config.ARanks[ alvl ];
						let name = GetPlayerName( player );
						
						emitNet( 'chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["admins_online"]}: ${rank} - ${name}` ], color: [66, 245, 138] } );
					}
					else {
						emitNet( 'chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["no_admins_online"]}` ], color: [255, 97, 97] } );
					}
				}
			}
		}
		else {
			emitNet( 'chat:addMessage', source, { args: [ `${NodeRP.Locales[Config.Locale]["no_admins_online"]}` ], color: [255, 97, 97] } );
		}
	});
}, NodeRP.Locales[ Config.Locale ][ "chat_suggestions" ][ "admins" ] );