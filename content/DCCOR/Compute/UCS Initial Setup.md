# UCS Initial Setup

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--27-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)

<hr>

## Fabric Interconnect Port Modes

Via the UCS Manager, under Unified ports you must choose between Ethernet or Fibre Channel.

**Ethernet**

- Server ports
- Ethernet uplink ports
- Ethernet port channel members
- FCoE port
- Appliance ports
- Appliance ports
- Appliance port channel members
- SPAN destination ports
- SPAN source ports

**Fibre Channel**

- Fibre Channel uplink ports
- Fibre Channel port channel members
- Fibre Channel storage ports
- FCoE Uplink ports
- SPAN source ports

Discovery of blades and FEXs must happen via server ports.

## Fabric Interconnect Mode

### End Host Mode

Fabric interconnect presents itself as an end host, with alot of nics.

Down stream MAC address is recorded, but most switching protocols like STP and VTP are disabled.

**Pinning** is used to associate a external nic (connected end host) to an upstream port (towards LAN) so that when unknown unicast comes, it can be forwarded to the correct port within the LAN.

- Upstream switch sees the FI as a host, with a bunch of mac addresses on it.
- This is how having multiple links upstream can be loop free.

*NEVER CONNECT FABRIC INTERCONNECTS TOGETHER*

Upstream devices will have spanning-tree port type edge trunk enables on FI facing ports.

## CIMC Initial Setup

Default web GUI credentials are: *admin* *password*
