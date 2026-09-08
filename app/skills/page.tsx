interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'IT Support & Systems',
    skills: [
      'Windows troubleshooting',
      'Hardware troubleshooting',
      'Software installation and configuration',
      'User account management',
      'Microsoft 365',
      'Remote support',
      'Printers and peripherals',
      'System administration',
      'Windows',
      'Linux',
      'macOS',
    ],
  },
  {
    title: 'Systems & Infrastructure',
    skills: [
      'Windows Server',
      'Active Directory',
      'DNS',
      'User and access management',
      'System administration',
      'Endpoint configuration',
    ],
  },
  {
    title: 'Networking',
    skills: [
      'TCP/IP',
      'VLANs',
      'Subnetting',
      'Inter-VLAN routing',
      'Network segmentation',
      'ACLs',
      'Firewall concepts',
      'Secure remote access',
    ],
  },
  {
    title: 'Cybersecurity',
    skills: [
      'Security monitoring',
      'Log analysis',
      'Alert investigation',
      'Threat detection',
      'Incident response',
      'Threat intelligence',
      'IOC analysis',
      'Vulnerability assessment',
      'Network traffic analysis',
      'Security hardening',
      'Security documentation',
    ],
  },
  {
    title: 'Security Operations',
    skills: [
      'Wazuh',
      'Endpoint monitoring',
      'File Integrity Monitoring',
      'Security event monitoring',
      'Alert investigation',
      'Incident documentation',
    ],
  },
  {
    title: 'Network Security',
    skills: [
      'pfSense',
      'Suricata',
      'IDS/IPS',
      'Firewall management',
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      
      {/* Page Header */}
      <header className="space-y-4">
        <div className="text-xs font-mono text-blue-400 tracking-widest uppercase">
          — SKILLS
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Technical Skills & Hands-On Knowledge
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Organized by area — these reflect practical, hands-on knowledge built through labs and projects, not years of professional employment.
        </p>
      </header>

      {/* Skills Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <section
            key={idx}
            className="bg-[#111622]/80 border border-gray-800/80 rounded-2xl p-6 space-y-5 hover:border-gray-700/80 transition-colors"
          >
            <h2 className="text-sm font-bold text-white font-mono">
              {category.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="px-3 py-1.5 bg-[#182030]/80 border border-gray-800/80 rounded-lg text-xs font-mono text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </main>

    </div>
  );
}