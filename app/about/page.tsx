import Link from 'next/link';

const focusAreas = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'SOC & Security Monitoring',
    description: 'SIEM dashboards, alert triage, and continuous monitoring.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Incident Response',
    description: 'Detection, containment, and structured response.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Network Security',
    description: 'Segmentation, firewalls, and IDS/IPS.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11h-1.082A7.53 7.53 0 0012 4.5 7.53 7.53 0 005.082 11H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2z" />
      </svg>
    ),
    title: 'Cloud Security',
    description: 'IAM, monitoring, and automated response in the cloud.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z" />
      </svg>
    ),
    title: 'Digital Forensics',
    description: 'Evidence handling and investigative analysis.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    title: 'IT Infrastructure',
    description: 'Systems administration and infrastructure foundations.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      
      {/* Intro Narrative Section */}
      <section className="space-y-6 max-w-3xl">
        <div className="text-xs font-mono text-blue-400 tracking-widest uppercase">
          — ABOUT
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Promise cybersecurity professional
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed">
          An honest look at where I am in my career and where I am headed.
        </p>

        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed pt-2">
          <p>
            I am an aspiring cybersecurity professional with a strong foundation in IT support, systems administration, networking, and defensive security.
          </p>

          <p>
            My IT background has helped me develop a practical understanding of the systems and infrastructure that cybersecurity teams are responsible for protecting. Through hands-on labs and technical projects, I have worked with Windows environments, Windows Server, Active Directory, networking, Wazuh security monitoring, pfSense, Suricata, and cloud security technologies.
          </p>

          <p>
            I am currently gaining practical experience through my internship while continuing to develop my technical skills through hands-on projects, labs, and independent learning.
          </p>

          <p>
            I am particularly interested in Security Operations, threat detection, incident response, network security, cloud security, and digital forensics.
          </p>

          <p className="text-gray-400">
            This portfolio documents my learning journey, technical projects, practical experiments, and the skills I continue to develop as I progress in my cybersecurity career.
          </p>
        </div>
      </section>

      {/* Current Focus Grid Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">Current Focus</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="bg-[#111622]/80 border border-gray-800/80 p-6 rounded-xl space-y-3 hover:border-gray-700 transition-colors"
            >
              <div className="p-2 bg-gray-900/80 border border-gray-800 rounded-lg w-fit">
                {area.icon}
              </div>
              <h3 className="font-semibold text-white text-sm">{area.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}