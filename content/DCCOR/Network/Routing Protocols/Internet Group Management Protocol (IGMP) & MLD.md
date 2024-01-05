# Internet Group Management Protocol (IGMP) & MLD

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--05-blue)

![Keyword](https://img.shields.io/badge/IGMP-darkgreen)
![Keyword](https://img.shields.io/badge/Internet%20Group%20Management%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/MLD-darkgreen)
![Keyword](https://img.shields.io/badge/Multicast%20Listener%20Discovery-darkgreen)

<hr>

## Overview

IGMP is for IPv4, and MLD is for IPv6.

## IGMP (Internet Group Management Protocol)

Assume that the end device (receiver) already knows the ip address of the multicast group it wants to join. (Done via the application layer)

#### IGMP Report

1. The receiver knows it wants to join the multicast 239.1.1.1 group.

2. The receiver sends an **IGMP Report** to the multicast group address.

3. The PIM DR receives the **IGMP Report** and sends a PIM Join message to the PIM RP and PIM handles the tree creation and paths.

#### IGMP Query

An event can occur where a PIM DR needs to know if the receivers are still interested in the multicast group. This is done via **IGMP Query** messages, sent to the multicast group address.

The receiver of the query will respond with a **IGMP Report** message to respond to the **IGMP Query**, with a destination of the group address.

If another host receives a response it agrees with, it will suppress its own response. They will set randomized timers to respond to the **IGMP Query** not all at once.

The IGMP Querier is the upstream router that has the lowest IP address.

#### IGMP Leave

If a receiver wants to leave a multicast group, it will send an **IGMP Leave** message to the multicast group address.

The router that receives the **IGMP Leave** will then send **IGMP Query** messages to the multicast group address to see if others want to leave. If not, PIM Prunes are sent to the RP and the tree is pruned.

### IGMP Snooping

Tracks interested receivers and MRouters.

To do this it listens for familiar MAC addresses and IGMP messages.

Keeps a list of interfaces that are using multicast.

### Configuration

<pre>
feature { pim | pim6 }
!
{ ip | ipv6 } pim sparse-mode
!
interface Eth1/1
  ip igmp version { 2 | 3 }
  ip mld version { 2 | 3 }
</pre>

<pre>
show ip igmp interface
show ip mld interface
show ip igmp snooping groups
show ipv6 mld snooping statistics interface vlan #
</pre>