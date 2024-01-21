# Cisco Fabric Services (CFS)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--21-blue)

![Keyword](https://img.shields.io/badge/CFS-darkgreen)
![Keyword](https://img.shields.io/badge/Cisco%20Fabric%20Services-darkgreen)

<hr>

## Features

- Peer-to-peer protocol with no client/server relationship at the CFS layer.

**Distribution Scopes:**

1. Logical Scope: within a VSAN

2. Physical Scope: across entire topology

3. Selected VSANs: across multiple selected VSANs

**Distribution Modes**

1. Coordinated Distributions: only one distribution at a time, which is done by locking and propagating it across the network.

2. Uncoordinated Distributions: multiple distributions at the same time, except when a coordinated distribution is in progress.

3. Unrestricted uncoordinated distributions: multiple distributions at the same time, even when a coordinated distribution is in progress.

## Configurations

<pre>
cfs distribute
cfs ipv4 distribute
cfs ipv4 mcast-address 239.255.1.1
!
cfs static-peers
  ip address 1.2.3.4
!
cfs region 3
  callhome
</pre>

