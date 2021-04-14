RegisterNetEvent( 'NodeRP.Bridge.GetPlayer' );
onNet( 'NodeRP.Bridge.GetPlayer', ( id ) => {
	const iden = GetPlayerIdentifier( id, 1 );
	let player = Player[ iden ];
	
	emitNet( 'NodeRP.Client.GetPlayer', id, id, player );
	emit( 'NodeRP.Server.Log', false, `\x1b[33m[NodeRP]\x1b[37m Sent Player ( ID: \x1b[32m${ id }\x1b[37m )` );
});