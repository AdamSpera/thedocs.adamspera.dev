# UCS Networking

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--28-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)

<hr>

## Named VLANs

You cannot create VLANs with IDs from 3915 to 4042.

## Service Profile

A service profile typically includes four types of information:

- **Server definition**: It defines the resources (for example, a specific server or a blade
inserted to a specific chassis) that are required to apply to the profile.

- **Identity information**: Identity information includes the UUID, MAC address for each
virtual NIC (vNIC), and WWN specifications for each HBA.

- **Firmware revision specifications**: These are used when a certain tested firmware
revision is required to be installed or for some other reason a specific firmware
is used.

- **Connectivity definition**: It is used to configure network adapters, Fabric Extenders,
and parent interconnects; however, this information is abstract because it does not
include the details of how each network component is configured.

## Server Policies

**Maintenance Policy**

Specify how the Cisco UCS Manager should proceed for configuration changes that will have a service impact
or require a server reboot. Values for the maintenance policy can be “immediate”, “user-ack”, or “timer automatic”.

**Power Control Policy**

Cisco UCS uses the priority set in the power control policy along with the blade type and configuration to calculate the initial power allocation
for each blade within a chassis.

Priority is ranked on a scale of 1 to 10, where 1 indicates the highest priority and 10 indicates lowest priority.

The default priority is 5.

For mission-critical applications, a special priority called no-cap is also available.

## QoS Service Classes

Uses **Data Center Ethernet (DCE)** to handle all traffic inside a Cisco UCS domain. This industry standard enhancement to Ethernet divides the bandwidth of the Ethernet pipe into eight virtual lanes. Two virtual lanes are reserved for internal system and management traffic, and you can configure QoS for the other six virtual lanes.

### QoS System Classes

*For Cisco UCS Mini, packet drop can only be disabled on the platinum and gold classes. Only one platinum and one gold class can be configured as a no-drop class at a time.*

**Configurable**

- Platinum
- Gold
- Silver
- Bronze

**Reserved for Ethernet Lanes**

- Best Effort

**Reserved for FCoE Lanes**

- Fibre Channel
