# Switched Port Analyzer (SPAN)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--16-blue)

![Keyword](https://img.shields.io/badge/SPAN-darkgreen)
![Keyword](https://img.shields.io/badge/Switched%20Port%20Analyzer-darkgreen)

<hr>

## Switched Port Analyzer (SPAN)

<pre>
<span>Configure a destination port.</span>
<hr>interface Eth1/1
  switchport
  switchport monitor
  no shutdown
</pre>

<pre>
<span>Configure a source port for collecting span traffic.</span>
<hr>monitor session 1
  source interface Eth1/2 both
  destination interface Eth1/1
  no shutdown
</pre>

## Encapsulated Remote Switched Port Analyzer (ERSPAN)

ERSPAN enabled the ability to send SPAN traffic over an IP fabric to the destination.

ERSPAN uses GRE encapsulation to send SPAN traffic over an IP network.

**ERSPAN does not mirror any packets that area generated by the supervisor in any cases.**

**Destination ports do not participate in spanning-tree or any layer 3 protocols.**

<pre>
<span>ERSPAN Source Configs</span>
monitor session 48 type erspan-source
  source interface Ethernet1/1 both
  destination ip 10.11.11.3
  erspan-id 902
  vrf default
  no shutdown
!
monitor erspan origin ip-address 10.10.10.1 global
!
interface Loopback 0
  ip address 10.10.10.1/32
  no shutdown
!
interface Ethernet1/1
  switchport
  switchport mode trunk
  no shutdown
!
interface Vlan 11
  ip address 10.11.11.2/29
  no ip redirects
  no shutdown
</pre>

In the above example the *monitor erspan origin ip-address 10.10.10.1 global* means it will use Loopback 0 as the source of the GRE tunnel.

<pre>
<span>ERSPAN Destination Configs</span>
monitor session 47 type erspan-destination
  destination interface Ethernet2/34
  source ip 10.11.11.3
  erspan-id 902
  vrf default
  no shutdown
!
interface Eth2/34
  switchport
  switchport monitor
  no shutdown
!
interface Vlan 11
  ip address 10.11.11.3/29
  no ip redirects
  no shutdown
interface Eth1/2
  switchport
  switchport mode trunk
  no shutdown
</pre>
