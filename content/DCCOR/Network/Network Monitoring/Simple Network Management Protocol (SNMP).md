# Simple Network Management Protocol (SNMP)

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--14-blue)

![Keyword](https://img.shields.io/badge/SNMP-darkgreen)
![Keyword](https://img.shields.io/badge/Management%20Information%20Base-darkgreen)
![Keyword](https://img.shields.io/badge/Community%20String-darkgreen)
![Keyword](https://img.shields.io/badge/Trap-darkgreen)

<hr>

## SNMP

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