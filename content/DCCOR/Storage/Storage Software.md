# Storage Software

![Exam](https://img.shields.io/badge/DCCOR-8A2BE2)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2024--01--25-blue)

![Keyword](https://img.shields.io/badge/FCoE-darkgreen)
![Keyword](https://img.shields.io/badge/Fibre%20Channel%20over%20Ethernet-darkgreen)

<hr>

## Upgrades

<pre>
<span>Nondisruptive Installs</span>
<hr>install all kickstart m9250-s5ek9-kickstart-mz.8.4.1.bin system m9250-s5ek9-mz.8.4.1.bin
</pre>

<pre>
<span>Disruptive Installs</span>
<hr>no boot kickstart bootflash:/m9250-s5ek9- kickstart-mz.8.2.1.bin
no boot system bootflash:/m9250-s5ek9-mz. 8.2.1.bin
boot kickstart bootflash:/m9250-s5ek9- kickstart-mz.8.4.1.bin
boot system bootflash:/m9250-s5ek9-mz.8.4.1.bin
copy running-config startup-config
reload
</pre>



