Config = {};

Config.Locale = "en";											// Server Language like "en" which is for English. Look inside locales folder for other language translations
Config.EnableExtensions = true;									// Enable or disable Extensions found in the Extensions folder. Example of an Extension is Admin.
Config.ServerName = "Unnamed Server";							// The server name that will be shown in Messages etc
Config.EnableAIDispatch = false;								// Enable or disable the default game AI cops, medics, millitary etc

Config.SaveInterval = 3 * ( 60 * 1000 );							// Number of minutes after which all players should be saved

Config.DefaultPos = [ -1070.90625, -2972.122803, 13.773568 + 0.0 ];

Config.Logging = {
	EnableLogging: true,
	WebhookURL: 'https://discord.com/api/webhooks/831629221801099284/WhPPIP0n8tov61p_oqlHsd685ereOkPE4V2UrJCd9WxcSguZtRWrz0JW1F1jidpICQC3',
	WebhookIMG: 'https://i.imgur.com/MVkUD0Y.png',
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
	Pass: "",			// 	Your Database password
	Host: "localhost",			//	Your Database hostname
	Name: "noderp"			// 	Name of the Database that you want to use
};