# SAN Port Channels

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--21-blue)

![Keyword](https://img.shields.io/badge/SAN-darkgreen)
![Keyword](https://img.shields.io/badge/Storage%20Area%20Network-darkgreen)

<hr>

## Port Compatibility

The following ports can form a port channel:

- E ports and TE ports

- F ports and NP ports

- TF ports and TNP ports

A port can be configured as a member of a static port channel only if the following configurations are the same in the port and the port channel:

- Speed
- Mode
- Rate mode
- Port VSAN
- Trunking mode
- Allowed VSAN list or VF-ID list

## Load Balancing

Load-balancing functionality on SAN port channels can be provided using the following methods:

**Flow Based**

All frames between source and destination follow the same links for a given flow. That is, whichever link is selected for the first exchange of the flow is used for all subsequent exchanges.

**Exchange Based**

The first frame in an exchange is assigned to a link, and then subsequent frames in the exchange follow the same link. However, subsequent exchanges can use a different link. This method provides finer granularity for load balancing
while preserving the order of frames for each exchange.

## Configuration

<pre>
vsan database
  vsan 10 name IT_Team
!
interface fc1/1, fc1/2
  switchport mode E
  channel-group 2
  no shutdown
!
interface port-channel 2
  switchport mode E
  switchport trunk mode on
  switchport trunk allowed vsan 10
  channel-mode active
  no shutdown
</pre>