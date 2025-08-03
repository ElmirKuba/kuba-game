ALTER TABLE `sessions` ADD `ua` text;--> statement-breakpoint
ALTER TABLE `sessions` ADD `ip` varchar(15);--> statement-breakpoint
ALTER TABLE `sessions` ADD `browser_data` text;--> statement-breakpoint
ALTER TABLE `sessions` ADD `cpu_architecture` text;--> statement-breakpoint
ALTER TABLE `sessions` ADD `device_data` text;--> statement-breakpoint
ALTER TABLE `sessions` ADD `os_data` text;