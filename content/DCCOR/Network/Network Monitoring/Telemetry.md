# Telemetry

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--17blue)

![Keyword](https://img.shields.io/badge/Telemetry-darkgreen)
![Keyword](https://img.shields.io/badge/NXOS-darkgreen)
![Keyword](https://img.shields.io/badge/DCNM-darkgreen)
![Keyword](https://img.shields.io/badge/Data%20Center%20Network%20Manager-darkgreen)

<hr>

## Telemetry

Contrary to SNMP, Telemetry is a push model. The network device will push the data to the collector. The collector can be a server or a cloud service.

#### Implementation Steps

1. Set the format and destination to which the data is to be sent.
2. Configure the data that is to be collected as part of the sensor group.
3. Set the subscription between the sensor-group and the destination, along with
the pace at which to send the data (in milliseconds).

This data collected can be sent to the collector of your choice, be it an in-house tool, a commercial application such as Splunk, or a Cisco-provided solution such as the Data Center Network Manager (DCNM).

### Configuration

<pre>
telemetry
  destination-group 1
    ip address 172.27.247.72 port 60001 protocol gRPC encoding GPB
  sensor-group 1
    data-source NX-API
      path "show system resources"
      path "show version"
      path "show ip access-list test"
  subscription 1
    dst-grp 1
      snsr-grp 1 sample-interval 750000
</pre>