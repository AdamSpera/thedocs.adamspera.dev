# Distributed Device Alias Service

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--22-blue)

![Keyword](https://img.shields.io/badge/Device%20Alias-darkgreen)
![Keyword](https://img.shields.io/badge/Distributed%20Device%20Alias%20Service-darkgreen)
![Keyword](https://img.shields.io/badge/Effective%20Database-darkgreen)
![Keyword](https://img.shields.io/badge/Pending%20Database-darkgreen)

<hr>

## Modes

**Basic Mode**

When a WWPN is changed the update is not propagated to other switches.

**Enhanced Mode**
 
Device aliases are created on a central switch and are shared with other switches.

## Distribution

**Effective Database**

The database that is currently in use by the fabric.

**Pending Database**

Changes to the device aliases configurations are stored in this database. When changes are committed, this is wiped and the effective database is propagated with the changes.

## Configuration

<pre>
device-alias mode enhanced
device-alias commit
!
device-alias database
  device-alias name <i>Device_1</i> pwwn <i>wwpn</i>
  device-alias rename Device_1 Device_2
!
device-alias commit
</pre>

