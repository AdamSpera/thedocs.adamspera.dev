# Spanning Tree Protocol (STP) Extensions

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2023--12--26-blue)

![Keyword](https://img.shields.io/badge/STP%20Extensions-darkgreen)
![Keyword](https://img.shields.io/badge/Spanning%20Tree%20Protocol-darkgreen)
![Keyword](https://img.shields.io/badge/STP-darkgreen)
![Keyword](https://img.shields.io/badge/STP%20Edge-darkgreen)
![Keyword](https://img.shields.io/badge/BPDU%20Guard-darkgreen)
![Keyword](https://img.shields.io/badge/BPDU%20Filter-darkgreen)
![Keyword](https://img.shields.io/badge/Root%20Guard-darkgreen)
![Keyword](https://img.shields.io/badge/Loop%20Guard-darkgreen)
![Keyword](https://img.shields.io/badge/Bridge%20Assurance-darkgreen)
![Keyword](https://img.shields.io/badge/UniDirectional%20Link%20Detection-darkgreen)
![Keyword](https://img.shields.io/badge/UDLD-darkgreen)

<hr>

## Overview

Cisco has added extensions to STP that enhance loop prevention, protect against user configuration errors, and provide better control over the protocol parameters.

Available STP extensions are:

- STP Edge Ports (previously known as PortFast)
- BPDU Filter
- BPDU Guard
- Loop Guard
- Root Guard
- Bridge Assurance.

All these extensions can be used with both Rapid PVST+ and MST.

## Key Points

**STP Edge Ports**

- Bypass the spanning tree listening and learning states and move to the forwarding state immediately. Typically used for Layer 2 access ports that are connected to a single workstation or server.
- Disabled by default.

**BPDU Guard**

- If any BPDU is received on an STP edge port, that port is put into an error-disabled state.
- Disabled by default.

**BPDU Filter**

- Force a port to not send any BPDUs.
- Disabled by default.

**Root Guard**

- Does not allow a port to become a root port.
- Disabled by default.

**Loop Guard**

- Detects if an active port is no longer receiving BPDUs and moves that port into the STP loop-inconsistent blocking state.
- Disabled by default.

**Bridge Assurance**

- Port always sends BPDUs, regardless of the port role.
- Enabled by default.

**UniDirectional Link Detection (UDLD)**

- Periodically transmits UDLD packets on an interface with enabled UDLD. If the packets are not echoed back within a specific time frame, the link is flagged as unidirectional and the interface is error-disabled.
- Disabled by default.

## STP Edge Port

Configuring a Layer 2 access port as a spanning-tree Edge Port causes the port to bypass the spanning tree listening and learning states and move to the forwarding state immediately. This feature was formerly known as PortFast.

Spanning-tree edge ports are typically deployed on Layer 2 access ports that are connected to a single workstation or server. These ports can be considered safe from topology loops.

<main>![STP Edge Port](../../../../media/stp_edge_port.png)</main>

### Configuration

<pre>
<span>Configure STP Edge on an interface.</span>
<hr>interface Ethernet1/1
    spanning-tree port type edge
</pre>

## BPDU Guard

BPDU Guard protects the integrity of ports that are configured as STP edge ports. If any BPDU is received on an STP edge port, that port is put into an error-disabled state. The port is shut down and must be manually re-enabled or automatically recovered through the error-disabled timeout function.

Global BPDU Guard is disabled by default.

### Configuration

<pre>
<span>Configure BPDU Guard on an interface.</span>
<hr>interface Ethernet1/1
    spanning-tree bpduguard enable
</pre>

<pre>
<span>Configure BPDU Guard globally.</span>
<hr>spanning-tree portfast bpduguard default
</pre>

## BPDU Filter

Using BPDU Filter, you can force a port to not send any BPDUs.

Global BPDU Filter is disabled by default.

### Configuration

<pre>
<span>Configure BPDU Filter on an interface.</span>
<hr>interface Ethernet1/1
    spanning-tree bpdufilter enable
</pre>

<pre>
<span>Configure BPDU Filter globally.</span>
<hr>spanning-tree portfast bpdufilter default
</pre>

## Root Guard

When you enable Root Guard on a port, Root Guard does not allow that port to become a root port. If a root guard-enabled port receives a BPDU that would make this port a root port, then that port will be moved to a root-inconsistent state and will not forward traffic.

### Configuration

<pre>
<span>Configure Root Guard on an interface.</span>
<hr>interface Ethernet1/1
    spanning-tree guard root
</pre>

## Loop Guard

Loop Guard detects if an active port is no longer receiving BPDUs and moves that port into the STP loop-inconsistent blocking state. When the port starts receiving BPDUs again, indicating that the unidirectional link failure is no longer present, loop guard removes the blocking state on the port.

Loop Guard is disabled by default.

<main>![UniDirectional Links](../../../../media/unidirectional_links.png)</main>

### Configuration

<pre>
<span>Configure Loop Guard on an interface.</span>
<hr>interface Ethernet1/1
    spanning-tree guard loop
</pre>

## Bridge Assurance

The Bridge Assurance feature, applicable with Rapid PVST+ and MST, is an extension of the idea that is used by loop guard. When bridge assurance is activated on an operational port, this port always sends BPDUs, regardless of the port role. BPDUs essentially become a hello mechanism between pairs of interconnected switches. A port that is configured with bridge assurance is required to receive BPDUs. If a port does not receive BPDUs, it goes into the blocking state. Thus, both ends of the link must have bridge assurance enabled.

**Bridge Assurance is enabled only on spanning tree network ports that are point-to-point links.**

**Only applicable with Rapid PVST+ and MST.**

Bridge Assurance is enabled globally by default.

### Configuration

<pre>
<span>Disable Bridge Assurance globally.</span>
<hr>no spanning-tree bridge assurance
</pre>

## UniDirectional Link Detection (UDLD)

UniDirectional Link Detection (UDLD) is a Layer 2 protocol that works with Layer 1 mechanisms to determine the physical status of a link. The switch periodically transmits UDLD packets on an interface with enabled UDLD. If the packets are not echoed back within a specific time frame, the link is flagged as unidirectional and the interface is error-disabled. Devices on both ends of the link must support UDLD for the protocol to successfully identify and disable unidirectional links.

By default, the UDLD feature is disabled.

### Configuration

<pre>
<span>Configure UDLD globally on fiber interfaces.</span>
<hr>feature udld
</pre>
