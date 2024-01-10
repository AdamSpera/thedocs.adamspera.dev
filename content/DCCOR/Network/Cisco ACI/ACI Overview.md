# Cloud Services & Deployment Models

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--10-blue)

![Keyword](https://img.shields.io/badge/ACI-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Centric%20Infrastructure-darkgreen)
![Keyword](https://img.shields.io/badge/SDN-darkgreen)
![Keyword](https://img.shields.io/badge/Software%20Defined%20Networking-darkgreen)
![Keyword](https://img.shields.io/badge/APIC-darkgreen)
![Keyword](https://img.shields.io/badge/Application%20Policy%20Infrastructure%20Controller-darkgreen)

<hr>

## Overview

ACI is a software-defined networking (SDN) solution from Cisco for data centers and cloud networks.

### APIC

The Application Policy Infrastructure Controller (APIC) is the unifying point of automation and management for the Application Centric Infrastructure (ACI) fabric. The APIC provides centralized access to all fabric information, optimizes the application lifecycle for scale and performance, and supports flexible application provisioning across physical and virtual resources.

**APICs are deployed as a cluster. A minimum of three APICs is required for a cluster.**

- A cluster size of 3, 5, or 7 APICs is recommended.
- A cluster size of 4 or 6 is not recommended.

### ACI Flow Models

1. **Logical Model**: Where the user configures and declares its intent.
2. **Resolved Model**: Where the APIC sends the data to the spine and leafs.
3. **Concrete Model**: Where spine/leafs take the resolved model and is converted to the concrete model by policy elements (APIC agent running on leafs/spines)

Creation of the hardware model sends a notification to the iNXOS for programming hardware.

### ACI Hardware

##### Nexus 9500 Modular Chassis

Deployed as Spine devices.

##### Nexus 9300 Fixed Switches

Deployed as Leafs or Spines

##### C-220 APIC

- Deployed as APICs
- Pre configured when purchased

APICs must be uplinked with Twinax/DAC cables at 10/25G.

