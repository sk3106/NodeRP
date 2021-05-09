var PlayerDead = false;

on( 'onClientMapStart', () => {
	exports.spawnmanager.setAutoSpawn( false );
	
	let pid = GetPlayerServerId( PlayerId() );

	emitNet( 'NodeRP.Bridge.GetPlayer', pid );
	
	if ( Player[ pid ] == null ) emitNet( 'NodeRP.Bridge.GetPlayer', pid );
	
	setTimeout( async () => {
		let ped = PlayerPedId();
		let firstspawn = Player[ pid ].firstspawn;
		let model = Player[ pid ].skin;
		let pos = Player[ pid ].pos;
		let name = GetPlayerName( PlayerId() );
		
		if ( !pos ) {
			let stuff = { x: Config.DefaultPos[0], y: Config.DefaultPos[1], z: Config.DefaultPos[2], model: model };
			
			exports[ 'spawnmanager' ][ 'spawnPlayer' ]( stuff, () => {
				SetPedDefaultComponentVariation( PlayerPedId() );
				
				emitNet( 'NodeRP.Server.PlayerSpawned', pid, true );
			
				Player[ pid ].firstspawn = false;
			});
		}
		else {
			if ( firstspawn ) {
				emitNet( 'NodeRP.Server.PlayerSpawned', pid, true );
			
				Player[ pid ].firstspawn = false;
			}
			
			let stuff = { x: pos.X, y: pos.Y, z: pos.Z + 0.00, model: model };
			
			exports[ 'spawnmanager' ][ 'spawnPlayer' ]( stuff, () => SetPedDefaultComponentVariation( PlayerPedId() ) );
		}
		
		Player[ pid ].spawned = true;
		
		emitNet( 'NodeRP.Server.Log', false, `\x1b[33m[NodeRP Client]\x1b[37m ${name} spawned.` );
	}, 500 );
});

setTick(() => { 
	setTimeout( () => {
		SetPlayerHealthRechargeMultiplier( PlayerId(), 0 );
	}, 100 );
});

setTick(() => {
	setTimeout( () => {
		if ( PlayerDead ) {
			DisableAllControlActions( 0 );
			EnableControlAction( 0, 47, true );
			EnableControlAction( 0, 245, true );
			EnableControlAction( 0, 38, true );
		}
	}, 10 );
});

GenericText = () => {
	SetTextFont( 4 );
	SetTextScale( 0.0, 0.5 );
	SetTextColour( 255, 255, 255, 255 );
	SetTextDropshadow( 0, 0, 0, 0, 255 );
	SetTextOutline();
	SetTextCentre( true );
}

NodeRP.FormatSeconds = ( s ) => { 
	let pretty = new Date( s * 1000 ).toISOString().substr( 11, 8 );
	
	return pretty;
}

NodeRP.Client.GetClosestHospital = ( pCoords ) => {
	let hospitals = Config.Hospitals, data = {};
	
	hospitals.forEach( v => {
		let pos = v;
		
		if ( Vdist2( v.x, v.y, v.z, pCoords.x, pCoords.y, pCoords.z ) < Config.HospitalRadius ) {
			data = { x: v[ 'x' ] + 0.00, y: v[ 'y' ] + 0.00, z: v[ 'z' ] + 0.00 }
			
			const [ _, newZ ] = GetGroundZFor_3dCoord( v.x, v.y, v.z );
			data.z = newZ;
		}
	});
	
	if ( data ) return data;
}

NodeRP.Client.PlayerDead = () => {
	if ( !PlayerDead ) {
		let ped = PlayerPedId();
		let id = GetPlayerServerId( PlayerId() );
		
		if ( id ) Player[ id ].dead = true;
		if ( Config.Revive ) NodeRP.Client.ReviveTimer();
		else return NodeRP.Client.SpawnDeadPlayer( false );
		
		StartScreenEffect( 'DeathFailMPDark', 0, false );
		StartScreenEffect( 'DeathFailMPIn', 0, false );
		ShakeGameplayCam( 'DEATH_FAIL_IN_EFFECT_SHAKE', 1.0 );
		
		let scaleform = RequestScaleformMovie( 'MP_BIG_MESSAGE_FREEMODE' );

		if ( !HasScaleformMovieLoaded( scaleform ) ) scaleform = RequestScaleformMovie( 'MP_BIG_MESSAGE_FREEMODE' );
		
		PushScaleformMovieFunction( scaleform, "SHOW_SHARD_WASTED_MP_MESSAGE" );
		BeginTextCommandScaleformString( "STRING" );
		AddTextComponentSubstringTextLabel( "RESPAWN_W" );
		EndTextCommandScaleformString();
		PopScaleformMovieFunctionVoid();
		DrawScaleformMovieFullscreen( scaleform, 255, 255, 255, 255 );
		
		PlayerDead = true;
	}
}

NodeRP.Client.ReviveTimer = () => {
	let bleedout = Math.floor( Config.BleedoutInterval );
	
	setInterval(() => {
		if ( PlayerDead ) {
			if ( bleedout > 0 ) bleedout--;
			else return NodeRP.Client.SpawnDeadPlayer( false );
		}
	}, 1000 );
	
	setTick(() => {
		let txt = null, TimeHeld = 0;

		if ( bleedout > 0 && PlayerDead ) {
			txt = `${ NodeRP.Locales[ Config.Locale ][ 'Bleed-Text' ] } ~g~${ NodeRP.FormatSeconds( bleedout ) }~w~.`;

			if ( Config.ReviveRespawn ) {
				if ( IsControlPressed( 0, 38 ) && TimeHeld > 60 ) return NodeRP.Client.SpawnDeadPlayer( false );
			}

			if ( IsControlPressed( 0, 38 ) ) TimeHeld++;

			GenericText();
	
			SetTextEntry( 'STRING' );
			AddTextComponentString( txt );
			EndTextCommandDisplayText( 0.5, 0.8 );
		}
	}, 0 );
}

