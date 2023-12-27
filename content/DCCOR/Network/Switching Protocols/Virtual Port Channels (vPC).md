# Virtual Port Channels (vPC)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2023--12--27-blue)

![Keyword](https://img.shields.io/badge/vPC-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Port%20Channel-darkgreen)

<hr>

## Overview

Two Cisco Nexus switches utilizing vPC appear as a single logical Layer 2 switch to other downstream network devices. Despite this, the two switches continue to be separately managed entities with distinct management and control planes.

Benefits of vPC includes:
- Enables utilization of port channel spanning two upstream devices
- Removes STP ports
- Establishes a topology free of loops
- Utilizes the full uplink bandwidth available
- Ensures quick convergence in case of link or device failure
- Offers resilience at the link level
- Contributes to high availability

## Part Breakdown

1. **vPC**: Allows a downstream device to connect to two vPC peers as if they were a single switch, using either a static or LACP-negotiated port channel.

2. **vPC Peers**: In vPC architecture, two Cisco Nexus switches form a duo, functioning together as one logical switch.

3. **vPC Peer Link**: Essential for vPC operation, this link connects two vPC switches, simulating a single control plane. It forwards specific protocol packets, synchronizes MAC tables and IGMP entries, handles multicast and orphaned port traffic, and carries HSRP packets in Layer 3 switches.

4. **vPC Peer Keepalive Link**: A logical, often out-of-band link, this serves as a secondary test to verify remote peer functionality in vPCs. It transmits only operational status IP packets and helps determine peer status when the main link fails.

5. **vPC Domain**: This encompasses the vPC peers, keepalive and peer links, and all connected port channels. Each vPC domain is uniquely identified by a numerical ID, and only one ID is permitted per device.

6. **vPC Member Port**: A port on a vPC peer, part of a configured vPC.

7. **Orphan Device**: A device connected to a vPC domain using regular links instead of a vPC.

8. **Orphan Port**: A port connected to an orphan device, or a vPC port connected to only one vPC peer, usually due to a lost connection on the other peer.

9. **Cisco Fabric Services (CFS)**: This protocol enables fast, reliable configuration messaging and synchronization between vPC peers. It ensures MAC addresses and other data are consistent across both switches, operates over the peer link without user configuration, and incorporates modified spanning tree to maintain continuous operation.

<main>![vPC Terminology](../../../../media/vpc_names_1.png)</main>
<main>![vPC Terminology](../../../../media/vpc_names_2.png)</main>