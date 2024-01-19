# Cisco Nexus Dashboard (ND)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--18-blue)

![Keyword](https://img.shields.io/badge/ND-darkgreen)
![Keyword](https://img.shields.io/badge/Nexus%20Dashboard-darkgreen)
![Keyword](https://img.shields.io/badge/NAE-darkgreen)
![Keyword](https://img.shields.io/badge/Terraform-darkgreen)

<hr>

## Overview

Nexus Dashboard is a cloud-based management platform for Cisco Nexus switches.

The ND is sort of a shell that hosts services.

## Services

### Nexus Dashboard Fabric Controller (NDFC)

- Management and automation across Nexus and MDS devices.
- Provides an ACI experience to non-aci environments.

**Features**

- Image Mgmt
- Seamless RMA
- Enforce Configs
- Licence Mgmt
- Non-Nexus Support (XE, XR, Arista, Etc.)
- 

### Nexus Dashboard Orchestrator (NDO)

- Manages many different sites, which can be very different.
- The NDO can manage and push policies to NDFC sites.

Can enforce overall policy to multiple ACI sites/fabrics all at once, from one view.

Can also enforce policy to NDFC, ACI, and Cloud sites, all at once.

### Nexus Dashboard Insights (NDI)

- Gathers telemetry to provide analytics and insights.
- Utilizes the Network Assurance Engine (NAE) and Terraform.

Collects telemetry data to NDI from many different kinds of devices, like XR, XE, FX, GX, and more for total visibility.

## Implementation

Deployed in a cluster of three C-Series UCS servers.

These devices have the following interfaces:

- 1x CIMC Port
- 2x 1gb Mgmt Ports
- 2x 10gb Data Ports

## Cluster Nodes

#### Single Node

This is only supported for a limited amount of services and CANNOT be extended to a three node cluster after implementation.

#### Three Node Cluster

At least two master nodes are required for the cluster to remain operational. In case of two master node failure, the cluster enters an offline read-only mode and cannot be used until you recover it.

Only three-node clusters support additional worker nodes. After your initial cluster is
up and running, you can configure and deploy additional nodes.

## Node Compatibility

<table>
  <thead>
    <tr>
      <th>Category Scale</th>
      <th>Nodes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nodes in a physical cluster</td>
      <td>Three master nodes<br>Four worker nodes<br>Two standby nodes</td>
    </tr>
    <tr>
      <td>Nodes in a virtual cluster (ESXi)</td>
      <td>Three master nodes<br>Three worker nodes<br>Two standby nodes</td>
    </tr>
    <tr>
      <td>Nodes in a virtual cluster (KVM)</td>
      <td>Three master nodes</td>
    </tr>
    <tr>
      <td>Nodes in a cloud cluster (AWS or Azure)</td>
      <td>Three master nodes</td>
    </tr>
    <tr>
      <td>Nodes in a Red Hat Enterprise Linux (RHEL)</td>
      <td>Three master nodes</td>
    </tr>
  </tbody>
</table>

## Data Broker Controller (DBC)

The DBC is a service that runs on the NDFC.

The DBC can be deployed in the following modes:

**Centralized**

The controller is deployed on a VM/server/bare metal outside the TAP
aggregation switches. In this mode, the controller can support a multiswitch TAP
aggregation topology.

**Embedded**

The controller is deployed on the TAP aggregation switch using a guest
shell. In this mode, the controller can be used only as a single switch deployment.

**Nexus Dashboard**

The controller is supported as an application on Cisco Nexus
Dashboard.

**Cisco ACI**

The controller is supported as an application on Cisco ACI APICs.