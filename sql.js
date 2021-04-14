const BuildSQL = {
	1:	`CREATE TABLE IF NOT EXISTS players (
	identifier varchar(60) NOT NULL,
	steam varchar(60) DEFAULT NULL,
	discord text DEFAULT NULL,
	ip varchar(20) DEFAULT NULL,
	skin longtext DEFAULT NULL,
	pos varchar(255) DEFAULT NULL,
	loadout longtext DEFAULT NULL,
	adminlevel int(11) NOT NULL DEFAULT 0,
	dead int(1) NOT NULL DEFAULT 0,
	country text DEFAULT NULL
	)`,
	2: `CREATE TABLE IF NOT EXISTS identity (
	identifier varchar(60) NOT NULL,
	firstname text NOT NULL,
	lastname text NOT NULL,
	phone varchar(20) DEFAULT NULL,
	age int(11) NOT NULL
	)`,
	3: `ALTER TABLE identity
	ADD PRIMARY KEY (identifier),
	ADD KEY phone (phone)`,
	4: `ALTER TABLE players
	ADD PRIMARY KEY (identifier)`
};