# Nexus NetFlow

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--15-blue)

![Keyword](https://img.shields.io/badge/NetFlow-darkgreen)
![Keyword](https://img.shields.io/badge/Flow%20Record-darkgreen)
![Keyword](https://img.shields.io/badge/Flow%20Exporter-darkgreen)
![Keyword](https://img.shields.io/badge/Flow%20Monitor-darkgreen)

<hr>

## Overview

Monitors flows of traffic, so like one ssh session, or one ftp stream.

Sends data from their cache to the collector every ten seconds by default.

Identifies only ingress packet flows.

### Components

**Flow Record**

- Defines the fields to be collected

- You can configure the keywords **match** for fields, and **collect** for counters.

Default commands that are automatically applied are:

- match interface input

- match flow direction

**Flow Exporters**

- Defines the destination of the flow data

- You should configure the export destination IP address, source interface, and UDP port number (where the collector is listening for).

## Configuration

<pre>
<span>Prerequisites</span>
<hr>feature netflow
</pre>

<pre>
<span>Flow Exporter</span>
<hr>flow exporter EXPORTER_1
  version 9
</pre>

<pre>
<span>Flow Record</span>
<hr>flow record RECORD_1
  match ipv4 source address
  match ipv4 destination address
  collect counter bytes
  collect counter packets
</pre>

<pre>
<span>Flow Monitor</span>
<hr>flow monitor FLOW_1
  record RECORD_1
  exporter EXPORTER_1
  cache timeout active 60
</pre>

<pre>
<span>Applying It</span>
<hr>interface Ethernet1/1
  ip flow monitor FLOW_1 input
  ip address 10.20.1.1/24
  no shutdown
</pre>