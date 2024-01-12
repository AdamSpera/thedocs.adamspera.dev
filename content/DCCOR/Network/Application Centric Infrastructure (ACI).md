# Application Centric Infrastructure (ACI)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--10-blue)

![Keyword](https://img.shields.io/badge/ACI-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Centric%20Infrastructure-darkgreen)
![Keyword](https://img.shields.io/badge/SDN-darkgreen)
![Keyword](https://img.shields.io/badge/Software%20Defined%20Networking-darkgreen)
![Keyword](https://img.shields.io/badge/APIC-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Policy%20Infrastructure%20Controller-darkgreen)

<hr>

## Overview

ACI is a software-defined networking (SDN) solution from Cisco for data centers and cloud networks.

## APIC

The Application Policy Infrastructure Controller (APIC) is the unifying point of automation and management for the Application Centric Infrastructure (ACI) fabric. The APIC provides centralized access to all fabric information, optimizes the application lifecycle for scale and performance, and supports flexible application provisioning across physical and virtual resources.

**APICs are deployed as a cluster. A minimum of three APICs is required for a cluster.**

- A cluster size of 3, 5, or 7 APICs is recommended.
- A cluster size of 4 or 6 is not recommended.

## ACI Flow Models

1. **Logical Model**: Where the user configures and declares its intent.
2. **Resolved Model**: Where the APIC sends the data to the spine and leafs.
3. **Concrete Model**: Where spine/leafs take the resolved model and is converted to the concrete model by policy elements (APIC agent running on leafs/spines)

Creation of the hardware model sends a notification to the iNXOS for programming hardware.

## ACI Hardware

##### Nexus 9500 Modular Chassis

Deployed as Spine devices.

##### Nexus 9300 Fixed Switches

Deployed as Leafs or Spines

##### C-220 APIC

- Deployed as APICs
- Pre configured when purchased

APICs must be uplinked with Twinax/DAC cables at 10/25G.

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

<main>![APIC Discovery](../../../../media/apic_discovery.png)</main>

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

Configure internal interfaces that connect spine and leaf switches. Fabric policies can enable features such as monitoring (statistics collection and statistics export), troubleshooting (on-demand diagnostics and SPAN), IS-IS, Council of Oracles Protocol (COOP), SNMP, MP-BGP route reflectors, DNS, or NTP.


## ACI Tenants

**Common**

- Shared L3 out
- Shared VRFs
- Shared bridge domains
- DNS
- DHCP
- Active directory

**Infra**

- Fabric Discovery
- DHCP
- LLDP
- VRF

**Mgmt**

- In-band management access
- Out-of-band management access

## ACI Bridge Domain

The bridge domain defines the unique Layer 2 MAC address space and a Layer 2 flood domain if flooding is enabled. While a VRF defines a unique IP address space, that address
space can consist of multiple subnets.

Those subnets will be spread across one or more bridge domains contained in the VRF. Bridge domains will span all switches in which associated endpoint groups are configured.

A bridge domain can have multiple subnets. However, a subnet is contained within a single bridge domain.

## ACI VM Manager Domains

Cisco ACI integrates with vCenter, SCVMM, RHV, and OpenStack.

## ACI Contract

**Subjects**: A group of filters for a specific application or service.

**Filters**: Feature used to classify traffic based on Layer 2 to Layer 4 attributes (such as Ethernet type, protocol type, TCP flags, and ports).

**Actions**: Predefined act to be taken on the filtered traffic. The following actions are
supported:

- Permit the traffic (regular contracts, only).
- Mark the traffic (DSCP/CoS) (regular contracts, only).
- Redirect the traffic (regular contracts, only, through a service graph).
- Copy the traffic (regular contracts, only, through a service graph or SPAN).
- Block the traffic (taboo contracts, only).
- Log the traffic (taboo contracts, only).

## ACI Filters and Subjects

**Filters** are Layer 2 to Layer 4 fields, TCP/IP header fields such as Layer 3 protocol
type, Layer 4 ports, and so forth. According to its related contract, an EPG provider
dictates the protocols and ports in both the in and out directions. Contract subjects
contain associations to the filters (and their directions) that are applied between EPGs
that provide and consume the contract.

**Subjects** are contained in contracts. One or more subjects within a contract use filters
to specify the type of traffic that can be communicated and how it occurs. For exam-
ple, for HTTPS messages, the subject specifies the direction and the filters that specify
the IP address type (for example, IPv4), the TCP protocol, and the ports allowed.
Subjects determine if filters are unidirectional or bidirectional. A unidirectional filter is
used in one direction. Unidirectional filters define in or out communications, but not
the same for both. Bidirectional filters are the same for both; they define both in and
out communications.



