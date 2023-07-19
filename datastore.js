
var sidebar_data = [
  {
    'title': 'CCNA',
    'sections': [
      {
        'title': 'Infrastructure',
        'contents': [
          'Inside NAT',
          'Spanning Tree'
        ]
      },
      {
        'title': 'IP Routing',
        'contents': [
          'OSPFv2',
          'EIGRP'
        ]
      }
    ]
  },
  {
    'title': 'ENCOR',
    'sections': [
      {
        'title': 'Network Assurance',
        'contents': [
          'QoS',
          'Flow Monitoring'
        ]
      },
      {
        'title': 'Automation',
        'contents': [
          'NETCONF vs RESTCONF',
          'Python3'
        ]
      },
      {
        'title': 'Security',
        'contents': [
          '802.1x',
          'IPSec',
          'MACSec'
        ]
      }
    ]
  },
]

var content_data =
{
  'header_encor_section_networkassurance_content_flowmonitoring': `Hello world! This lesson is for flow control!`,
  'default_about': `
  <section>
      <h1>OpenCache</h1>
      <section>
        <h2>
          <span style="font-weight: 200;">Learn</span> ->
          <span style="font-weight: 300;">Study</span> ->
          <span style="font-weight: 400;">Lab</span> ->
          <span style="font-weight: 500;">Certify</span>
        </h2>
        <li>Study, reference, and learn through certification guides, notes, tips, and resources!</li>
        <li>New certification guides and website improvements added weekly!</li>
      </section>
      <section style="padding-left: 20px;">
        <section>
          <h3>No Paywalls</h3>
          <li>Access all certification learning resources completely free of charge.</li>
        </section>
        <section>
          <h3>No Advertisements</h3>
          <li>Enjoy uninterrupted learning with 100% ad-free public access.</li>
        </section>
        <section>
          <h3>No Site Trackers</h3>
          <li>Rest easy as OpenCache ensures a tracker-free browsing experience.</li>
        </section>
      </section>
      <section>
        <h2>About the Creator</h2>
        <p>Hello! My names Adam Spera, I created and publish to OpenCache! Here's a little bit about me:</p>
        <li>I'm a student at Arcadia University with an interest in Web Development and Computer Networking.</li>
        <li>I've always had a passion for creating platforms that help people, first with LaundryLott, and now OpenCache.</li>
        <li>I have had the privilege to work with many great organizations, most notably listed below:</li>
        <li style="margin-left: 60px; list-style-type: circle;">I worked as a Network Administrator Intern at Arcadia University during Summer 2022</li>
        <li style="margin-left: 60px; list-style-type: circle;">I worked as a TCE Network Recreate Engineer Co-op in the CX Labs at Cisco during Spring 2023</li>
        <li>During my time in university and at work, I have earned a number of certifications, and hope to share that knowledge through OpenCache!</li>
        <p>For more about me, see the links below! Happy learning!</p>
        <p>Always remember, the RIB rebuilds the FIB...</p>
        <span>
          <a href="https://www.linkedin.com/in/adamtspera/" class="button">🎓&nbsp;&nbsp;LinkedIn</a>
          &nbsp;&nbsp;
          <a href="https://www.buymeacoffee.com/adamspera" class="button coffee">☕&nbsp;&nbsp;&nbsp;Buy me a coffee!</a>
        </span>
      </section>
    </section>
  `
}

export { sidebar_data, content_data };