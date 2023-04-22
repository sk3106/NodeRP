const fetch = require( 'node-fetch' );

const discord = {};

discord.colors = {
	RED: 13632027,
    GREEN: 4289797,
    BLUE: 4886754,
    ORANGE: 16098851,
    BLACK: 1,
    WHITE: 16777215,
    GRAY: 10197915,
    YELLOW: 16312092,
    BROWN: 9131818,
    CYAN: 5301186
};

on("onResourceStart", ( resourceName ) => {
	if ( GetCurrentResourceName() != resourceName ) return;

	discord.sendMessage("NodeRP", "**NodeRP Discord has been started!**");
	console.log("\x1b[33m[NodeRP] \x1b[34mDiscord Webhook Started!\x1b[37m");
});

on("onResourceStop", ( resourceName ) => {
	if ( GetCurrentResourceName() != resourceName ) return;

	discord.sendMessage("NodeRP", "**NodeRP is shutting down...**");
});

onNet("discord.sendEmbed", async ( title, msg, fields = [], color = discord.colors.GRAY ) => {
    if ( Config.Logging.EnableLogging == true ) {
		const embedi = {
			"embeds": [{
				"author": {
					"name": Config.Logging.WebhookName,
					"icon_url": Config.Logging.WebhookIMG
				},
				"title": title,
				"description": msg,
				"thumbnail": {
					"url": Config.Logging.WebhookIMG
				},
				"fields": fields,
				"color": color
			}]
		};
		
		await fetch( Config.Logging.WebhookURL, {
			method: 'post',
			headers: {
			   'Content-Type': 'application/json'
			},
			body: JSON.stringify( embedi )
		});
	}
});

discord.sendMessage = async ( player, msg ) => {
    if ( Config.Logging.EnableLogging == true ) {
		await fetch( Config.Logging.WebhookURL, {
			method: 'post',
			headers: {
			   'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: player, content: msg, avatar_url: Config.Logging.WebhookIMG })
		});
	}
};