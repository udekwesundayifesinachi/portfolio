'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: string;
  credential_url: string;
  issue_date: string;
  image_url: string;
}

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [status, setStatus] = useState('Completed');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  async function fetchCertifications() {
    setLoading(true);
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching certifications:', error);
    } else {
      setCertifications(data || []);
    }
    setLoading(false);
  }

  async function handleAddCertification(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !issuer) {
      alert('Please fill in both Title and Issuer.');
      return;
    }

    setSubmitting(true);
    let uploadedImageUrl = '';

    // Upload image to Supabase Storage if a file is selected
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('certifications') // Ensure you have a storage bucket named 'certifications'
        .upload(filePath, file);

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setSubmitting(false);
        return;
      }

      // Get public URL of the uploaded image
      const { data: publicURLData } = supabase.storage
        .from('certifications')
        .getPublicUrl(filePath);

      uploadedImageUrl = publicURLData.publicUrl;
    }

    const { error } = await supabase.from('certifications').insert([
      {
        title,
        issuer,
        status,
        credential_url: credentialUrl,
        issue_date: issueDate,
        image_url: uploadedImageUrl,
      },
    ]);

    if (error) {
      alert('Failed to add certification: ' + error.message);
    } else {
      setTitle('');
      setIssuer('');
      setCredentialUrl('');
      setIssueDate('');
      setFile(null);
      fetchCertifications();
    }
    setSubmitting(false);
  }

  async function deleteCertification(id: string, title: string) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) {
        alert('Failed to delete certification');
      } else {
        fetchCertifications();
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div className="flex items-center justify-between border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— ADMIN PANEL</span>
          <h1 className="text-3xl font-bold text-white mt-1">Manage Certifications</h1>
        </div>
        <Link
          href="/certifications"
          className="text-xs font-mono text-blue-400 hover:text-blue-300 underline"
        >
          View Public Page ↗
        </Link>
      </div>

      {/* Add Certification Form */}
      <form onSubmit={handleAddCertification} className="bg-[#111622] border border-gray-800 p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-bold text-white">Add New Certification with Image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Certification Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Diploma in Cyber Security"
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Issuer *</label>
            <input
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. AltSchool Africa"
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress / Target">In Progress / Target</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Issue Date / Target Date</label>
            <input
              type="text"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              placeholder="e.g. 10th July, 2026"
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Credential URL (Optional)</label>
            <input
              type="url"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Upload Certificate Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2 text-xs text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors"
        >
          {submitting ? 'Uploading & Saving...' : '+ Add Certification'}
        </button>
      </form>

      {/* Existing Certifications List */}
      <div className="bg-[#111622] border border-gray-800 rounded-xl overflow-hidden p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Your Certifications</h2>
        {loading ? (
          <p className="text-xs font-mono text-gray-500">Loading certifications...</p>
        ) : certifications.length > 0 ? (
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b0e14] border border-gray-800 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {cert.image_url && (
                    <img src={cert.image_url} alt={cert.title} className="w-12 h-12 object-cover rounded border border-gray-700" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                    <p className="text-xs text-gray-400">{cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                    {cert.status}
                  </span>
                  <button
                    onClick={() => deleteCertification(cert.id, cert.title)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs font-mono text-gray-500">No certifications found in the database.</p>
        )}
      </div>
    </div>
  );
}