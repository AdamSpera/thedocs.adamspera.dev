# Fibre Channel over Ethernet (FCoE)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--24-blue)

![Keyword](https://img.shields.io/badge/FCoE-darkgreen)
![Keyword](https://img.shields.io/badge/Fibre%20Channel%20over%20Ethernet-darkgreen)

<hr>

## Ethernet Enhancements

1. Priority-based flow control (PFC)
2. Enhanced Transmission Selection (ETS)
3. Data Center Bridging Exchange (DCBX)

## PFC

Defined in IEEE 802.1Qbb, PFC is a link-level flow control mechanism that provides a way to pause traffic on a per-priority basis. PFC is used to ensure zero packet loss in a converged network. PFC is a link-level flow control mechanism that provides a way to pause traffic on a per-priority basis. PFC is used to ensure zero packet loss in a converged network.

<main>![FCoE Virtual](../../../../media/fcoe_virtual.png)</main>

## ETS

Defined in IEEE 802.1Qaz, ETS is a traffic management mechanism that provides a way to allocate bandwidth among different traffic classes. ETS is used to ensure that each traffic class gets the bandwidth it needs. ETS is a traffic management mechanism that provides a way to allocate bandwidth among different traffic classes. ETS is used to ensure that each traffic class gets the bandwidth it needs.

## DCBX

Defined in IEEE 802.1Qaz, DCBX is a discovery and capability exchange protocol that is used to convey capabilities and configuration of the above features between neighbors. DCBX is a discovery and capability exchange protocol that is used to convey capabilities and configuration of the above features between neighbors.

Provides communication of the following parameters:

- Priority groups in ETS
- PFC
- Congestion notification
- Applications
- Logical link-down
- Network interface virtualization

## Virtual Fibre Channel

<pre>
feature lldp
install feature-set fcoe
feature-set fcoe

(ENTER COMMANDS DISPLAYED IN HINT)

copy running-config startup-config
reload

<-----After reload----->

vsan database
  vsan 200
!
vlan 200
  fcoe vsan 200
!
interface Ethernet 1/1
  shutdown
  switchport mode trunk
  switchport trunk native vlan 56
  switchport trunk allowed vlan 56,200
  spanning-tree port type edge trunk
  mtu 9216
  service-policy type qos input default-fcoe-in-policy
  no shutdown
!
interface vfc 1
  bind interface Ethernet 1/1
!
vsan database
  vsan 200 interface vfc 1
</pre>

## FCoE Initialization Protocol (FIP)

FIP is a link-level protocol that is used to discover FCoE capabilities and exchange FCoE parameters between neighbors. FIP is a link-level protocol that is used to discover FCoE capabilities and exchange FCoE parameters between neighbors.

The following are the steps needed for initialization:

- FIP VLAN Discovery

- FIP Discovery

- FCoE Virtual Link Initialization

- FCoE Virtual Link Maintenance

<table>
  <thead>
    <tr>
      <th>FIP Step</th>
      <th>Action</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>VLAN discovery</td>
      <td>An end device (CNA) broadcasts a request for FCoE VLAN. The request occurs on the native VLAN.</td>
      <td>A switch responds with the FCoE VLAN.</td>
    </tr>
    <tr>
      <td>FCF discovery</td>
      <td>A CNA broadcasts a solicitation to find the FCF to log in to. Broadcasts go out on the FCoE VLAN.</td>
      <td>A switch responds with an advertisement.</td>
    </tr>
    <tr>
      <td>FLOGI/FDISC</td>
      <td>A CNA performs fabric login using FLOGI or FLOGI with NPV FDISC for NPV setup.</td>
      <td>A switch accepts the FLOGI/FDISC.</td>
    </tr>
    <tr>
      <td>FC commands</td>
      <td>A CNA begins normal FC data commands using Ethertype 0x8906.</td>
      <td>A switch forwards encapsulated FCoE frames.</td>
    </tr>
  </tbody>
</table>
