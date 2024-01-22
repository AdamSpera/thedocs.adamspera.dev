# Fibre Channel Zoning

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--22-blue)

![Keyword](https://img.shields.io/badge/Zoning-darkgreen)

<hr>

## Features

Zoning is a method of partitioning a single Fibre Channel fabric into smaller subsets to provide isolation and visibility into the fabric.

**A *zone* can consist of multiple zone members.**

**A *zone set* consists of on eor more zones.**

- A zone can be a member of multiple zone sets.
- Nexus 5000 supports 500 zone sets
- MDS Series supports 1000 zone sets

## Specifics

- Configuring only one initiator and one target for a zone provides the most efficient use of the switch resources.
- Configuring the same initiator to multiple targets is accepted.
- Configuring multiple initiators to multiple targets is not recommended.
- While configuring a zone member based on interface type, you should always select a fabric switch that potentially has the highest interface count in the fabric.

## Types of Zoning

**Soft Zoning**

In soft zoning, zoning restrictions are applied only during interaction between the name server and the end device. If an end device somehow knows the FCID of a device outside its zone, it can access that device.

**Hard Zoning**

Hard zoning is enforced by the hardware on each frame sent by an N port. As frames enter the switch, source-destination IDs are compared with permitted combinations to allow the frame at wire speed. Hard zoning is applied to all forms of zoning. Hard zoning enforces zoning restrictions on every frame and prevents unauthorized access.

**Both are enabled by default, but hard zoning takes priority.**

## Autozone

This feature is only intended for fabrics with only one fibre switch, wit no more than 100 devices connected.

This feature only works for devices connected to VSAN 1.

**Automatic Mode**

Scheduler runs a job to check for new device logins every 5 minutes.

**Manual Mode**

The administrator has to log into the switch and run the *autozone --update* command each time a new device is added to be added to the zoning configuration.

## Configuration

<pre>
<span>Configure a device to use Autozone features.</span>
<hr>autozone --enable
autozone --enableautosave
autozone --update
autozone --delete
</pre>

<pre>
zone name Zone_1 vsan 3
  member FCID 00:00:00:00:00:00
!
zoneset name Zoneset_1 vsan 2
  member Zone_1
!
zoneset activate name Zoneset_1 vsan 3
zoneset distribute full vsan 3
!
zone smart-zoning enable vsan 3
!
zone mode enhanced vsan 3
zone commit vsan3
</pre>

