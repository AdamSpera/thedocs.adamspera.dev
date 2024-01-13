# Nexus Time Management (NTP)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--13-blue)

![Keyword](https://img.shields.io/badge/NTP-darkgreen)
![Keyword](https://img.shields.io/badge/Network%20Time%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/PTP-darkgreen)
![Keyword](https://img.shields.io/badge/Precision%20Time%20Protocol-darkgreen)

<hr>

## Stratum

Closer to the source, is a lower stratum.

A google server connected to a radio clock would be stratum 1.

Stratum is between 1 and 15.

## Network Time Protocol (NTP)

NTP is a protocol designed to synchronize the clocks of computers over a network.

NTP uses UDP port 123.

### Security

**ACL**

- Configure to only allow NTP traffic form the uplink.

### Configuration

<pre>
feature ntp
!
ntp 1 md5 cisco
!
ntp master 1
ntp source-interface vlan10
ntp server 10.10.10.10 prefer
ntp server 20.20.20.20
ntp peer 192.168.1.10
ntp authentication-key 1 md5 cisco
ntp authenticate
!
interface Eth1/1
    no ntp
</pre>

In the above config, the device will be the master for the stratum devices below it. It uses ntp server to sync with a stratum 1 device. It uses ntp peer to synchronize with another stratum 2 device.

## Precision Time Protocol (PTP)

PTP is just like NTP, but it is more accurate. Some devices can be configured to use PTP instead of NTP.

PTP uses UDP port 319.

NX-OS deploys PTP version 2.

The **grandmaster clock (GMC)** uses GPS to synchronize to a stratum 0 device.

**GMC**

- The GMC is the most accurate clock in the network.
- Sync messages are sent every 1 second.
- Delay requests are sent by downstream devices. the RTT is the delay between the GMC and the downstream device.

### PTP Device Roles

**PTP Domain (0-127)**

**Ordinary Clock (OC)**
- Single interface that ptp messages are sent/received on.
- Typically a server or a leaf switch.

**Boundary Clock (BC)**
- Many interfaces that ptp messages are sent/received on.
- Typically a spine switch or something more upstream.
- Maintains its own internal clock.

**Transparent Clock**
- No internal clock of its own.
- Only passes through ptp messages from BCs to OCs.
- Adds its residence time to the ptp-correction field.

### Configuration

<pre>
feature ptp
!
ptp domain 0
ptp source 10.10.10.10
ptp priority1 0
ptp priority2 255
!
interface Eth1/1
    no ptp
    ptp
    ptp vlan 2
</pre>

