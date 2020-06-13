on('onClientGameTypeStart', () => {
  let pos = NodeRP.Player[GetPlayerServerId(PlayerId())].Pos;
  let mdl = NodeRP.Player[GetPlayerServerId(PlayerId())].Skin;
  
  if (pos == null) pos = {x: 686.245, y: 577.950, z: 130.461};
  if (mdl == null) mdl = 'a_m_m_skater_01';
  
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer({
      x: pos['x'],
      y: pos['y'],
      z: pos['z'],
      model: mdl
    }, () => {
      emit('chat:addMessage', {
        args: [
          `${NodeRP.Locales[Config.Locale]["welcome_msg"]}`
        ]
      })
    });
  });

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
});

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

onNet("playerSpawned", () => {
	emit('chat:addMessage', { args: [ `${NodeRP.Locales[Config.Locale]["welcome_msg"]}` ] });
	
	const ped = PlayerPedId();
	let model = 'mp_m_freemode_01';
	
	SetEntityCoords(ped, -1070.90625, -2972.122803, 13.773568 + 0.0);
	
	let pos = GetEntityCoords(ped);
	
	emitNet('NodeRP.Server.PlayerSpawned', pos, model);
});