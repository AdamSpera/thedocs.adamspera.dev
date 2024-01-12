# Nexus Software Management

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--12-blue)

![Keyword](https://img.shields.io/badge/POAP-darkgreen)
![Keyword](https://img.shields.io/badge/PowerOn%20Auto%20Provisioning-darkgreen)
![Keyword](https://img.shields.io/badge/ISSU-darkgreen)
![Keyword](https://img.shields.io/badge/InService%20Software%20Upgrade-darkgreen)
![Keyword](https://img.shields.io/badge/EPLD-darkgreen)
![Keyword](https://img.shields.io/badge/Enhanced%20Programmable%20Logical%20Device-darkgreen)

<hr>

## Console Access

- 9600 baud
- 8 data bits
- 1 stop bit
- No parity

Using Ctrl+Shift+6 withing 2 seconds of power on will default to using the devices golden image.

## POAP Boot Process

The POAP process has the following phases:
1. Power up
2. USB discovery
3. DHCP discovery
4. Script execution
5. Post-installation reload

## Infrastructure Software Lifecycle

- Major releases introduce significant new features, functions, and platforms.

- Minor releases enhance the features and functions of an existing major release.

- Maintenance releases address product defects in a minor release

**In-service Software Upgrade (ISSU)**

When enabled by CLI, the switch can upgrade software while continuing operation and packet forwarding.

When this process starts, some timers will be extended, like BFD and UDLD to accommodate the upgrade.

When this process starts, protocols such as BGP, OSPF, IS-IS, and EIGRP will perform graceful restarts.

**Nexus 9500 Parallel Upgrade Process**

1. First Half of Line Cards
2. First Half of Fabric Modules
3. Second Half of Line Cards
4. Second Half of Fabric Modules
5. First System Controller
6. Second System Controller

#### Configurations

<pre>
<span>Check the checksum of an image.</span>
<hr>show file bootflash://sup-1/nxos.7.0.3.I2.1.bin sha256sum
</pre>

<pre>
<span>Show the impact of the software deployment.</span>
<hr>show install all impact nxos bootflash:n9000-dk9.7.0.3.I1.1.bin
</pre>

<pre>
<span>Install the designated image upgrades.</span>
<hr>install all nxos bootflash:n9000-dk9.7.0.3.I1.1.bin
</pre>

## Programmable Logical Devices Upgrade

Nexus modular switches contain several programmable logical devices (PLDs) that
provide hardware functionalities in all modules. Cisco provides EPLD image upgrades to
enhance hardware functionality or to resolve known issues for modular switches only.

**EPLDs are disruptive upgrades.**

## Configuration Management

### Checkpoint Config

NX-OS automatically creates system checkpoints. You can use either a user or system
checkpoint to perform a rollback. You can create a checkpoint copy of the current running
configuration at any time by using this command:

<pre>checkpoint {[ cp-name ] [ description descr ] | file filename }</pre>

<pre>checkpoint chkp description first check point</pre>

### Rollback Config

NX-OS saves this checkpoint as an ASCII file that you can use to roll back the running 
configuration to the checkpoint configuration at a future time. You can create multiple
checkpoints to save different versions of your running configuration. To roll back the running 
configuration, you use the following command:

<pre>rollback running-config { checkpoint cp-name | file cp-file } [ atomic | best-effort | stop-at-first-failure ]</pre>

<pre>rollback running-config checkpoint chkp</pre>

The rollback trigger types are

- **atomic**: Implements a rollback only if no errors occur

- **best-effort**: Implements a rollback and skips any errors

- **stop-at-first-failure**: Implements a rollback that stops if an error occurs

The default rollback type is atomic.