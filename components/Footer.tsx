import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0b0e14] text-gray-400 text-xs py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Bio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-[10px]">
              ISU
            </span>
            <span className="font-bold text-white tracking-wider">IFESINACHI S. UDEKWE</span>
          </div>
          <p className="text-gray-500 max-w-xs leading-relaxed">
            Aspiring Cybersecurity Analyst — IT Support, Systems, SOC & Incident Response.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <p className="font-mono text-gray-300 uppercase tracking-wider text-[11px]">Navigate</p>
          <ul className="space-y-1.5">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link href="/skills" className="hover:text-white transition-colors">Skills</Link></li>
            <li><Link href="/experience" className="hover:text-white transition-colors">Experience</Link></li>
            <li><Link href="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Connect / Social Links */}
        <div className="space-y-2">
          <p className="font-mono text-gray-300 uppercase tracking-wider text-[11px]">Connect</p>
          <ul className="space-y-1.5">
            <li>
              <a 
                href="mailto:udekwesundayifesinachi@gmail.com" 
                className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <span>✉ Email</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/in/udekwe-sunday-ifesinachi-54b035376" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <span>in LinkedIn ↗</span>
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/your-github-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <span>⚙ GitHub ↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px]">
        <p>© {new Date().getFullYear()} Ifesinachi Sunday Udekwe. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 font-mono">Built with a focus on security, clarity, and continuous learning.</p>
      </div>
    </footer>
  );
}