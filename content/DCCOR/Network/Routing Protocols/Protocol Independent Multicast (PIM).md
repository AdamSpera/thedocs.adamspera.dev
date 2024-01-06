# Protocol Independent Multicast (PIM)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--05-blue)

![Keyword](https://img.shields.io/badge/Multicast-darkgreen)
![Keyword](https://img.shields.io/badge/PIM-darkgreen)
![Keyword](https://img.shields.io/badge/Protocol%20Independent%20Multicast-darkgreen)
![Keyword](https://img.shields.io/badge/IGMP-darkgreen)
![Keyword](https://img.shields.io/badge/Internet%20Group%20Management%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/MLD-darkgreen)
![Keyword](https://img.shields.io/badge/Multicast%20Listener%20Discovery-darkgreen)
![Keyword](https://img.shields.io/badge/RP-darkgreen)
![Keyword](https://img.shields.io/badge/Rendezvous%20Point-darkgreen)
![Keyword](https://img.shields.io/badge/RPT-darkgreen)
![Keyword](https://img.shields.io/badge/Rendezvous%20Point%20Tree-darkgreen)
![Keyword](https://img.shields.io/badge/SPT-darkgreen)
![Keyword](https://img.shields.io/badge/Shortest%20Path%20Tree-darkgreen)
![Keyword](https://img.shields.io/badge/DF-darkgreen)
![Keyword](https://img.shields.io/badge/Designated%20Forwarder-darkgreen)
![Keyword](https://img.shields.io/badge/DR-darkgreen)
![Keyword](https://img.shields.io/badge/Designated%20Router-darkgreen)
![Keyword](https://img.shields.io/badge/BSR-darkgreen)
![Keyword](https://img.shields.io/badge/Bootstrap%20Router-darkgreen)
![Keyword](https://img.shields.io/badge/MSDP-darkgreen)
![Keyword](https://img.shields.io/badge/Multicast%20Source%20Discovery%20Protocol-darkgreen)

<hr>

## Overview

Connects sources to destinations that want to receive the multicast traffic.

The network needs to be converged at layer 3 before PIM usage.

PIM routers discover eachother via Hellos on 224.0.0.13 for IPv4, and FF02::0 for IPv6.

Two types of routes:

- (*, G) - Any source to a group
- (S, G) - Specific source to a group

## PIM Sparse Mode

Problem is that teh receivers don't know where the source of the traffic they want to receive is, and teh source of the traffic does not know who wants it.

The **RP (Rendezvous Point)** is a router that is known to all routers in the network, and is the root of the multicast tree.

Example traffic flow:

1. Receiver joins the network and says it wants to *JOIN* the 239.1.1.2 group.

2. The first upstream router will hear this and do the following:

      1. Install the multicast route (*, 239.1.1.2) to its multicast routes.

      2. Add the receiving interface to its **OIL (Outgoing Interface List)**.

      3. The router knows the IP address of the RP, so it performs a **RPF (Reverse Path Forwarding)** check to find out which interface the RP is reachable from.

      4. The router sends a *JOIN* request to the RP, saying it would like to be added to the 239.1.1.2 group.

3. The RP receives the join request from the router and does the following:

      1. Adds (*, 239.1.1.2) to its multicast routes.

      2. Add the receiving interface to its **OIL (Outgoing Interface List)**.

*At this stage in the process, the client to RP path is complete. (Bottom half of the tree)*

4. The multicast source (IP of 10.1.1.1) starts to speak on 239.1.1.2.

5. The first upstream router receives the incoming multicast traffic and **encapsulates the traffic in a UDP** packet with a destination of the RP.

6. The RP receives the UDP packet and **decapsulates** the packet, and does the following:

      1. Adds (10.1.1.1, 239.1.1.2) to its multicast routes.

      2. Performs a **RPF (Reverse Path Forwarding)** check to find out which interface the source is reachable from.

      3. The router sends a *JOIN* request towards the source.

Because each routers initially builds its **RPT (Rendezvous Point Tree)** it can lead to inefficient routes. This is why each router then builds its own **SPT (Shortest Path Tree)** to the source.

Prune messages can then be sent to the RP to prune the RPT.

## PIM Roles

### Static

You can statically configure an RP for a multicast group range.

Every router must have a Static RP configured.

Static RP's are used to do the following:

- Configure routers with the Anycast RP address.
- Configure a RP address manually.

<pre>
ip pim rp 10.10.10.6
ip pim rp 10.10.10.6 group-list 239.0.200.0/24
</pre>

The first command above tells the router that its Statically configured RP is 10.10.10.6.

The second command above tells the router that its Statically configured RP is 10.10.10.6 but also specifies the group range that the RP is responsible for.

### BSR

The bootstrap router ensures that every router in the PIM domain has the same RP cache as the BSR.

A BSR is configured to help select a RP from a set of BSR candidate RPs.

The function of the BSR is to broadcast the RP set to all routers in
the domain.

<pre>
ip pim bsr bsr-candidate Eth1/1
ip pim bsr listen
</pre>

The first command above tells the router that it is a BSR candidate, and that it will use the IP address of Eth1/1 as its BSR address.

The second command above tells the router to listen for BSR messages, and use the info received form a BSR Candidate as its RP information.

### Auto-RP

Cisco protocol that was used before to the Internet standard BSR.

Auto-RP Candidates send their supported group range in RP-Announcement messages to the multicast 224.0.1.39 group.

Auto-RP Mapping Agents listen for the RP-Announcement messages from RP-Candidates and creates and builds the Group-to-RP mapping table. The mapping agent then multicasts the Group-to-RP mapping table through RP-Discovery messages, over the RP-Discovery multicast 224.0.1.40 group.

<pre>
ip pim auto-rp rp-candidate e2/1 group-list 239.0.0.0/24 bidir
ip pim auto-rp mapping-agent e2/1
ip pim auto-rp forward listen
</pre>

The first command above tells the router that it is an Auto-RP candidate, and that it will use the IP address of Eth1/1 as its Auto-RP address. It also specifies the group range that the RP is responsible for.

The second command above tells the router that it is an Auto-RP mapping agent, and that it will use the IP address of Eth1/1 as its Auto-RP address for its outgoing Auto-RP Discovery messages.

The third command above tells the router to listen for Auto-RP Discovery messages, and will remember the info received from a Auto-RP Candidate.

### Anycast RP

This method requires the explicit use of:

- Protocol Independent Multicast (PIM)
- Multicast Source Discovery Protocol (MSDP)

A single Anycast RP IP address is configured on multiple routers, on their loopback interfaces, which also have PIM enabled. The Anycast RP IP address needs to be advertised into the IGP.

<pre>
interface Loopback0
  ip address 10.1.1.1/32
  ip router ospf 1 area 0
!
ip pim anycast-rp 10.1.1.1 10.10.10.6
ip pim anycast-rp 10.1.1.1 10.10.10.9
</pre>

The first set of commands above configures the loopback interface with an IP address and makes sure its available in the IGP.

The second set of commands above ensures that the Anycast address is reachable via the interfaces with the specified IP addresses.

## Full Configuration

<main>![Multicast Config](../../../../media/multicast_config.png)</main>

<pre>
<span>Setup PIM on all routers</span>
<hr>feature pim
!
interface Eth1/1
  ip pim sparse-mode
  no shutdown
!
interface Eth1/2
  ip pim sparse-mode
  no shutdown
<hr>
show ip pim neighbor
</pre>

<pre>
<span>Setup Static-RP on Router-1</span>
<hr>ip pim rp 10.10.10.2 group-list 239.0.200.0/24
<hr>
show ip pim rp
</pre>

<pre>
<span>Setup BSR on Router-1</span>
<hr>ip pim bsr bsr-candidate Eth1/1
!
ip pim bsr listen
<hr>
show ip pim rp
</pre>

<pre>
<span>Setup Auto-RP on Router-2</span>
<hr>ip pim auto-rp rp-candidate Eth1/1 group-list 239.0.0.0/24 bidir
ip pim auto-rp mapping-agent Eth1/1
ip pim auto-rp forward listen
<hr>
show ip pim rp
</pre>

<pre>
<span>Setup Anycast-RP on Router-3</span>
<hr>interface Loopback0
  ip address 10.1.1.1/32
  ip router ospf 1 area 0
  no shutdown
!
ip pim anycast-rp 10.1.1.1 10.10.10.6
ip pim anycast-rp 10.1.1.1 10.10.10.9
<hr>
<span>Setup Mapping and Forwarding on Router-2</span>
<hr>ip pim auto-rp mapping-agent Eth1/1
ip pim auto-rp forward listen
<hr>
Router-3: show ip pim rp
</pre>

<pre>
<span>Setup SSM on Router-1</span>
<hr>ip ssm range 239.0.100.0/24
<hr>
show ip pim group-range
</pre>

<pre>
show ip mroute
</pre>
