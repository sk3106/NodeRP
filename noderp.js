NodeRP = {};
NodeRP.DB = {};
NodeRP.Locales = {};
NodeRP.Server = {};
NodeRP.Client = {};
NodeRP.Player = {};
NodeRP.Commands = {};

RegisterNetEvent('NodeRP.Server.Load');
onNet('NodeRP.Server.Load', function (cb) {
	return cb(NodeRP);
});