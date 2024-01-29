# Cisco Intersight

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--29-blue)

![Keyword](https://img.shields.io/badge/UCS-darkgreen)
![Keyword](https://img.shields.io/badge/Unified%20Computing%20System-darkgreen)

<hr>

## What is Cisco Intersight

Cisco Intersight is a cloud-based management platform that delivers intelligent management of compute infrastructure for Cisco UCS and Cisco HyperFlex. It provides a SaaS-based delivery model that enables customers to deploy faster, simplify operations, and enhance productivity.

### Telemetry

Cisco Insight automatically contacts member devices to collect telemetry data to use for its recommendation engine.

### Licensing

- **Cisco Intersight Infrastructure Services Essentials**: The Essentials license tier offers server management with global health monitoring, inventory, proactive support through Cisco TAC integration, multifactor authentication, along with SDK and API access.

- **Cisco Intersight Infrastructure Services Advantage**: The Advantage license tier offers advanced server management with extended visibility, ecosystem integration, and automation of Cisco and third-party hardware and software, along with multidomain solutions.

With the Essentials license, you miss out on:

- Tunneled KVMs
- OS Install Automation
- Storage/Network/Virtual Automation
- Workflow Designer
- Ecosystem Visibility
- ITOM Integrations (ServiceNow)

#### Setup

Must be using Chrome.

1. Go to UCS Manager for the intended device.
2. Get the Device ID and Claim Code from "Admin > Device Connecter > Connection"
3. Go to the Intersight portal and go to "System >Admin > Targets", then click Claim a New Target