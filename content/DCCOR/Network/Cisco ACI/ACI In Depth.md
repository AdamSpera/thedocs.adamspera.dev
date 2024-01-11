# Cisco ACI In Depth

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--11-blue)

![Keyword](https://img.shields.io/badge/ACI-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Centric%20Infrastructure-darkgreen)
![Keyword](https://img.shields.io/badge/SDN-darkgreen)
![Keyword](https://img.shields.io/badge/Software%20Defined%20Networking-darkgreen)
![Keyword](https://img.shields.io/badge/APIC-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Policy%20Infrastructure%20Controller-darkgreen)

<hr>

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



