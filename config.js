Config = {};

Config.Locale = "en";											// Server Language like "en" which is for English. Look inside locales folder for other language translations
Config.EnableExtensions = true;									// Enable or disable Extensions found in the Extensions folder. Example of an Extension is Admin.
Config.ServerName = "Unnamed Server";							// The server name that will be shown in Messages etc
Config.EnableAIPolice = false;									// Enable or disable the default game AI cops

Config.Logging = {
	EnableLogging: true,
	WebhookURL: "",
	WebhookIMG: "",
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
	User: "",		 	// 	Your Database username
	Pass: "",			// 	Your Database password
	Host: "",			//	Your Database hostname
	Name: "noderp"			// 	Name of the Database that you want to use
};
