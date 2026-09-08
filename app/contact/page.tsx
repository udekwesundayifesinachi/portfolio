'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    const { error: dbError } = await supabase.from('contact_messages').insert([
      { name, email, message },
    ]);

    if (dbError) {
      setError('Failed to send message. Please try again.');
      setSubmitting(false);
    } else {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div className="border-b border-gray-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">— GET IN TOUCH</span>
        <h1 className="text-3xl font-bold text-white tracking-tight">contact_me//</h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Have a question, security inquiry, or a project in mind? Drop a message below and I'll get back to you.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-950/40 border border-emerald-800/60 p-6 rounded-xl text-center space-y-3">
          <h3 className="text-lg font-bold text-emerald-400">Message Sent Successfully!</h3>
          <p className="text-xs text-gray-300">Thank you for reaching out, {name}. I will get back to your email soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg font-mono transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#111622] border border-gray-800 p-8 rounded-xl space-y-6 shadow-xl">
          {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
          
          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="udekwesundayifesinachi@gmail.com"
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-400">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-3 text-xs text-white focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors font-mono tracking-wider uppercase"
          >
            {submitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}