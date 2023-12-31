# First Hop Redundancy Protocol (FHRP)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2023--12--22-blue)

![Keyword](https://img.shields.io/badge/FHRP-darkgreen)
![Keyword](https://img.shields.io/badge/First%20Hop%20Redundancy%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/HSRP-darkgreen)
![Keyword](https://img.shields.io/badge/Hot%20Standby%20Router%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/VRRP-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Router%20Redundancy%20Protocol-darkgreen)

<hr>

## Overview

Hot Standby Router Protocol (HSRP) and Virtual Router Redundancy Protocol (VRRP) are both protocols designed to provide network redundancy and failover capabilities. They allow for the configuration of multiple routers as part of a virtual router group, with one router acting as the primary (or master) router and the others acting as backups in case of the primary router's failure.

## HSRP

HSRP is a Cisco-proprietary protocol that allows network routers to work together to present the illusion of a single virtual router to hosts on a LAN. The protocol ensures that user traffic immediately and transparently recovers from first-hop failures in network edge devices or access circuits.

### HSRP Messages

- **Hello**: The hello message conveys the HSRP priority and state information of the router to other HSRP routers.

- **Coup**: When a standby router wants to assume the function of the active router, it sends a coup message.

- **Resign**: A router that is the active router sends this message when it is about to shut down or when a router that has a higher priority sends a hello or coup message.

### Configuration

<pre>
feature hsrp
!
hsrp version {1 | 2}
!
interface Eth1/1
    ip add 192.168.10.2/24
    no shutdown
    hsrp 1
        ip 192.168.10.1
        preempt
        priority 110
        authentication text cisco
        timers msec 300 msec 900
        no shutdown
</pre>

Timers are hello time in milliseconds, then hold time in milliseconds.

## VRRP

VRRP, on the other hand, is a standard protocol that provides the same functionality as HSRP but is not proprietary. It allows for a seamless switchover of the default gateway IP address from the failed router to the backup router.

### Configuration

<pre>
feature vrrp
!
interface Eth1/1
    ip add 192.168.10.2/24
    no shutdown
    vrrp 1
        ip 192.168.10.1
        priority 110
        authentication text cisco
        advertisement-int 3
        no shutdown
</pre>

## Protocol Specifications

#### Protocol Version Comparison
<table>
  <thead>
    <tr>
      <th>Protocol</th>
      <th>Version</th>
      <th>Multicast IP</th>
      <th>MAC Address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HSRP</td>
      <td>v1</td>
      <td>224.0.0.2</td>
      <td>0000.0c07.acXX</td>
    </tr>
    <tr>
      <td>HSRP</td>
      <td>v2</td>
      <td>224.0.0.102</td>
      <td>0000.0c9f.fXXX</td>
    </tr>
    <tr>
      <td>VRRP</td>
      <td>v2</td>
      <td>224.0.0.18</td>
      <td>0000.5e00.01XX</td>
    </tr>
  </tbody>
</table>

#### Default HSRP Parameters
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HSRP feature</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td>Enabled as text for v1, with 'cisco' as the password</td>
    </tr>
    <tr>
      <td>HSRP version</td>
      <td>Version 1</td>
    </tr>
    <tr>
      <td>Preemption</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Priority</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

#### Default VRRP Parameters
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>VRRP feature</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Advertisement interval</td>
      <td>1 second</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td>No authentication</td>
    </tr>
    <tr>
      <td>Preemption</td>
      <td>Enabled</td>
    </tr>
    <tr>
      <td>Priority</td>
      <td>100</td>
    </tr>
  </tbody>
</table>
