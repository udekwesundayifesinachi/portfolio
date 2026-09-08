export const metadata = {
  title: 'Experience — Ifesinachi Sunday Udekwe',
  description: 'Professional experience in IT support, systems administration, and cybersecurity operations.',
};

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string[];
}

export default function ExperiencePage() {
  const experiences: ExperienceItem[] = [
    {
      period: 'Dec 2021 — Present',
      role: 'IT Support Technician & Technical Department Lead',
      company: 'Dominion City Church',
      type: 'On-site / Freelance',
      description: [
        'Oversee and manage the organization’s core technical infrastructure, ensuring high availability and seamless execution of mission-critical operations.',
        'Lead the technical department in maintaining, troubleshooting, and upgrading audiovisual systems, network hardware, and physical security equipment.',
        'Provide robust endpoint support, manage user access controls, and resolve complex hardware and software issues to support large-scale weekly services and special events.',
      ],
    },
    {
      period: '2025 — Present',
      role: 'Cybersecurity Lab & SOC Operations Engineer',
      company: 'Hands-on Labs & Simulation Environments',
      type: 'Independent Technical Practice',
      description: [
        'Designed and deployed simulated Security Operations Center (SOC) lab environments utilizing Splunk, Wireshark, and pfSense.',
        'Performed live packet analysis, investigated network anomalies, and simulated attack vectors to practice threat detection and incident response workflows.',
        'Documented comprehensive technical case studies detailing vulnerability assessments, network hardening, and security mitigation strategies.',
      ],
    },
    {
      period: 'Dec 2017 — Dec 2020',
      role: 'IT Support Specialist',
      company: 'GT Computers and Communications',
      type: 'Part-time',
      description: [
        'Provided comprehensive technical support, diagnostic troubleshooting, and preventive maintenance for client computers and peripheral devices.',
        'Configured operating systems, established local network connections, and assisted customers with hardware upgrades and software deployment.',
        'Ensured optimal system performance and data integrity by implementing systematic backup and endpoint troubleshooting procedures.',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— CAREER TIMELINE</span>
        <h1 className="text-3xl font-bold text-white tracking-tight">experience_history//</h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          A track record of leadership in IT infrastructure management, technical support, systems troubleshooting, and practical cybersecurity defense.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-[#111622] border border-gray-800 rounded-xl p-6 sm:p-8 space-y-4 hover:border-gray-700 transition-all shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-xs font-mono text-blue-400 mt-0.5">
                  {exp.company} <span className="text-gray-500">({exp.type})</span>
                </p>
              </div>
              <span className="text-xs font-mono bg-gray-800/60 text-gray-300 border border-gray-700/50 px-3 py-1 rounded-full w-fit">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
              {exp.description.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-blue-400 font-mono mt-0.5">▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}