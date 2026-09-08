import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0; // Disable cache so new uploads show instantly

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  completion_date: string;
  featured: boolean;
}

async function getPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public projects:', error);
    return [];
  }

  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-gray-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
          — PORTFOLIO ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Technical Projects & Case Studies
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Explore hands-on cybersecurity projects, infrastructure labs, and automated defense workflows.
        </p>
      </div>

      {/* Projects Grid */}
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
                  {project.featured && (
                    <span className="text-xs text-amber-400 font-mono">★ Featured</span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {project.title}
                </h2>

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
        <div className="text-center py-20 bg-[#111622] border border-gray-800 rounded-xl space-y-3">
          <p className="text-sm font-mono text-gray-400">No published projects found.</p>
          <p className="text-xs text-gray-500">
            Head over to your admin panel to add and publish a project!
          </p>
        </div>
      )}
    </div>
  );
}