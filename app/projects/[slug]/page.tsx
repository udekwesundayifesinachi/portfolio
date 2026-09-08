import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0;

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  completion_date: string;
  short_description: string;
  overview?: string;
  objective?: string;
  methodology?: string;
  testing?: string;
  results?: string;
  challenges?: string;
  lessons_learned?: string;
  github_url?: string;
  pdf_url?: string;
  status: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return data as Project;
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div>
        <Link
          href="/projects"
          className="text-xs font-mono text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          ← Back to All Projects
        </Link>
      </div>

      <header className="space-y-4 border-b border-gray-800 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-gray-400 bg-gray-800/60 border border-gray-700/50 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-xs font-mono text-gray-500">
            Completed: {project.completion_date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          {project.short_description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#111622] border border-gray-800 hover:border-gray-700 text-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
            >
              <span>💻</span> GitHub Repository ↗
            </a>
          )}

          {project.pdf_url && (
            <a
              href={project.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
            >
              <span>↓</span> Download Case Study PDF
            </a>
          )}
        </div>
      </header>

      <section className="space-y-10 text-gray-300 text-sm leading-relaxed">
        {project.overview && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono text-blue-400">
              01. Executive Overview
            </h2>
            <div className="bg-[#111622] border border-gray-800/80 p-6 rounded-xl space-y-2">
              <p className="whitespace-pre-line">{project.overview}</p>
            </div>
          </div>
        )}

        {project.objective && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono text-blue-400">
              02. Project Objective & Scope
            </h2>
            <div className="bg-[#111622] border border-gray-800/80 p-6 rounded-xl space-y-2">
              <p className="whitespace-pre-line">{project.objective}</p>
            </div>
          </div>
        )}

        {project.methodology && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono text-blue-400">
              03. Architecture & Methodology
            </h2>
            <div className="bg-[#111622] border border-gray-800/80 p-6 rounded-xl space-y-2">
              <p className="whitespace-pre-line">{project.methodology}</p>
            </div>
          </div>
        )}

        {project.testing && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono text-blue-400">
              04. Testing & Validation
            </h2>
            <div className="bg-[#111622] border border-gray-800/80 p-6 rounded-xl space-y-2">
              <p className="whitespace-pre-line">{project.testing}</p>
            </div>
          </div>
        )}

        {project.results && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono text-blue-400">
              05. Key Results & Outcomes
            </h2>
            <div className="bg-[#111622] border border-gray-800/80 p-6 rounded-xl space-y-2">
              <p className="whitespace-pre-line">{project.results}</p>
            </div>
          </div>
        )}

        {(project.challenges || project.lessons_learned) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {project.challenges && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white font-mono text-amber-400">
                  Challenges Overcome
                </h3>
                <div className="bg-[#111622] border border-gray-800/80 p-5 rounded-xl text-xs leading-relaxed">
                  <p className="whitespace-pre-line">{project.challenges}</p>
                </div>
              </div>
            )}

            {project.lessons_learned && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white font-mono text-emerald-400">
                  Key Takeaways & Lessons
                </h3>
                <div className="bg-[#111622] border border-gray-800/80 p-5 rounded-xl text-xs leading-relaxed">
                  <p className="whitespace-pre-line">{project.lessons_learned}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {project.pdf_url && (
        <section className="space-y-4 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                — DOCUMENTATION ATTACHMENT
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                <span>📄</span> Full Case Study Documentation Report
              </h2>
            </div>
            <a
              href={project.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3.5 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 w-fit"
            >
              <span>↓</span> Download PDF File
            </a>
          </div>

          <div className="w-full h-[700px] bg-[#111622] border border-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
            <iframe
              src={`${project.pdf_url}#toolbar=1`}
              className="w-full h-full"
              title="PDF Document Viewer"
            />
          </div>
        </section>
      )}

      <div className="border-t border-gray-800 pt-8 flex items-center justify-between">
        <Link
          href="/projects"
          className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
        >
          ← Back to All Projects
        </Link>
        <a
          href="#"
          className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
        >
          Back to Top ↑
        </a>
      </div>
    </article>
  );
}