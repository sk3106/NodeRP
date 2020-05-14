on('playerSpawned', () => {
	console.log("YEE");
	
	//let pos = exports.NodeRP:GetPos();
	
	//NodeRP.Client.PlayerSpawned(pos);
	
	/*if(firstspawn) {
		emit('chat:addMessage', { args: [ `${NodeRP.Locales[Config.Locale]["welcome_msg"]}` ] })
		SetEntityCoords(PlayerPedId(), NodeRP.Player[GetPlayerServerId(PlayerId())].Pos);
		let Model = GetHashKey(NodeRP.Player[GetPlayerServerId(PlayerId())].Skin);
		
		if(IsModelValid(Model)) {
			if(!HasModelLoaded(Model)) {
				RequestModel(Model);
				
				while(!HasModelLoaded(Model))
				{
					Citizen.Wait(0);
				}
				
				SetPlayerModel(PlayerId(), Model);
			}
		}
	}*/
});