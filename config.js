Config = {};

Config.Locale = "en";											// Server Language like "en" which is for English. Look inside locales folder for other language translations
Config.EnableExtensions = true;									// Enable or disable Extensions found in the Extensions folder. Example of an Extension is Admin.
Config.ServerName = "Unnamed Server";							// The server name that will be shown in Messages etc
Config.EnableAIDispatch = false;									// Enable or disable the default game AI cops, medics, millitary etc

Config.Logging = {
	EnableLogging: true,
	WebhookURL: "https://discordapp.com/api/webhooks/714860345289867324/2FXyoUniGWxkJ3eqFehoKMbxk5TnrFe9g7W8xfasZO3Qi_HAhPGBGq49rH373Leyy3oo",
	WebhookIMG: "https://i.imgur.com/MVkUD0Y.png",
	WebhookName: "NodeRP"
};

Config.ARanks = {												// You can define as many admin ranks as you want here
	1: "Moderator",
	2: "Admin",
	3: "Senior Admin",
	4: "Supervisory Admin",
	5: "General Manager",
	6: "Managing Director",
	7: "Founder"
};

Config.DB = {
	User: "root",		 	// 	Your Database username
	Pass: "test",			// 	Your Database password
	Host: "localhost",			//	Your Database hostname
	Name: "noderp"			// 	Name of the Database that you want to use
};