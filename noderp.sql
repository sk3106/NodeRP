CREATE DATABASE IF NOT EXISTS noderp;

CREATE TABLE `identity` (
  `identifier` varchar(60) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `players` (
  `identifier` varchar(60) NOT NULL,
  `license` varchar(60) DEFAULT NULL,
  `discord` text DEFAULT NULL,
  `ip` decimal(10,0) DEFAULT NULL,
  `skin` longtext DEFAULT NULL,
  `job` varchar(60) NOT NULL DEFAULT 'unemployed',
  `job_rank` int(11) NOT NULL DEFAULT 0,
  `pos` varchar(50) DEFAULT NULL,
  `loadout` longtext DEFAULT NULL,
  `adminlevel` int(11) NOT NULL DEFAULT 0,
  `dead` int(1) NOT NULL DEFAULT 0,
  `country` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `identity`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `phone` (`phone`);

ALTER TABLE `players`
  ADD PRIMARY KEY (`identifier`);
