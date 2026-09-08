import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0; // Prevent caching so updates show instantly

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  completion_date: string;
  featured: boolean;
}

async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section with Large Profile Picture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 tracking-tight">
            Ifesinachi Sunday Udekwe
          </h2>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Securing Systems. Detecting Threats.{' '}
            <span className="text-blue-500">Building Practical Experience.</span>
          </h1>
          
          <div className="space-y-1">
            <p className="text-sm font-mono text-gray-300">
              Aspiring Cybersecurity Analyst
            </p>
            <p className="text-xs font-mono text-blue-400">
              IT Support · Systems · SOC · Incident Response
            </p>
          </div>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            I am an aspiring cybersecurity professional with a strong foundation in IT support, systems administration, networking, and defensive security. I am currently gaining practical experience through my internship while continuing to build and document hands-on projects across security monitoring, network security, cloud security, Active Directory, incident response, and digital forensics.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium rounded-lg transition-colors"
            >
              Explore All Projects ↗
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#111622] border border-gray-800 hover:border-gray-700 text-gray-300 text-xs font-mono font-medium rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Extra Large Portrait Photo Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-88 sm:w-84 sm:h-[400px] lg:w-[360px] lg:h-[440px] rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-2xl bg-[#111622] group">
            <img
              src="/profile.jpg"
              alt="Ifesinachi Sunday Udekwe"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Projects Section (Powered by Supabase) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— FEATURED PROJECTS</span>
            <h3 className="text-2xl font-bold text-white mt-1">Hands-on technical work</h3>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            View All Projects ↗
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#111622] border border-gray-800 rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-gray-700 transition-all shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-gray-400 bg-gray-800/60 border border-gray-700/50 px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-amber-400 font-mono">★ Featured</span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {project.short_description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-500">{project.completion_date}</span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    View Case Study ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111622] border border-gray-800 rounded-xl space-y-3">
            <p className="text-sm font-mono text-gray-400">No featured projects found.</p>
            <p className="text-xs text-gray-500">
              Go to your admin panel and click the star icon (★) on any published project to feature it here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}