NodeRP.Client.FreezePlayer = ( p, freeze ) => {
	SetPlayerControl( p, freeze, false );

    let ped = GetPlayerPed( p );

    if ( !freeze ) {
        if ( !IsEntityVisible( ped ) ) SetEntityVisible( ped, true );
        if ( !IsPedInAnyVehicle( ped ) ) SetEntityCollision( ped, true );

        FreezeEntityPosition( ped, false );
        SetPlayerInvincible( p, false );
	}
    else {
        if ( !IsEntityVisible( ped ) ) SetEntityVisible( ped, true );

        FreezeEntityPosition( ped, true );
        SetPlayerInvincible( p, true );

        if ( !IsPedFatallyInjured( ped ) ) ClearPedTasksImmediately( ped );
    }
}

NodeRP.Client.SpawnDeadPlayer = ( revive, reviver ) => {
	let id = GetPlayerServerId( PlayerId() );
	let model = ( !Player[ id ].skin ) ? GetHashKey( 'mp_m_freemode_01' ) : GetHashKey( Player[ id ].skin );

	setTimeout( async () => {
		let ped = PlayerPedId();
		
		if ( revive ) {
			let encoords = GetEntityCoords( ped ), heading = GetEntityHeading( ped );
			let coords = { x: encoords[ 0 ], y: encoords[ 1 ], z: encoords[ 2 ] };
			
			if ( coords ) {
				coords.x = coords.x + 0.00;
				coords.y = coords.y + 0.00;
				coords.z = coords.z + 0.00;
				heading = ( !heading ) ? 0 : heading + 0.00;
			}
			
			StopScreenEffect( 'DeathFailMPDark' );
			StopScreenEffect( 'DeathFailMPIn' );
			StopGameplayCamShaking();
			PlaySoundFrontend( -1, "MP_Impact", "WastedSounds", true );

			DoScreenFadeOut( 800 );

			while ( !IsScreenFadedOut() ) DoScreenFadeOut( 800 );
			
			NodeRP.Client.FreezePlayer( ped, true );

			SetEntityCoordsNoOffset( ped, coords.x, coords.y, coords.z, false, false, false, true );
			NetworkResurrectLocalPlayer( coords.x, coords.y, coords.z, heading, true, true, false );
			SetEntityHealth( ped, Config.ReviveHealth );
			
			ClearPedTasksImmediately( ped );

			NodeRP.Client.FreezePlayer( ped, false );
			
			RequestModel( model );

			while ( !HasModelLoaded( model ) ) await WaitFor( 100 );

			SetPlayerModel( PlayerId(), model );
			SetPedDefaultComponentVariation( PlayerPedId() );
			SetModelAsNoLongerNeeded( model );

			ped = PlayerPedId();
			
			DoScreenFadeIn( 800 );
			
			NodeRP.Client.Notify( 'You have been ~p~revived~s~ by ~g~' + reviver + '.' );

			Player[ id ].spawned = true;
			Player[ id ].dead = false;

			PlayerDead = false;
		}
		else {
			let roughCoords = GetEntityCoords( ped ), pCoords = { x: roughCoords[ 0 ], y: roughCoords[ 1 ], z: roughCoords[ 2 ] };
			let coords = NodeRP.Client.GetClosestHospital( pCoords ), heading = 0;
			
			if ( !coords ) coords = Config.FallbackHospital;
			
			if ( coords ) {
				coords.x = coords.x + 0.00;
				coords.y = coords.y + 0.00;
				coords.z = coords.z + 0.00;
				heading = ( !heading ) ? 0 : heading + 0.00;
			}
			
			StopScreenEffect( 'DeathFailMPDark' );
			StopScreenEffect( 'DeathFailMPIn' );
			StopGameplayCamShaking();
			PlaySoundFrontend( -1, "MP_Impact", "WastedSounds", true );
			
			DoScreenFadeOut( 800 );
			
			while ( !IsScreenFadedOut() ) DoScreenFadeOut( 800 );

			NodeRP.Client.FreezePlayer( ped, true );

			RequestCollisionAtCoord( coords.x, coords.y, coords.z );

			SetEntityCoordsNoOffset( ped, coords.x, coords.y, coords.z, false, false, false, true );
			NetworkResurrectLocalPlayer( coords.x, coords.y, coords.z, heading, true, true, false );
			
			SetEntityHealth( ped, 300 );
			
			RequestModel( model );

			while ( !HasModelLoaded( model ) ) await WaitFor( 100 );

			SetPlayerModel( PlayerId(), model );
			SetPedDefaultComponentVariation( PlayerPedId() );
			SetModelAsNoLongerNeeded( model );

			ped = PlayerPedId();
			
			ClearPedBloodDamage( ped );
			ClearPedTasksImmediately( ped );
			ClearPlayerWantedLevel( PlayerId() );
			
			DoScreenFadeIn( 800 );

			NodeRP.Client.FreezePlayer( ped, false );

			emit( 'playerSpawned', false );
			
			NodeRP.Client.Notify( 'You have spawned at: ~g~Closest Hospital.' );

			Player[ id ].spawned = true;
			Player[ id ].dead = false;

			PlayerDead = false;
		}
	}, 0 );
}

setInterval(() => {
	setTimeout( () => {
		let playerPed = PlayerPedId();

		if ( NetworkIsPlayerActive( PlayerId() ) ) {
			if ( IsPedFatallyInjured( playerPed ) && !PlayerDead ) return NodeRP.Client.PlayerDead();
		}
	}, 0 );
}, 0 );