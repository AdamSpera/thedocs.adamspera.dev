# Simple Network Management Protocol (SNMP)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--14-blue)

![Keyword](https://img.shields.io/badge/SNMP-darkgreen)
![Keyword](https://img.shields.io/badge/Management%20Information%20Base-darkgreen)
![Keyword](https://img.shields.io/badge/Community%20String-darkgreen)
![Keyword](https://img.shields.io/badge/Trap-darkgreen)

<hr>

## SNMP

### General Logging

**Terminal Logging**

- Default, sends all logs to the console port line con.

**Terminal Logging**

- Displays on Telnet or SSH

**Buffered Logging**

- Uses RAM to store syslog messages

**Syslog Server Logging**

- Sends logs to a syslog server

#### Security Levels

<table>
    <thead>
        <tr>
            <th>Level</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0 – Emergency</td>
            <td>System unusable</td>
        </tr>
        <tr>
            <td>1 – Alert</td>
            <td>Immediate action needed</td>
        </tr>
        <tr>
            <td>2 – Critical</td>
            <td>Critical condition</td>
        </tr>
        <tr>
            <td>3 – Error</td>
            <td>Error condition</td>
        </tr>
        <tr>
            <td>4 – Warning</td>
            <td>Warning condition</td>
        </tr>
        <tr>
            <td>5 – Notification</td>
            <td>Normal but significant condition</td>
        </tr>
        <tr>
            <td>6 – Informational</td>
            <td>Informational message only</td>
        </tr>
        <tr>
            <td>7 – Debugging</td>
            <td>Appears during debugging only</td>
        </tr>
    </tbody>
</table>

### Components

- **SNMP Manager**: The device that collects and processes information from managed devices. It can also send configuration updates to managed devices.

- **SNMP Agent**: The device that is being managed. It collects and stores management information and makes it available to the SNMP manager.

- **Management Information Base (MIB)**: The database of objects that can be managed by SNMP. It is a collection of managed objects that are organized hierarchically.

### Security Levels

**noAuthNoPriv**

- No authentication or encryption is used.

- Uses a community string for authentication.

**authNoPriv**

- Authentication is used, but no encryption.

- Uses HMAC-SHA/HMAC-MD5 authentication.

**authPriv**

- Authentication and encryption are used.

- Uses HMAC-SHA/HMAC-MD5 authentication.

- Uses DES encryption.


### Configuration

<pre>
snmp-server user Adam auth sha abc123 priv xyz123
snmp-server host 192.0.0.1 informs version 3 auth NMS
snmp-server host 192.0.0.1 source-interface Eth1/2
</pre>

## Smart Call Home

### Configuration

<pre>
snmp-server contact person@company.com
callhome
    email-contact admin@mycompany.com
    phone-contact +1-123-456-7890
    street-address 123 Main Street
    transport email smtp-server 192.168.1.10 use-vrf BlueVRF
    enable
</pre>