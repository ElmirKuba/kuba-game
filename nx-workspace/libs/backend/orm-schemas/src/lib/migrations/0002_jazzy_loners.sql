CREATE TABLE `sessions` (
	`id` varchar(50) NOT NULL,
	`account_id` varchar(50) NOT NULL,
	`refresh_token` text NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_account_id_accounts_id_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE no action ON UPDATE no action;