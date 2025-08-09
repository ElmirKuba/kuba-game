CREATE TABLE `accounts` (
	`id` varchar(50) NOT NULL,
	`login` varchar(20) NOT NULL,
	`password` varchar(30) NOT NULL,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`)
);
