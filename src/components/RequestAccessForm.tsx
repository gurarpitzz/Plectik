import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const RequestAccessForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    domain: 'Physics',
    objective: '',
    dataSimulations: '',
    impact: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const domainOptions = [
    'Physics',
    'Biology',
    'AI',
    'Mathematics',
    'Engineering',
    'Cybersecurity',
    'Accessibility',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.organization) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl liquid-glass p-8 sm:p-12 border border-white/[0.12] relative overflow-hidden shadow-2xl">
      {/* Ambient glass refraction top specular sheen */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-44 bg-white/[0.08] blur-3xl pointer-events-none rounded-full" />

      {isSubmitted ? (
        <div className="py-16 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-['Syne'] font-bold text-white">
              Institutional Evaluation Request Received
            </h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Our scientific partnerships directorate will review your discovery proposal and connect with {formData.organization} within 2 business days.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  organization: '',
                  domain: 'Physics',
                  objective: '',
                  dataSimulations: '',
                  impact: '',
                });
              }}
              className="px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-white font-mono text-xs border border-white/20 transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>20 // Request Access</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-['Syne'] font-extrabold text-white tracking-tight">
              Tell us what you're trying to discover.
            </h3>
            <p className="text-neutral-400 text-base font-light">
              We are interested in problems where the answer is not already known.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Eleanor Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                Organization / Laboratory
              </label>
              <input
                type="text"
                required
                placeholder="Max Planck Institute / MIT / BioTech R&D"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>
          </div>

          {/* Domain Picker */}
          <div className="space-y-2.5">
            <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              Scientific Domain
            </label>
            <div className="flex flex-wrap gap-2">
              {domainOptions.map((dom) => (
                <button
                  type="button"
                  key={dom}
                  onClick={() => setFormData({ ...formData, domain: dom })}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                    formData.domain === dom
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* What are you trying to discover? */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              What are you trying to discover?
            </label>
            <textarea
              rows={3}
              placeholder="Describe the scientific question, missing mathematical formulation, or unresolved dynamical relationship..."
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>

          {/* What data or simulations do you have? */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              What data or simulations do you have?
            </label>
            <textarea
              rows={2}
              placeholder="Atomistic trajectories, spectral series, physical measurements, high-dimensional manifolds..."
              value={formData.dataSimulations}
              onChange={(e) => setFormData({ ...formData, dataSimulations: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>

          {/* What would a successful discovery enable? */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              What would a successful discovery enable?
            </label>
            <textarea
              rows={2}
              placeholder="1000× simulation acceleration, novel catalytic mechanism, therapeutic molecular candidate..."
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-white text-black font-['Syne'] font-bold text-sm sm:text-base hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmitting Evaluation Dossier...</span>
              ) : (
                <>
                  <span>REQUEST ACCESS</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center font-mono text-[11px] text-neutral-500 mt-3">
              Protected under institutional nondisclosure. No proprietary data transferred over unverified channels.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
