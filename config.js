Config = {};

Config.Locale = "en";											// Server Language like "en" which is for English. Look inside locales folder for other language translations
Config.EnableExtensions = true;									// Enable or disable Extensions found in the Extensions folder. Example of an Extension is Admin.
Config.ServerName = "NodeRP Testing Server";					// The server name that will be shown in Messages etc
Config.EnableAIDispatch = false;								// Enable or disable the default game AI cops, medics, millitary etc

Config.SaveInterval = 3 * ( 60 * 1000 );						// Number of minutes after which all players should be saved

Config.DefaultPos = { x: -1070.90625, y: -2972.122803, z: 13.773568 + 0.0 };

Config.Revive = true;
Config.BleedoutInterval = 30;
Config.ReviveHealth = 200;
Config.ReviveRespawn = false;
Config.HospitalRadius = 70000000;

Config.Logging = {
	EnableLogging: true,
	WebhookURL: 'https://discordapp.com/api/webhooks/1099370771199037540/csk0NNe9VngSdDb73gGN9CeVI0SRkJo3q7RfqmMRfrz7ySJu8pfGCWmtjAUSwPLZ9rU_',
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
	User: "root",		 										// 	Your Database username
	Pass: "",													// 	Your Database password
	Host: '127.0.0.1',											//	Your Database hostname
	Name: "noderp"												// 	Name of the Database that you want to use
};

Config.Hospitals = [
	{ x: 1839.41, y: 3672.90, z: 34.28 },
	{ x: -247.76, y: 6331.23, z: 32.43 },
	{ x: -449.67, y: -340.83, z: 34.50 },
	{ x: 357.43, y: -593.36, z: 28.79 },
	{ x: 295.83, y: -1446.94, z: 29.97 },
	{ x: -676.98, y: 310.68, z: 83.08 },
	{ x: 1151.21, y: -1529.62, z: 35.37 },
	{ x: -874.64, y: -307.71, z: 39.58 }
];

Config.FallbackHospital = { x: 1839.41, y: 3672.90, z: 34.28 };
