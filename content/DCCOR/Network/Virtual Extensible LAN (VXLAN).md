# Virtual Extensible LAN (VXLAN)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--08-blue)

![Keyword](https://img.shields.io/badge/VXLAN-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Extensible%20LAN-darkgreen)

<hr>

## Overview

Standardized under the IEEE 802.1Q group.

VXLAN supports 16 million segments.

## Terminology

**VXLAN**: Virtual Extensible LAN

**VTEP**: VXLAN Tunnel End Point

**VNI**: Virtual Network Identifier

**NVE**: Network Virtualization Edge

**EVPN**: Ethernet Virtual Private Network


## Configuration

Remember: MTU 9216 is needed for VXLAN.

### Configurations

<main>![VXLAN Basic](../../../../media/vxlan_base.png)</main>

#### Prerequisites

<pre>
<span>All Devices</span>
<hr>feature ospf
feature bgp
feature pim
feature interface-vlan
feature vn-segment-vlan-based
feature nv overlay
nv overlay evpn
</pre>

#### OSPF Configs

<pre>
<span>Spine</span>
<hr>router ospf 1
!
ip pim rp-address 10.1.1.100
ip pim anycast-rp 10.1.1.100 10.0.0.1
ip pim anycast-rp 10.1.1.100 10.0.0.5
!
interface Ethernet1/1
  no switchport
  mtu 9216
  ip address 10.0.0.1/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
!
interface Ethernet1/2
  no switchport
  mtu 9216
  ip address 10.0.0.5/30
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
  no shutdown
!
interface loopback0
  ip address 10.1.1.100/32
  ip router ospf 1 area 0.0.0.0
  ip pim sparse-mode
</pre>

<pre>
<span>9K-1 & 9K-2</span>
<hr>router ospf 1
!
ip pim rp-address 10.1.1.100
!
interface Ethernet1/3
  no switchport
  mtu 9216
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

#### VXLAN Configs

<pre>
<span>9K-1 & 9K-2</span>
<br>vlan 10
  vn-segment 100000
!
interface Eth1/1
  no shutdown
  switchport access vlan 10
!
interface nve1
  no shutdown
  source-interface loopback0
  member vni 100000
    mcast-group 239.1.1.1
</pre>

#### EVPN Configs

##### Setting up BGP

<pre>
<span>Spine</span>
<hr>router bgp 65000
  address-family ipv4 unicast
  address-family l2vpn evpn
  neighbor 10.0.0.2
    remote-as 65000
    address-family ipv4 unicast
      route-reflector-client
    address-family l2vpn evpn
      send-community extended
      route-reflector-client
  neighbor 10.0.0.6
    remote-as 65000
    address-family ipv4 unicast
      route-reflector-client
    address-family l2vpn evpn
      send-community extended
      route-reflector-client
</pre>

<pre>
<span>9K-1 & 9K-2</span>
<hr>evpn
  vni 100000 l2
    rd auto
    route-target both auto
!
interface nve 1
  host-reachability protocol bgp
!
interface loopback 1
  no shutdown
  ip address 1.1.1.1/32
!
router bgp 65000
  address-family ipv4 unicast
    network 1.1.1.1/32
  address-family l2vpn evpn
  neighbor 10.0.0.1
    remote-as 65000
    address-family ipv4 unicast
    address-family l2vpn evpn
      send-community extended
</pre>

##### Setting up EVPN

<pre>
<span>9K-1 & 9K-2</span>
<hr>fabric forwarding anycast-gateway-mac a.a.a
!
vlan 333
  vn-segment 333333
!
vrf context VXVRF
  vni 333333
  rd auto
  address-family ipv4 unicast
    route-target both auto
    route-target both auto evpn
!
interface vlan 10
  no shutdown
  vrf member VXVRF
  ip address 10.10.10.1/24
  fabric forwarding mode anycast-gateway
!
interface vlan 333
  no shutdown
  vrf member VXVRF
  ip forward
!
interface nve 1
  member vni 333333 associate-vrf
!
route-map PERMIT_ALL permit 10
!
router bgp 65000
  vrf VXVRF
    address-family ipv4 unicast
      redistribute direct route-map PERMIT_ALL
</pre>

#### Verification

<pre>
show nve peers
show vxlan
</pre>

