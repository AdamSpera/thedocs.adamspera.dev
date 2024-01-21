# Virtual Storage-Area Network (VSAN) 

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--21-blue)

![Keyword](https://img.shields.io/badge/VSAN-darkgreen)
![Keyword](https://img.shields.io/badge/Virtual%20Storage%20Area%20Network-darkgreen)
![Keyword](https://img.shields.io/badge/VSAN%20Trunking-darkgreen)
![Keyword](https://img.shields.io/badge/DPVM-darkgreen)
![Keyword](https://img.shields.io/badge/Dynamic%20Port%20VSAN%20Membership-darkgreen)

<hr>

## Features

- Multiple VSANs can occupy the same physical topology.

- The same FCID can be used across multiple VSANs.

- Each instance of a VSAN runs its own associated processes.

- Events causing issues or traffic disruptions form one VSAN does not affect other VSANs.

## Attributes

**VSAN ID**

Default VSAN ID is 1.

User defined VSAN IDs are between VSAN 2 to 4093.

The designated isolated VSAN is VSAN 4094.

**VSAN Name**

Default name is VLAN plus the number, like VSAN0001.

User defined VSAN names are between 1 to 32 characters.

The name must be unique across all VSANs.

## Dynamic Port VSAN Membership (DPVM)

This feature allows a port to be auto assigned a VSAN base don teh N ports WWN or WWPN.

DPVM configurations are based on port World Wide Name (pWWN) and node World Wide
Name (nWWN) assignments. DPVM contains mapping information for each device pWWN/
nWWN assignment and the corresponding VSAN. The Cisco NX-OS software checks
DPVM active configuration during a device FLOGI and obtains the required VSAN details.

## VSAN Trunking

<table>
  <thead>
    <tr>
      <th>Switch 1</th>
      <th>Switch 2</th>
      <th>Trunking State</th>
      <th>Port Mode</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>On</td>
      <td>Auto or on</td>
      <td>Trunking (EISL)</td>
      <td>TE port</td>
    </tr>
    <tr>
      <td>Off</td>
      <td>Auto, on, or off</td>
      <td>No trunking (ISL)</td>
      <td>E port</td>
    </tr>
    <tr>
      <td>Auto</td>
      <td>Auto</td>
      <td>No trunking (ISL)</td>
      <td>E port</td>
    </tr>
  </tbody>
</table>

## Configuration

<pre>
<span>Adding VSAN to an interface.</span>
<hr>vsan database
  vsan 2
  vsan 2 loadbalancing src-dst--id
  vsan 2 interface fc1/1, fc1/2
!
interface fc1/1, fc1/2
  switchport mode E
  no shutdown
</pre>

<pre>
<span>Setting up DPVM.</span>
<hr>feature dpvm
dpvm database
  pwwn 12:34:56:78:91:23:45:10 vsan 100
  pwwn 12:34:56:78:91:23:45:20 vsan 200
  dpvm commit
!
dpvm activate
!
dpvm auto-learn
!
dpvm distribute
</pre>

<pre>
<span>Implement a VSAN Trunk.</span>
<hr>trunk protocol enable
!
vsan database
  vsan 2 name IT_Team
  vsan 3 name HR_Team
!
interface fc1/1
  switchport mode trunk on
  switchport trunk mode auto
  switchport trunk allowed vsan 1-10
</pre>