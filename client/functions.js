NodeRP.Client.GetPOS = () => {
	let pos = GetEntityCoords(PlayerPedId(), false);
	let coords = JSON.stringify(pos);
	
	return coords;
};

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
};

RegisterNetEvent('NodeRP.Client.Notify');
onNet("NodeRP.Client.Notify", (msg) => {
   NodeRP.Client.Notify(msg);
});

if (!Config.EnableAIDispatch) {
	for (let i = 0; i < 15; i++) {
		EnableDispatchService(i, false);
	}
}