NodeRP = {};
NodeRP.DB = {};
NodeRP.Locales = {};
NodeRP.Server = {};
NodeRP.Client = {};
Player = {};
NodeRP.Commands = {};

NodeRP.Player = class {
	constructor( player ) {
		this.id = player;
		this.firstspawn = true;
		this.dead = 0;
		this.lvl = 0;
		this.skin = 'mp_m_freemode_01';
		this.pos = null;
	}

	set Pos( p ) { this.pos = p; }
	set Dead( d ) { this.dead = d; }
	set Loadout( ld ) { this.loadout = ld; }
	set Level( lvl ) { this.lvl = lvl; }
	set FirstSpawn( fspawn ) { this.firstspawn = fspawn; }
	set Country( contri ) { this.country = contri; }
	set Steam( st ) { this.steam = st; }
	set IP( ip ) { this.ip = ip; }
	set Skin( ski ) { this.skin = ski; }
	set Identifier( iden ) { this.id = iden; }
	
	get Pos() { return this.pos; }
	get Dead() { return this.dead; }
	get Loadout() { return this.loadout; }
	get Level() { return this.lvl; }
	get FirstSpawn() { return this.firstspawn; }
	get Country() { return this.country; }
	get Steam() { return this.steam; }
	get IP() { return this.ip; }
	get Skin() { return this.skin; }
	get Identifier() { return this.id; }
	
	SavePlayer( cb ) {
		let data = null;
		let identifier = this.id;
		let skin = this.skin, pos = this.pos, level = this.lvl, loadout = this.loadout, dead = this.dead;
		let playa = [ skin, pos, level, loadout, dead ];
		
		NodeRP.DB.Query( 'UPDATE players SET skin = ?, pos = ?, adminlevel = ?, loadout = ?, dead = ?', playa, ( err, res ) => {
			if ( err ) {
				cb( false );
				throw err;
			}
			else return cb( true );
		});
	}
};

/*RegisterNetEvent('NodeRP.Server.Load');
onNet('NodeRP.Server.Load', function (cb) {
	return cb(NodeRP);
});*/