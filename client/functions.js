RegisterNetEvent( 'NodeRP.Client.Get' );
onNet( 'NodeRP.Client.Get', ( cb ) => cb( NodeRP.Client ) );

NodeRP.Client.GetPOS = () => {
	let pos = GetEntityCoords(PlayerPedId(), false);
	let coords = JSON.stringify(pos);
	
	return coords;
}

NodeRP.Client.GetPlayers = ( ids ) => {
	if(ids != null) {
		if (NetworkIsPlayerActive(ids)) {
			let myid = GetPlayerServerId(ids);
			
			return myid;
		}
	}
}

NodeRP.Client.Notify = ( msg ) => {
	SetNotificationTextEntry('STRING');
	AddTextComponentSubstringWebsite(msg);
	DrawNotification(false, true);
}

NodeRP.Client.SetSkin = ( ped, m ) => {
	emitNet( 'NodeRP.Server.Log', true, 'client setskin' );
	
	let model;
	
	if ( !ped ) ped = PlayerPedId();
	if ( !m ) model = GetHashKey( 'mp_m_freemode_01' );
	else model = GetHashKey( m );
	
	RequestModel( model );
	
	if ( !HasModelLoaded( model ) ) {
		RequestModel( model );
		Wait( 10 );
	}
	
	SetPlayerModel( PlayerId(), model );
	SetPedComponentVariation( GetPlayerPed( -1 ), 0, 0, 0, 2 );
}

NodeRP.Client.Draw3DText = ( params ) => {
    if ( params.text.rgb == null ) params.text.rgb = [255, 255, 255];
    if ( params.text.textOutline == null ) params.text.textOutline = true;
	
	setTick(() => {
		setTimeout( () => {
			let entpos = GetEntityCoords( PlayerPedId(), true );
			
			if ( Vdist2( entpos[0], entpos[1], entpos[2], params.xyz.x, params.xyz.y, params.xyz.z ) < ( !params.radius ? 5000 : params.radius ) ) {
				let [ onScreen, _x, _y ] = GetScreenCoordFromWorldCoord( params.xyz.x, params.xyz.y, params.xyz.z );
				let ep = GetFinalRenderedCamCoord();
				let p = { x: ep[0], y: ep[1], z: ep[2] };
				let distance = GetDistanceBetweenCoords( p.x, p.y, p.z, params.xyz.x, params.xyz.y, params.xyz.z, 1 );
				let scale = ( 1 / distance ) * ( !params.perspectiveScale ? 4 : params.perspectiveScale );
				let fov = ( 1 / GetGameplayCamFov() ) * 75;
				scale = scale * fov * ( !params.text.scaleMultiplier ? 1 : params.text.scaleMultiplier );
				
				if ( onScreen ) {
					SetTextScale( 0.0, scale );
					SetTextFont( !params.text.font ? 0 : params.text.font );
					SetTextProportional( true );
					SetTextColour( params.text.rgb[0], params.text.rgb[1], params.text.rgb[2], 255 );
					
					if ( params.text.textOutline == true ) SetTextOutline();
					
					BeginTextCommandDisplayText( "STRING" );
					SetTextCentre( true );
					AddTextComponentString( params.text.content );
					EndTextCommandDisplayText( _x, _y );
				}
			}
		}, 0 );
    });
}

RegisterNetEvent( 'NodeRP.Client.Notify' );
onNet( "NodeRP.Client.Notify", ( msg ) => {
   NodeRP.Client.Notify( msg );
});

Greet = () => {
	let params = { xyz: { x: Config.DefaultPos[0], y: Config.DefaultPos[1], z: Config.DefaultPos[2]}, text: { content: `${NodeRP.Locales[Config.Locale]["welcome_msg"]}`, rgb: [245, 66, 108], textOutline: true, scaleMultiplier: 0.8, font: 1 }, perspectiveScale: 3.2, radius: 500 };
	
	NodeRP.Client.Draw3DText( params );
}

Greet();

if ( !Config.EnableAIDispatch ) {
	for ( let i = 0; i < 15; i++ ) {
		EnableDispatchService( i, false );
	}
}