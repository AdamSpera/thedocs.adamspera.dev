# UCS Backups and Restores

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--30-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)

<hr>

## Backup Policies

You can automate the backup by using backup polices. Policies will schedule the backup job to run regularly at a certain time without administrative involvement.

There are two types of backup polices:
- All Configuration
- Full State

## Import Backup

You cannot import a full state backup file. You can import any of the following configuration files:
- All Configuration
- System Configuration
- Logical Configuration

## Fabric Restoring

You will need to collect the following information before you start to restore the system configuration:

- Fabric interconnect management port IPv4 address and subnet mask, or IPv6 address and prefix
- Default gateway IPv4 or IPv6 address
- Backup server IPv4 or IPv6 address and authentication credentials
- Fully qualified name of a full state backup file
