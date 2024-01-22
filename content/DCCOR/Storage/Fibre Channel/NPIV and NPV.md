# NPIV and NPV

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--22-blue)

![Keyword](https://img.shields.io/badge/NPV-darkgreen)
![Keyword](https://img.shields.io/badge/N%20Port%20Virtualization-darkgreen)
![Keyword](https://img.shields.io/badge/NPIV-darkgreen)
![Keyword](https://img.shields.io/badge/N%20Port%20ID%20Virtualization-darkgreen)

<hr>

## Overview

In fabric mode, the NX-OS switches provide the standard Fibre Channel switching capability and features. In this mode, each switch that joins a SAN is assigned a domain ID. Each SAN (or VSAN) supports a maximum of 239 domain IDs, so the SAN has a limit of 239 switches. In a SAN topology with a large number of edge switches, the SAN may need to grow beyond this limit. N port virtualization (NPV) alleviates the domain ID limit by sharing the domain ID of the core switch among multiple edge switches. 

**The NPV core switch, with the N port identifier virtualization (NPIV) feature enabled, provides a means to assign multiple FCIDs to a single N port. This feature allows multiple applications on the N port to use different identifiers and allows access control, zoning, and port security to be implemented at the application level.**

An NPV edge switch relays all traffic from server-side ports to the core switch. The core switch provides F port functionality (such as login and port security) and all the Fibre Channel switching capabilities. The edge switch shares the domain ID of the core switch. The edge switch appears as a Fibre Channel host to the core switch and as a regular Fibre
Channel switch to its connected devices.

## Configuration

When the **npv enable** or **feature npv** is run on a switch the config is erased and the switch is reset.

<table>
  <thead>
    <tr>
      <th>Port Type</th>
      <th>NPV Core Switch (NPIV)</th>
      <th>NPV Edge Switch</th>
      <th>Trunking State</th>
      <th>Link Mode</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>F and NP ports</td>
      <td>On</td>
      <td>Auto or On</td>
      <td>Trunking</td>
      <td>TF-TNP link</td>
    </tr>
    <tr>
      <td>Auto</td>
      <td>On</td>
      <td>Trunking</td>
      <td>TF-TNP link</td>
    </tr>
    <tr>
      <td>Off</td>
      <td>Auto, on, or off</td>
      <td>No Trunking</td>
      <td>F-NP link</td>
    </tr>
  </tbody>
</table>

<pre>
<span>NPV</span>
<hr>feature npv
!
interface fc 1/1, fc 1/2
  channel-group 2 force
  no shutdown
interface port-channel 2
  switchport mode NP
  channel mode active
  no shutdown
</pre>

<pre>
<span>NPIV</span>
<hr>feature npiv
!
interface fc 1/1, fc 1/2
  channel-group 2 force
  no shutdown
interface port-channel 2
  switchport mode F
  channel mode active
  no shutdown
</pre>
