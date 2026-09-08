'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  completion_date: string;
  created_at: string;
}

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Dashboard states
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, slug, category, status, featured, completion_date, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update project status');
    } else {
      fetchProjects();
    }
  }

  async function toggleFeatured(id: string, currentFeatured: boolean) {
    const { error } = await supabase
      .from('projects')
      .update({ featured: !currentFeatured })
      .eq('id', id);

    if (error) {
      alert('Failed to update featured status');
    } else {
      fetchProjects();
    }
  }

  async function deleteProject(id: string, title: string) {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        alert('Failed to delete project');
      } else {
        fetchProjects();
      }
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials
    const validUser = "usicyber1280";
    const validPass = "Engineer5050@@$";

    if (username === validUser && password === validPass) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // 1. Password Protection Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#12161f] p-8 rounded-xl border border-gray-800 w-full max-w-md space-y-4 shadow-2xl">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— SECURITY GATE</span>
          <h1 className="text-xl font-bold font-mono text-white mt-1">IAM</h1>
          {authError && <p className="text-rose-500 text-sm font-mono">Invalid username or password.</p>}
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors text-xs font-mono uppercase tracking-wider">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  const publishedCount = projects.filter((p) => p.status === 'published').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  // 2. Main Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— ADMIN PANEL</span>
          <h1 className="text-3xl font-bold text-white mt-1">Project Management</h1>
        </div>
        <Link
          href="/admin/add-project"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 w-fit"
        >
          <span>+</span> Add New Project
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#111622] border border-gray-800 p-5 rounded-xl">
          <p className="text-xs text-gray-500 font-mono">TOTAL PROJECTS</p>
          <p className="text-2xl font-bold text-white mt-1">{projects.length}</p>
        </div>
        <div className="bg-[#111622] border border-gray-800 p-5 rounded-xl">
          <p className="text-xs text-gray-500 font-mono">PUBLISHED</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
        </div>
        <div className="bg-[#111622] border border-gray-800 p-5 rounded-xl">
          <p className="text-xs text-gray-500 font-mono">DRAFTS</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</p>
        </div>
        <div className="bg-[#111622] border border-gray-800 p-5 rounded-xl">
          <p className="text-xs text-gray-500 font-mono">FEATURED</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{featuredCount}</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#111622] border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-500 font-mono">
            Loading projects from Supabase...
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400 font-mono">
                  <th className="p-4">TITLE</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">FEATURED</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-300">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-medium text-white max-w-xs truncate">
                      {project.title}
                    </td>
                    <td className="p-4 text-gray-400">{project.category}</td>
                    <td className="p-4 font-mono text-gray-500">{project.completion_date}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(project.id, project.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                          project.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                        }`}
                      >
                        {project.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleFeatured(project.id, project.featured)}
                        className={`text-sm ${
                          project.featured ? 'text-amber-400' : 'text-gray-600 hover:text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/edit-project/${project.id}`}
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        Preview
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id, project.title)}
                        className="text-rose-400 hover:text-rose-300 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-gray-500">
            No projects found in database. Click &quot;Add New Project&quot; above to create one.
          </div>
        )}
      </div>
    </div>
  );
}