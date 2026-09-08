'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function AddProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'SOC & Monitoring',
    completion_date: '',
    short_description: '',
    overview: '',
    objective: '',
    methodology: '',
    testing: '',
    results: '',
    challenges: '',
    lessons_learned: '',
    github_url: '',
    status: 'published',
    featured: false,
  });

  function handleTitleChange(val: string) {
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData({ ...formData, title: val, slug: generatedSlug });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    let uploadedPdfUrl = '';

    if (pdfFile) {
      const fileName = `${formData.slug}-${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(`case-studies/${fileName}`, pdfFile);

      if (uploadError) {
        alert(`PDF upload failed: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }

      const { data } = supabase.storage
        .from('project-files')
        .getPublicUrl(`case-studies/${fileName}`);
      uploadedPdfUrl = data.publicUrl;
    }

    const { error } = await supabase.from('projects').insert([
      {
        ...formData,
        pdf_url: uploadedPdfUrl || null,
      },
    ]);

    if (error) {
      alert(`Error inserting project: ${error.message}`);
    } else {
      router.push('/admin');
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="border-b border-gray-800 pb-6">
        <Link href="/admin" className="text-xs font-mono text-gray-500 hover:text-gray-300">
          ← Back to Admin
        </Link>
        <h1 className="text-2xl font-bold text-white mt-1">Add New Technical Case Study</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs text-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono text-gray-400">PROJECT TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-gray-400">URL SLUG *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono text-gray-400">CATEGORY *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
            >
              <option value="SOC & Monitoring">SOC & Monitoring</option>
              <option value="Cloud Security">Cloud Security</option>
              <option value="Network Security">Network Security</option>
              <option value="Systems Security">Systems Security</option>
              <option value="Security Architecture">Security Architecture</option>
              <option value="Digital Forensics">Digital Forensics</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-gray-400">COMPLETION DATE (e.g., Sep 2026) *</label>
            <input
              type="text"
              required
              value={formData.completion_date}
              onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
              className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-gray-400">SHORT DESCRIPTION (CARD SUMMARY) *</label>
          <textarea
            required
            rows={2}
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
          />
        </div>

        <div className="space-y-1.5 border-t border-gray-800 pt-6">
          <label className="font-mono text-blue-400 font-bold">UPLOAD PDF CASE STUDY</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
            className="w-full text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white"
          />
        </div>

        <div className="border-t border-gray-800 pt-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Full Case Study Details (Optional)</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-gray-400">OVERVIEW</label>
              <textarea
                rows={3}
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-gray-400">OBJECTIVE</label>
              <textarea
                rows={3}
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-gray-400">ARCHITECTURE & METHODOLOGY</label>
            <textarea
              rows={3}
              value={formData.methodology}
              onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
              className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-gray-400">TESTING & VALIDATION</label>
              <textarea
                rows={3}
                value={formData.testing}
                onChange={(e) => setFormData({ ...formData, testing: e.target.value })}
                className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-gray-400">RESULTS & OUTCOMES</label>
              <textarea
                rows={3}
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                className="w-full bg-[#111622] border border-gray-800 rounded-lg p-3 text-white"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {submitting ? 'Uploading PDF & Saving...' : 'Save & Publish Project'}
          </button>
        </div>
      </form>
    </div>
  );
}