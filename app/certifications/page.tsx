import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export const revalidate = 0;

interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: string;
  credential_url?: string;
  issue_date?: string;
  image_url?: string;
}

async function getCertifications(): Promise<Certification[]> {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="border-b border-gray-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— CREDENTIALS & LICENSES</span>
        <h1 className="text-3xl font-bold text-white tracking-tight">certifications//</h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Industry certifications and professional training validating expertise in cybersecurity, systems administration, and IT operations.
        </p>
        <div className="pt-2">
        </div>
      </div>

      <div className="space-y-6">
        {certifications.length > 0 ? (
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111622] border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gray-700 transition-all shadow-lg"
            >
              <div className="flex items-start gap-4">
                {cert.image_url && (
                  <a href={cert.image_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-700 hover:border-blue-500 transition-colors shadow-md"
                    />
                  </a>
                )}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">{cert.issuer}</p>
                  {cert.issue_date && (
                    <p className="text-[11px] font-mono text-gray-500">Issued: {cert.issue_date}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-800">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono ${
                    cert.status === 'Completed'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                  }`}
                >
                  {cert.status}
                </span>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#111622] border border-gray-800 rounded-xl space-y-3">
            <p className="text-sm font-mono text-gray-400">No certifications added yet.</p>
            <p className="text-xs text-gray-500">
              Go to <Link href="/admin/certifications" className="text-blue-400 underline">Admin Certifications</Link> to upload your certificate!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}