NodeRP.Server.RegisterCommand = function(name, group, cb, suggestion) {
	if (group == null) group = 'player';
	if (NodeRP.Commands[name] != null) console.log(`[NodeRP] Command \x1b[32m${name}\x1b[37m ${NodeRP.Locales[Config.Locale]["cmd_exists"]}`);
	
	if (suggestion) {
		if (!suggestion.arguments) suggestion.arguments = {};
		if (!suggestion.help) suggestion.help = '';

		emitNet('chat:addSuggestion', -1, `/${name}`, suggestion.help, suggestion.arguments)
	}
	
	NodeRP.Commands[name] = {group: group, cb: cb, suggestion: suggestion};
	
	RegisterCommand(name, async (source, args) => {
		let cmd = NodeRP.Commands[name];
		
		if (cmd.group != 'player') {
			ExecuteCommand(`add_ace group.${cmd.group} command.${name} allow`)
		}
		
		return cb(source, args);
	});
};