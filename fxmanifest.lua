-- Resource Metadata
fx_version 'cerulean'
game 'gta5'

author 'sk3106'
description 'A simple roleplay framework for FiveM written in NodeJS'
version '2.0.0'

-- What to run
client_scripts {
    'noderp.js',
	'config.js',
	'locales/*.js',
	'client/*.js',
	'extensions/**/client/*.js'
}

server_scripts {
	'noderp.js',
	'config.js',
	'sql.js',
	'locales/*.js',
	'mysql.js',
	'server/functions.js',
	'server/*.js',
	'shared/*.js',
	'extensions/**/server/*.js'
}

dependency 'yarn'
