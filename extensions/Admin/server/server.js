Admin = {};

NodeRP.Admin = class {
	constructor( id, lvl, rank ) {
		this.id = id;
		this.level = lvl;
		this.rank = rank;
	}
	
	set Level( l ) { this.level = l; }
	set Rank( r ) { this.rank = r; }
	
	get Level() { return this.level; }
	get Rank() { return this.rank; }
};

on( 'NodeRP.Server.PlayerSpawned', ( p, fspawn ) => {
	const id = GetPlayerIdentifier( p, 1 );
	const Level = Player[ id ][ 'Level' ];
	
	if ( Level > 0 ) {
		let Rank = Config.ARanks[ Level ], Name = GetPlayerName( p );
		
		Admin[ id ] = new NodeRP.Admin( id, Level, Rank );
		
		NodeRP.Server.Log( false, `\x1b[31m[NodeRP Admin] \x1b[32m${ Name } \x1b[37mlogged in.` );
	}
});

on( 'playerDropped', ( reason ) => {
    const player = global.source;
	const id = GetPlayerIdentifier( player, 1 );

	if ( Admin[ id ] ) Admin[ id ] = null;
});