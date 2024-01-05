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

Layer 2 Protocols

- IGMP (Internet Group Management Protocol)
  - IPv4
  - Snooping
- MLD (Multicast Listener Discovery)
  - IPv6

Layer 3 Protocols

- PIM (Protocol Independent Multicast)
  - Creates the multicast tree.W

Connects sources to destinations that want to receive the multicast traffic.

The network needs to be converged at layer 3 before PIM usage.

PIM routers discover eachother via Hellos on 224.0.0.13 for IPv4, and FF02::0 for IPv6.

Two types of routes:

- (*, G) - Any source to a group
- (S, G) - Specific source to a group

### PIM Sparse Mode

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

### PIM Roles

#### General Roles

- DR (Designated Router)

    - Used by IGMP and MLD.

    - Used to send out the *JOIN* messages.

    - Is determined by the highest IP address upstream.

- DF (Designated Forwarder)

    - Used by IGMP and MLD.

    - Used to send out the multicast traffic.

#### RP Discovery

- Static

    - Manually configured RP address on each router.

- Auto-RP

    - Made by Cisco

    - Sparse-Dense Mode 

    - Routers advertize that they can be a RP on 224.0.1.39.

    - Mapping Agent then sends that info to the network via 224.0.1.40.

- BSR (Bootstrap Router)

    - Open standard

    - PIMv2
        - PIM messaging sent to 224.0.0.13.

- Anycast RP

    - Uses same IP on two different routers.

    - Uses **MSDP (Multicast Source Discovery Protocol)** to sync the RP's, and avoid a split brain situation.

## Configuration

Note that bsr-candidate and rp-candidate are commands for BSR only. For Auto-RP, use auto-rp rp-candidate, and mapping-agent.

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
interface Eth1/1
  ip address 10.10.10.6/30
  ip router ospf 1 area 0
  no shutdown
!
interface Eth1/2
  ip address 10.10.10.9/30
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
show ip pim rp
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
