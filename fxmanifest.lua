-- Resource Metadata
fx_version 'bodacious'
game 'gta5'

author 'Jones3106'
description 'A Roleplay framework for FiveM written in NodeJS'
version '1.0.0'

-- What to run
client_scripts {
    'config.js',
	'locales/*.js',
	'client/*.js',
	'extensions/**/client/*.js'
}

server_scripts {
	'config.js',
	'locales/*.js',
	'server/*.js',
	'shared/*.js',
	'extensions/**/server/*.js'
}