# First Hop Redundancy Protocol (FHRP)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2023--12--29-blue)

![Keyword](https://img.shields.io/badge/FHRP-darkgreen)
![Keyword](https://img.shields.io/badge/First%20Hop%20Redundancy%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/HSRP-darkgreen)
![Keyword](https://img.shields.io/badge/Hot%20Standby%20Router%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/VRRP-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Router%20Redundancy%20Protocol-darkgreen)

<hr>

## Overview

HSRP (Hot Standby Router Protocol) employs a group of routers to establish redundancy. Each router is configured with a unique IP address, and all routers within the HSRP group share a common group IP address, known as the virtual IP address. The routers generate a shared virtual group MAC address from the HSRP group number, presenting a single, fault-tolerant router image to the client network.

HSRP has several key features:

- **HSRP group (standby group)**: This is a set of HSRP devices that emulate a virtual router.
- **Active router**: This router responds to ARP requests for the default gateway with the MAC address of the virtual router. It takes on the active forwarding of packets for the virtual router and sends hello messages.
- **Standby router**: This router listens for periodic hello messages and begins active forwarding if it doesn't receive messages from the active router.

### Configuration

<pre>
feature hsrp
!
interface vlan 10
 ip address 192.168.10.X/24
 hsrp 10
  priority Y
  preempt
  preempt delay minimum 60
  ip 192.168.10.1
  no shutdown
</pre>

## VRRP vs HSRP

#### HSRP Timers

- **Hello Timer**: 3 seconds
- **Hold Timer**: 10 seconds

#### VRRP Timers

- **Hello Timer**: 1 second
- **Hold Timer**: 3 seconds

### Differences

- **Standardization**: VRRP (Virtual Router Redundancy Protocol) is an open standard protocol, defined by the Internet Engineering Task Force (IETF) in RFC 3768. On the other hand, HSRP (Hot Standby Router Protocol) is a Cisco proprietary protocol.

- **Virtual Router Master/Backup vs Active/Standby**: In VRRP, the primary router is known as the Master, and the secondary router is referred to as the Backup. In HSRP, the primary router is known as the Active router, and the secondary router is referred to as the Standby router.

- **Preemption**: In VRRP, preemption is enabled by default, meaning the backup router will automatically take over if the master router fails. In HSRP, preemption is not enabled by default and must be manually configured.

- **Timers**: VRRP uses faster default timers (1 second hello, 3 seconds hold) compared to HSRP (3 seconds hello, 10 seconds hold), leading to quicker failover times.

- **IP Address Usage**: In VRRP, the virtual IP address can be the same as the physical IP address of one of the routers in the group. In HSRP, the virtual IP address must be different from the physical IP addresses of the routers in the group.

- **Load Balancing**: HSRP supports load balancing by configuring multiple HSRP groups on a single interface. VRRP does not natively support load balancing, but it can be achieved by configuring multiple VRRP groups on a single interface.

- **Multicast Address**: HSRP uses the multicast address 224.0.0.2 for hello packets, while VRRP uses 224.0.0.18.