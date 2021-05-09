Player = {};

RegisterNetEvent('NodeRP.Client.SendLocalMsg');
onNet("NodeRP.Client.SendLocalMsg", (name, id, msg) => {
	for (let i = 0; i < 255; i++) {
		if (NetworkIsPlayerActive(i)) {
			let player = GetPlayerFromServerId(id);
			let me = GetPlayerServerId(i);
			let coords = GetEntityCoords(GetPlayerPed(i));
			let mycoords = GetEntityCoords(GetPlayerPed(player));
			let dist = Vdist(mycoords, coords);
			
			if(me == id || dist <= 15) {
				emit('chat:addMessage', { args: [ `${name} ${NodeRP.Locales[Config.Locale]["localchat"]}: ${msg}` ], color: [230, 171, 255] });
				break;
			}
		}
	}
});

RegisterNetEvent('NodeRP.Client.ShoutMsg');
onNet("NodeRP.Client.ShoutMsg", (name, id, msg) => {
	for (let i = 0; i < 255; i++) {
		if (NetworkIsPlayerActive(i)) {
			let player = GetPlayerFromServerId(id);
			let me = GetPlayerServerId(i);
			let coords = GetEntityCoords(GetPlayerPed(i));
			let mycoords = GetEntityCoords(GetPlayerPed(player));
			let dist = Vdist(mycoords, coords);
			
			if(me == id || dist <= 20) {
				emit('chat:addMessage', { args: [ `${name} ${NodeRP.Locales[Config.Locale]["shout"]}: ${msg}` ], color: [230, 171, 255] });
				break;
			}
		}
	}
});

RegisterNetEvent('NodeRP.Client.SendMeMsg');
onNet("NodeRP.Client.SendMeMsg", (name, id, msg) => {
	for (let i = 0; i < 255; i++) {
		if (NetworkIsPlayerActive(i)) {
			let player = GetPlayerFromServerId(id);
			let me = GetPlayerServerId(i);
			let coords = GetEntityCoords(GetPlayerPed(i));
			let mycoords = GetEntityCoords(GetPlayerPed(player));
			let dist = Vdist(mycoords, coords);
			
			if(me == id || dist <= 20) {
				emit('chat:addMessage', { args: [ `** ${name} ${msg}` ], color: [230, 171, 255] });
				break;
			}
		}
	}
});

RegisterNetEvent('NodeRP.Client.SendDoMsg');
onNet("NodeRP.Client.SendDoMsg", (name, id, msg) => {
	for (let i = 0; i < 255; i++) {
		if (NetworkIsPlayerActive(i)) {
			let player = GetPlayerFromServerId(id);
			let me = GetPlayerServerId(i);
			let coords = GetEntityCoords(GetPlayerPed(i));
			let mycoords = GetEntityCoords(GetPlayerPed(player));
			let dist = Vdist(mycoords, coords);
			
			if(me == id || dist <= 20) {
				emit('chat:addMessage', { args: [ `${msg} (${name})` ], color: [230, 171, 255] });
				break;
			}
		}
	}
});

RegisterNetEvent( 'NodeRP.Client.GetPlayer' );
onNet( 'NodeRP.Client.GetPlayer', ( id, p ) => NodeRP.Client.GetPlayer( id, p ) );

RegisterNetEvent( 'NodeRP.Client.SpawnDeadPlayer' );
onNet( 'NodeRP.Client.SpawnDeadPlayer', ( ...args ) => NodeRP.Client.SpawnDeadPlayer( ...args ) );

NodeRP.Client.GetPlayer = ( id, p ) => {
	Player[ id ] = p;
	
	emitNet( 'NodeRP.Server.Log', false, `\x1b[33m[NodeRP Client]\x1b[37m Fetched Player ( ID: \x1b[32m${ id }\x1b[37m )` );
	
	return Player[ id ];
};

RegisterNetEvent( 'NodeRP.Client.DestroyPlayer' );
onNet( 'NodeRP.Client.DestroyPlayer', ( id ) => {
	Player[ id ] = null;
});

setInterval( () => {
	const ped = PlayerPedId();
	const player = GetPlayerServerId( PlayerId() );
	let coords = GetEntityCoords( ped );
	let still = IsPedStill( GetPlayerPed( -1 ) );
	
	if ( !still ) emitNet( 'NodeRP.Server.SavePos', player, coords );
}, 10000 );