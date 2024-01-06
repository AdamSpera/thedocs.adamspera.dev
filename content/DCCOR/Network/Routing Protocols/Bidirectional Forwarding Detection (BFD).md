# Bidirectional Forwarding Detection (BFD)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--06-blue)

![Keyword](https://img.shields.io/badge/BFD-darkgreen)
![Keyword](https://img.shields.io/badge/Bidirectional%20Forwarding%20Detection-darkgreen)

<hr>

## Overview

BFD is a detection protocol that is designed to provide fast forwarding path failure detection times for all media types, encapsulations, topologies, and routing protocols.

The BFD session parameters include:

**Desired minimum transmit interval:**

- Interval that BFD messages are sent out.

**Required minimum receive interval:**

- Minimum interval a device can accept BFD messages.

**Detect multiplier:**

- Number of missed BFD messages before declaring a failure.

## Default BFD Parameters

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>BFD feature</td>
            <td>Disabled</td>
        </tr>
        <tr>
            <td>Required minimum receive interval</td>
            <td>50 milliseconds</td>
        </tr>
        <tr>
            <td>Desired minimum transmit interval</td>
            <td>50 milliseconds</td>
        </tr>
        <tr>
            <td>Detect multiplier</td>
            <td>3 messages</td>
        </tr>
    </tbody>
</table>

## Configuration

NOTE: NX-OS only supports BFDv1.

NOTE: NX-OS only supports BFD Asynchronous mode.

<pre>
feature bfd
!
router ospf 1
    bfd
!
router bgp 65000
    neighbor 1.1.1.2
        remote-as 65001
        bfd
!
interface Ethernet2/3
    ip ospf bfd
    bfd interval 100 min_rx 100 multiplier 5
</pre>

The above configuration does the following:

1. Enables BFD globally.
2. Enables BFD for all OSPF interfaces.
3. Enables BFD for the specific BGP neighbor.
4. Configures specific BFD timers for the interface.