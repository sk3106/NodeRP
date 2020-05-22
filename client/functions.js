NodeRP.Client = {};

NodeRP.Client.GetPOS = function() {
	let pos = GetEntityCoords(PlayerPedId(), false);
	let coords = JSON.stringify(pos);
	
	return coords;
};

NodeRP.Client.GetPlayers = function(ids) {
	if(ids != null) {
		if (NetworkIsPlayerActive(ids)) {
			let myid = GetPlayerServerId(ids);
			
			return myid;
		}
	}
}

NodeRP.Client.Notify = function(msg) {
	SetNotificationTextEntry('STRING');
	AddTextComponentSubstringWebsite(msg);
	DrawNotification(false, true);
};

RegisterNetEvent('NodeRP.Client.Notify');
onNet("NodeRP.Client.Notify", (msg) => {
   NodeRP.Client.Notify(msg);
});