# UCS Architecture

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--26-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)
![Keyword](https://img.shields.io/badge/FEX-darkgreen)
![Keyword](https://img.shields.io/badge/Fabric%20Extender-darkgreen)
![Keyword](https://img.shields.io/badge/IOM-darkgreen)
![Keyword](https://img.shields.io/badge/I%2FO%20Module-darkgreen)
![Keyword](https://img.shields.io/badge/UCSM-darkgreen)
![Keyword](https://img.shields.io/badge/UCS%20Manager-darkgreen)
![Keyword](https://img.shields.io/badge/CIMC-darkgreen)
![Keyword](https://img.shields.io/badge/Cisco%20Integrated%20Management%20Controller-darkgreen)

<hr>

## UCS Mini and Chassis

Chassis blade server for compute.

- 8 half width blades
- 4 power supplies
- 2 fabric extenders (FEX) in the IOM (I/O Modules)
- 8 fans

## B-Series Blades

Must be installed into a chassis.

A scalability terminator can be installed on the front of two full width to turn them into one big server.

## C-Series Rack Mount

- C220/C225: 1RU
- C340/C245: 2RU

Can connect to FI via FEXs or to FI directly, although the license is more expensive.

If connected to a FI/FEX you can use UCS Manager.

If connected to typical network, you can only use the CIMC (Cisco Integrated Management Controller).

## S-Series Storage

- S3260: 4RU

Rack mount server used for storage.

Has 56 disk slots, up to 18TB per disk. Which equals over 1PB of storage.

Supports 4 SSD slots to support 90TB in total.

Supports 2 different compute nodes in the back.

## Cisco UCS Fabric Interconnect

All servers attached to a Cisco UCS Fabric Interconnect become part of a single, highly available management domain.

Compiled all UCSM instances into a single management domain.

## Naming Convention

**UCS 6454**

- Series 6
- 4th generation
- 54 ports