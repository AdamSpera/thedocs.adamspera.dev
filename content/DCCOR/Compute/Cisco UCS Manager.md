# Cisco UCS Manager

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--29-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)

<hr>

## Data Management Engine

The DME maintains the primary XML database physical data, logic data, and network configs.

The DME monitors:

- Health and state of all components of all physical and logical elements in a Cisco UCS domain.
- The transition information of all finite state machine (FSM) tasks occurring.

## Application Gateway

Software agents that communicate directly with the endpoints to relay the health and state of the endpoints to the DME. AG-managed endpoints include servers, chassis, modules, fabric extenders, fabric interconnects, and NX-OS.

AGs actively monitor the server through the **IPMI and SELs** using the CIMC.

## Northbound Interfaces

- SNMP
- Syslog
- CLI
- XML API

## Monitoring Events and Logs

### Syslog

There are three types of syslog entries:

- Fault
- Event
- Audit

To further get specific details you can set syslog filters:

**By event or fault codes**: 

Define a filter with a parsing rule to include only the specific
codes that you intend to monitor. Messages that do not match these criteria are
discarded.

**By severity level**:

Define a filter with a parsing rule to monitor syslog messages with
specific severity levels. You can set syslog severity levels individually for OS functions,
to facilitate logging and display of messages ranging from brief summaries to detailed
information for debugging.

### SELs

System Event logs are generated internally about most physical health statuses.

The SELs are stored in the CIMC NVRAM, through an SEL log policy.

The SEL file is approximately 40 KB in size, and no further events can be recorded after it is full. 

## Database Health and Monitoring

The Cisco UCS Manager uses the SQLite database stored on the fabric interconnects to persist configuration and inventory.

Periodic health checks and periodic backups are performed on the database.

#### Configuration

<pre>
<span>Manually change the time interval to 2 days per check on a UCS CLI.</span>
<hr>scope system
  set mgmt-db-check-policy health-check-interval 2
  commit-buffer
</pre>

## Traffic Monitoring

*You can configure up to 16 monitoring sessions on UCS.*

**Four active sessions:** If each session is configured to monitor traffic in only one
direction

**Two active sessions:** If each session is configured to monitor traffic bidirectionally

**Three active sessions:** If one session is unidirectional and the second session is bidirectional

An Ethernet traffic monitoring session can monitor any of the source and destination ports:

### Ethernet

**You can configure admin speeds for these interfaces, which is 1, 10, or 40 Gbps.**

**Source Ports**

- Uplink Ethernet port
- Ethernet port channel
- VLAN
- Service profile vNIC
- Service profile vHBA
- FCoE port
- Port channels
- Unified uplink port
- VSAN

**Destination Ports**

- Unconfigured Ethernet port

### Fibre Channel

**You can configure admin speeds for these interfaces, which is 1, 2, 4, 8, 16, or 32 Gbps.**

**Source Ports**

- FC port
- FC port channel
- Uplink Fibre Channel port
- SAN port channel
- VSAN
- Service profile vHBA
- Fibre Channel storage port

**Destination Ports**

- Fibre Channel uplink ports
- Unconfigured Ethernet ports


