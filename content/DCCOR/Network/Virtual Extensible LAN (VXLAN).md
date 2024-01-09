# Virtual Extensible LAN (VXLAN)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--08-blue)

![Keyword](https://img.shields.io/badge/VXLAN-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Extensible%20LAN-darkgreen)

<hr>

## Overview

Standardized under the IEEE 802.1Q group.

VXLAN supports 16 million segments.

## Configuration

Remember: MTU 9214 is needed for VXLAN.

### Configurations

<main>![VXLAN Basic](../../../../media/vxlan_base.png)</main>

#### Prerequisites

<pre>
<span>Spine</span>
<hr>feature pim
feature ospf
!
router ospf 1
!
ip pim rp-address 10.1.1.100
ip pim anycast-rp 10.1.1.100 10.0.0.1
ip pim anycast-rp 10.1.1.100 10.0.0.5
!
interface loopback0
  ip address 10.1.1.100/32
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
!
interface Ethernet1/1
  no switchport
  ip address 10.0.0.1/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
!
interface Ethernet1/2
  no switchport
  ip address 10.0.0.5/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
</pre>

<pre>
<span>9K-1</span>
<hr>feature ospf
feature pim
!
router ospf 1
!
ip pim rp-address 10.1.1.100
!
interface Ethernet1/1
  switchport access vlan 10
!
interface Ethernet1/2
  switchport access vlan 20
!
interface Ethernet1/3
  no switchport
  ip address 10.0.0.2/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
!
interface loopback0
  ip address 10.1.1.1/32
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
</pre>

<pre>
<span>9K-2</span>
<hr>feature ospf
feature pim
!
router ospf 1
!
ip pim rp-address 10.1.1.100
!
interface Ethernet1/1
  switchport access vlan 10
!
interface Ethernet1/2
  switchport access vlan 20
!
interface Ethernet1/3
  no switchport
  ip address 10.0.0.6/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
!
interface loopback0
  ip address 10.1.1.2/32
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
</pre>

#### Main Configs

<pre>
<span>9K-1 & 9K-2</span>
<br>feature nv overlay
feature vn-segment-vlan-based
!
vlan 10
  vn-segment 160010
!
vlan 20
  vn-segment 160020
!
interface nve1
  no shutdown
  source-interface loopback0
  member vni 160010
    mcast-group 231.1.1.1
  member vni 160020
    mcast-group 231.1.1.2
</pre>

#### Verification

<pre>
show nve neighbors
show nve peers
show vxlan
</pre>

