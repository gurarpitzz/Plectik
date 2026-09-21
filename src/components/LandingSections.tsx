import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { ResearchPortfolioTable } from './ResearchPortfolioTable';
import { RequestAccessForm } from './RequestAccessForm';
import { CORE_DOMAINS } from '../data/researchPortfolio';

interface LandingSectionsProps {
  onScrollToTop: () => void;
  onTriggerPulse: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onScrollToTop,
  onTriggerPulse,
}) => {
  return (
    <div className="relative z-20 bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* ------------------------------------------------------------- */}
      {/* PRE-SECTION: FOUNDATIONAL MANIFESTO & THE DISCOVERY PROBLEM   */}
      {/* ------------------------------------------------------------- */}
      <section id="manifesto" className="relative border-t border-white/[0.1] px-6 sm:px-12 lg:px-20 py-24 sm:py-36 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
        {/* Abstract Liquid Glass backdrop glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/[0.025] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>THE DISCOVERY FRONTIER</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-white font-['Syne'] leading-[1.05]">
              The most difficult problems in science are often not problems of computation.
            </h2>

            <div className="text-2xl sm:text-4xl font-['Space_Grotesk'] font-medium text-neutral-200 tracking-tight">
              They are problems of discovery.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08]">
                <span className="font-mono text-xs text-neutral-500 uppercase">Capability 01</span>
                <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1">We can simulate.</div>
                <p className="text-xs text-neutral-400 mt-2 font-light">
                  Executing trillions of floating-point steps across known equations.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08]">
                <span className="font-mono text-xs text-neutral-500 uppercase">Capability 02</span>
                <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1">We can predict.</div>
                <p className="text-xs text-neutral-400 mt-2 font-light">
                  Fitting high-dimensional statistical surfaces over known historical observations.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08]">
                <span className="font-mono text-xs text-neutral-500 uppercase">Capability 03</span>
                <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1">We can optimize.</div>
                <p className="text-xs text-neutral-400 mt-2 font-light">
                  Traversing complex parameter landscapes to find local or global extrema.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl liquid-glass border border-white/[0.12] space-y-4">
              <div className="text-xl sm:text-2xl font-['Syne'] font-bold text-white">
                But what happens when the underlying mathematical structure itself is unknown?
              </div>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                PLECTIK is being developed for that problem. A new class of scientific technology designed to explore mathematical possibilities and uncover structures that can be investigated, tested and transformed into new scientific and technological capabilities.
              </p>
              <div className="pt-2 flex items-center gap-3 font-mono text-xs tracking-widest text-neutral-400 uppercase">
                <span className="w-2 h-2 rounded-[2px] bg-white" />
                <span>ONE TECHNOLOGY. INFINITE DISCOVERY.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 01 // THE PARADIGM SHIFT                                      */}
      {/* ------------------------------------------------------------- */}
      <section id="paradigm" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-black">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>01 // The Paradigm Shift</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              We don't just compute with what we know. <br className="hidden sm:inline" />
              <span className="text-neutral-400">We search for what we don't.</span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
              Modern computation has become extraordinarily good at learning patterns from existing information. But scientific progress often begins before the model exists.
            </p>
          </div>

          {/* Abstract liquid glass cards: The 4 'Befores' */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Before the equation', desc: 'No algebraic formulation has been written.' },
              { label: 'Before the mechanism', desc: 'The dynamical driver is unobserved.' },
              { label: 'Before the representation', desc: 'Coordinates and phase spaces are undefined.' },
              { label: 'Before the answer is known', desc: 'No predetermined template or target exists.' },
            ].map((b, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 border border-white/[0.08] space-y-2">
                <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Stage 0{i + 1}</div>
                <div className="font-['Space_Grotesk'] font-bold text-white text-base sm:text-lg">{b.label}.</div>
                <div className="text-xs text-neutral-400 font-light">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Interactive Paradigm Shift Visual Glass Card */}
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 border border-white/[0.12] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                The Foundational Transition
              </span>
              <div className="text-3xl sm:text-4xl font-['Syne'] font-extrabold text-white">
                From prediction. <br />
                To discovery.
              </div>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Instead of beginning with a predetermined answer, PLECTIK explores the possibility that the mathematical structure itself can be autonomously discovered and rigorously tested against reality.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">Conventional Machine Learning</div>
                  <div className="font-['Space_Grotesk'] font-semibold text-neutral-300 text-sm mt-0.5">Input Data → Statistical Curve Fit → Prediction</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-[10px] font-mono text-neutral-400">Black Box</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/[0.2] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] flex items-center justify-between">
                <div>
                  <div className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">PLECTIK Scientific Discovery</div>
                  <div className="font-['Space_Grotesk'] font-bold text-white text-sm mt-0.5">Observation → Mathematical Law → Validated Structure</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">Interpretable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 02 // A NEW KIND OF SCIENTIFIC TECHNOLOGY                     */}
      {/* ------------------------------------------------------------- */}
      <section id="technology" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-[#040406]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>02 // A New Kind of Scientific Technology</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              Built for the unknown.
            </h2>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
              PLECTIK is not positioned as another general-purpose AI model. It is not simply a simulation platform. It is not another conventional symbolic mathematics package. PLECTIK is being developed as a scientific discovery technology—investigating problems where the useful mathematical structure is not completely known in advance.
            </p>
          </div>

          {/* The 8 Domains Grid with Apple-like Glass Aesthetic */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              Developing Across 8 Strategic Disciplines
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'PHYSICS', desc: 'Equations of nature and spacetime' },
                { name: 'MATHEMATICS', desc: 'Operators, logic, and spectral gaps' },
                { name: 'MOLECULAR SCIENCE', desc: 'Conformation and chemical dynamics' },
                { name: 'BIOLOGY', desc: 'Protein folding and living systems' },
                { name: 'ARTIFICIAL INTELLIGENCE', desc: 'Mathematical reasoning & laws' },
                { name: 'ENGINEERING', desc: 'Controllers, optimization & design' },
                { name: 'ACCESSIBILITY', desc: 'Temporal tactile signal synthesis' },
                { name: 'CYBERSECURITY', desc: 'Adaptive deceptive intelligence' },
              ].map((domain, idx) => (
                <div
                  key={idx}
                  className="liquid-glass liquid-glass-hover rounded-2xl p-6 border border-white/[0.09] space-y-2 group"
                >
                  <div className="font-mono text-[10px] text-neutral-500 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="font-['Space_Grotesk'] font-bold text-white text-sm sm:text-base tracking-tight">
                    {domain.name}
                  </div>
                  <div className="text-xs text-neutral-400 font-light">
                    {domain.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs font-mono text-neutral-500 pt-1">
              and other domains where discovering structure can create new possibilities.
            </div>
          </div>

          {/* Proprietary Technology Capsule */}
          <div className="p-8 sm:p-10 rounded-3xl liquid-glass border border-white/[0.14] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-300 uppercase tracking-widest">
                <Lock className="w-4 h-4" />
                <span>Proprietary Technology</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Syne'] font-bold text-white">
                We show the result. Not the recipe.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                The underlying technology is currently undergoing intellectual-property protection. For that reason, PLECTIK intentionally does not publicly disclose the complete technical architecture or protected implementation details.
              </p>
            </div>
            <div className="liquid-glass-pill px-5 py-3 rounded-2xl border border-white/20 text-center font-mono text-xs text-neutral-300 whitespace-nowrap">
              IP PENDING · CONFIDENTIAL CORE
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 03 // THE IDEA                                                */}
      {/* ------------------------------------------------------------- */}
      <section id="the-idea" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-black">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>03 // The Idea</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              What if machines could participate in discovering the laws?
            </h2>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
              A scientific problem begins with an observation. Something happens. Something doesn't make sense. A simulation produces unexpected behavior. An experiment exposes a relationship. A mathematical structure appears incomplete. A conventional model reaches its limits.
            </p>
          </div>

          {/* The Traditional Response vs The PLECTIK Possibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl liquid-glass border border-white/[0.08] space-y-4">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                The Traditional Response
              </span>
              <div className="text-2xl font-['Space_Grotesk'] font-bold text-neutral-300">
                Formulate another approximate model.
              </div>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Add more parameters, scale up compute, fit larger neural weights, or invent heuristic corrections that obscure the true governing dynamics.
              </p>
            </div>

            <div className="p-8 rounded-3xl liquid-glass border border-white/[0.16] space-y-4 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                The PLECTIK Exploration
              </span>
              <div className="text-2xl font-['Space_Grotesk'] font-bold text-white">
                Search for the structure itself.
              </div>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                The system is designed to assist researchers in exploring mathematical spaces that would otherwise be virtually impossible to search manually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 04 // THE DISCOVERY PRINCIPLE                                 */}
      {/* ------------------------------------------------------------- */}
      <section id="principle" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-[#030304]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>04 // The Discovery Principle</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              Discover. Test. Challenge. Refine. <br />
              <span className="text-neutral-400">Discover again.</span>
            </h2>

            <div className="p-6 rounded-2xl liquid-glass border border-white/[0.12] text-lg sm:text-xl font-['Space_Grotesk'] text-white">
              "A candidate explanation is not valuable merely because it fits. <br />
              <span className="text-emerald-400">It becomes interesting when it survives serious attempts to disprove it.</span>"
            </div>
          </div>

          {/* The 7 Rigorous Validation Criteria */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              Seven Pillars of Falsification & Validation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { title: 'Interpretability', tag: 'Clear meaning' },
                { title: 'Mathematical Structure', tag: 'Explicit laws' },
                { title: 'Physical Consistency', tag: 'Conservation rules' },
                { title: 'Computational Validation', tag: 'Numerical rigor' },
                { title: 'Held-Out Testing', tag: 'Unseen samples' },
                { title: 'Cross-Regime', tag: 'Boundary shifts' },
                { title: 'Falsification', tag: 'Popperian tests' },
              ].map((p, i) => (
                <div key={i} className="liquid-glass rounded-xl p-4 border border-white/[0.08] text-center space-y-1">
                  <div className="font-mono text-[9px] text-neutral-500 uppercase">0{i + 1}</div>
                  <div className="font-['Space_Grotesk'] font-bold text-white text-xs sm:text-sm">{p.title}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{p.tag}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-neutral-400 font-light max-w-3xl leading-relaxed">
            The molecular-dynamics program, for example, progressed through representation discovery, dynamical-model comparison, structural testing and later blind validation rather than simply fitting one model to one dataset.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 05 // RESEARCH PORTFOLIO (17 INVESTIGATIONS)                  */}
      {/* ------------------------------------------------------------- */}
      <section id="research" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-black">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>05 // Research Portfolio</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              17 investigations. <br />
              <span className="text-neutral-400">One scientific direction.</span>
            </h2>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
              PLECTIK's research portfolio spans fundamental physics, mathematics, molecular science, artificial intelligence, cybersecurity, accessibility and engineering. Each investigation explores a different scientific problem. Together, they represent a broader question: <span className="text-white font-medium">Can computation become a tool for discovering mathematical structure?</span>
            </p>
          </div>

          {/* The Interactive Liquid Glass 17-Paper Table */}
          <ResearchPortfolioTable />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 06 // SELECTED DISCOVERY: MOLECULAR DYNAMICS                  */}
      {/* ------------------------------------------------------------- */}
      <section id="selected-discovery" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-[#040406]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>06 // Selected Discovery</span>
            </div>

            <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              Case Study: Molecular Dynamics
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              Can complex molecular motion be reduced to a compact mathematical law?
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              Molecular dynamics produces enormous amounts of microscopic information: every atom, every interaction, every fluctuation, every trajectory. But researchers often care about something much smaller: <span className="text-white font-medium">What mathematical structure actually governs the behavior we observe?</span>
            </p>
          </div>

          {/* Technical Deep-Dive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="liquid-glass rounded-3xl p-8 border border-white/[0.1] space-y-4">
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                Target System
              </div>
              <div className="text-2xl font-['Space_Grotesk'] font-bold text-white">
                Alanine Dipeptide
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Identified a compact two-dimensional representation of conformational dynamics and investigated multiple competing dynamical descriptions.
              </p>
            </div>

            <div className="liquid-glass rounded-3xl p-8 border border-white/[0.12] space-y-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                Quantitative Accuracy
              </div>
              <div className="text-3xl sm:text-4xl font-light font-mono text-white">
                22.30 <span className="text-sm font-sans text-neutral-400">ps MFPT</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Full tensor formulation produced mean first-passage time of ~22.30 ps vs 20.69 ps reference (approximately 7.8% error in held-out validation).
              </p>
            </div>

            <div className="liquid-glass rounded-3xl p-8 border border-white/[0.1] space-y-4">
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                Extreme Generalization
              </div>
              <div className="text-2xl font-['Space_Grotesk'] font-bold text-white">
                400 K Extrapolation
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Subjected to cross-regime and blind testing including an unseen 400 K temperature extrapolation, identifying exact boundaries and terminal failure modes.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl liquid-glass border border-white/[0.1] text-center max-w-3xl mx-auto">
            <div className="text-lg sm:text-xl font-['Syne'] font-bold text-white">
              "The discovery is not simply a faster simulation. It is the attempt to identify the mathematical structure that matters."
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 07 // THE LATEST FRONTIER                                     */}
      {/* ------------------------------------------------------------- */}
      <section id="frontier" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-black">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>07 // The Latest Frontier</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              From atomistic complexity. <br />
              <span className="text-neutral-400">To mathematical structure.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              The molecular-dynamics work illustrates a larger PLECTIK objective: <span className="text-white font-medium">Find the smallest useful mathematical description of a complex system.</span> If successful, such discoveries could support critical frontiers:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'Molecular simulation',
              'Drug discovery',
              'Protein engineering',
              'Materials science',
              'Chemical design',
              'Scientific computing',
              'Simulation acceleration',
              'Inverse design',
            ].map((app, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-5 border border-white/[0.08] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-['Space_Grotesk'] text-sm font-semibold text-white">{app}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-white/[0.06] text-xs font-mono text-neutral-400 leading-relaxed">
            The current research is experimental and computational rather than a claim that this approach has already solved these applications at commercial scale. The technology is being developed toward that possibility.
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 08 // ONE TECHNOLOGY. MANY DOMAINS.                           */}
      {/* ------------------------------------------------------------- */}
      <section id="domains" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-black">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>08 // One Technology. Many Domains.</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne']">
              Universal structural synthesis.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_DOMAINS.map((cd, i) => (
              <div key={i} className="liquid-glass rounded-3xl p-8 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-500 uppercase">Domain 0{i + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                </div>
                <div className="font-['Syne'] text-xl font-bold text-white">{cd.title}</div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">{cd.desc}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cd.areas.map((a, j) => (
                    <span key={j} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-400">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 09 // THE PLECTIK ADVANTAGE                                   */}
      {/* ------------------------------------------------------------- */}
      <section id="advantage" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-[#040406]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-6 max-w-4xl">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>09 // The PLECTIK Advantage</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
              The asset is not one model. <br />
              <span className="text-neutral-400">It is a growing body of discovery.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08] space-y-2">
              <span className="font-mono text-xs text-neutral-500 uppercase">Input</span>
              <div className="font-['Space_Grotesk'] font-bold text-white text-lg">Every research problem</div>
              <div className="text-xs text-neutral-400">Contributes another rigorous experiment to the corpus.</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08] space-y-2">
              <span className="font-mono text-xs text-neutral-500 uppercase">Knowledge</span>
              <div className="font-['Space_Grotesk'] font-bold text-white text-lg">Every validated structure</div>
              <div className="text-xs text-neutral-400">Contributes verified scientific ground truth.</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08] space-y-2">
              <span className="font-mono text-xs text-neutral-500 uppercase">Precision</span>
              <div className="font-['Space_Grotesk'] font-bold text-white text-lg">Every failure</div>
              <div className="text-xs text-neutral-400">Defines an exact, reproducible operational boundary.</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border border-white/[0.08] space-y-2">
              <span className="font-mono text-xs text-neutral-500 uppercase">Scale</span>
              <div className="font-['Space_Grotesk'] font-bold text-white text-lg">Every application</div>
              <div className="text-xs text-neutral-400">Reveals an entirely new frontier domain.</div>
            </div>
          </div>

          <div className="text-center font-mono text-sm tracking-widest text-neutral-300 uppercase">
            ONE PLATFORM. MANY DISCOVERIES.
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10 // REQUEST ACCESS (INTERACTIVE FORM)                       */}
      {/* ------------------------------------------------------------- */}
      <section id="inquire" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-28 sm:py-36 bg-[#030305]">
        <RequestAccessForm />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 11 // THE FINAL STATEMENT                                     */}
      {/* ------------------------------------------------------------- */}
      <section id="final-statement" className="relative border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-32 sm:py-44 bg-black text-center overflow-hidden">
        {/* Ambient liquid glass spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.03] blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-[11px] text-neutral-300 tracking-[0.25em] uppercase mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>11 // The Final Statement</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
            The future doesn't need more models. <br />
            <span className="text-neutral-400">It needs new laws.</span>
          </h2>

          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Science has never progressed simply by processing more information. It progresses when someone discovers a new way to understand it:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-2xl mx-auto">
            {['A new equation', 'A new representation', 'A new mechanism', 'A new relationship', 'A new tool'].map((item, idx) => (
              <span key={idx} className="liquid-glass-pill px-4 py-2 rounded-full font-mono text-xs sm:text-sm text-neutral-200">
                {item}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed pt-4">
            PLECTIK is being built around that possibility. Not to tell humanity what to believe. Not to replace the scientist. But to expand the space of things that can be discovered.
          </p>

          {/* Grand PLECTIK Quad Pillar */}
          <div className="pt-8 space-y-4">
            <div className="text-5xl sm:text-7xl font-['Syne'] font-extrabold tracking-tight text-white">
              PLECTIK
            </div>
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] text-neutral-300 uppercase">
              DISCOVER · EXPLAIN · VALIDATE · TRANSFORM
            </div>
            <div className="text-sm font-['Space_Grotesk'] text-neutral-400">
              Designed to discover. What no one can program.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER                                                        */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-white/[0.08] px-6 sm:px-12 lg:px-20 py-16 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-white rounded-[2px]" />
              <span className="font-['Syne'] font-bold text-xl text-white tracking-tight">PLECTIK</span>
            </div>
            <div className="font-mono text-xs text-neutral-500">
              Scientific Discovery Technology
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-neutral-400">
            <a href="#research" className="hover:text-white transition-colors">Research</a>
            <a href="#technology" className="hover:text-white transition-colors">Technology</a>
            <a href="#domains" className="hover:text-white transition-colors">Applications</a>
            <a href="#research" className="hover:text-white transition-colors">Publications</a>
            <a href="#inquire" className="hover:text-white transition-colors">Request Access</a>
          </div>

          {/* Back to top & IP Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onScrollToTop}
              className="liquid-glass-pill px-4 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-2"
            >
              <span>Back to Centerpiece</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>© {new Date().getFullYear()} PLECTIK. All rights reserved.</div>
          <div>Proprietary technology. Intellectual-property protection in progress.</div>
        </div>
      </footer>
    </div>
  );
};
