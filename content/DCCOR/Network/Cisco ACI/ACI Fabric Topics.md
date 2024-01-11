# Cisco ACI Fabric Topics

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--11-blue)

![Keyword](https://img.shields.io/badge/ACI-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Centric%20Infrastructure-darkgreen)
![Keyword](https://img.shields.io/badge/SDN-darkgreen)
![Keyword](https://img.shields.io/badge/Software%20Defined%20Networking-darkgreen)
![Keyword](https://img.shields.io/badge/APIC-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Policy%20Infrastructure%20Controller-darkgreen)
![Keyword](https://img.shields.io/badge/IFM-darkgreen)
![Keyword](https://img.shields.io/badge/Intra%20Fabric%20Messaging-darkgreen)

<hr>

## ACI Initial Setup

**Prerequisites**:

- All endpoints must be connected to leafs.

- All Cisco APICs must be dual-homed, aka connected to two or more leaf switches.

**Initial Setup**

On the CIsco APIC CLI you can configure the following:

- Fabric name
- Number of controllers
- Controller ID
- Controller name
- Address pool for TEP (default to 10.0.0.0/16) (min is a /23)
- Vlan ID for infra network (APIC to switches) (default to 3967)
- OOB management IP (hosts the gui and cli)
- Default gateway IP
- Admin password

## ACI Fabric Discovery

A fabric node is considered active when the APIC and node can
exchange heartbeats through the Intra-Fabric Messaging (IFM) process. The APIC also uses the IFM process to push policy to the fabric leaf nodes.

#### Overall

1. Link Layer Discovery Protocol (LLDP) Neighbor Discovery
2. Tunnel End Point (TEP) IP address assignment to the node from the TEP address pool (default TEP pool is 10.0.0.0/16)
3. Node software upgraded if necessary, downloading the new software from APIC repository
4. Policy Element IFM setup

#### Step 1

The APIC starts configuring the directly connected leafs.

#### Step 2

The APIC then starts configuring the connected spines from that leafs switch.

#### Step 3

The APIC then starts configuring the connected leafs from the spines.

## ACI Fabric Upgrade

The Cisco APIC acts as the repository of the image and as the booting server. Leaf switches and spine switches have in-band connectivity to the Cisco APIC, and when upgrading, the switches download the firmware from the Cisco APIC.

**Upgrading Steps**

1. Ensure the CIMC version is compatible with the APIC version.

2. Download the new APIC image to the APIC repository.

3. Download the new ACI switch image to the APIC repository.

4. Upgrade the cluster of APICs.

5. Divide the switches into upgrade groups, and upgrade one at a time.

## ACI Fabric Access Policies

Fabric policies are grouped into the following categories:

- Switch profiles specify which switches to configure and the switch configuration policy.

- Module profiles specify which spine switch modules to configure and the spine switch configuration policy.

- Interface profiles specify which fabric interfaces to configure and the interface configuration policy.

- Global policies specify DNS, fabric MTU default, multicast tree, and load-balancer configurations to be used throughout the fabric.

- Pod profiles specify date and time, SNMP, Council of Oracles Protocol (COOP), IS-IS, and Border Gateway Protocol (BGP) route reflector policies.

- Monitoring and troubleshooting policies specify what to monitor, thresholds, how to handle faults and logs, and how to perform diagnostics.

#### ACI Fabric Main Policies

configure internal interfaces that connect spine and
leaf switches. Fabric policies can enable features such as monitoring (statistics collection and statistics export), troubleshooting (on-demand diagnostics and SPAN), IS-IS,
Council of Oracles Protocol (COOP), SNMP, MP-BGP route reflectors, DNS, or NTP.



