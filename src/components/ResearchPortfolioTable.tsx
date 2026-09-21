import React, { useState } from 'react';
import { RESEARCH_PORTFOLIO, ResearchPaper } from '../data/researchPortfolio';
import { Search, Filter, ExternalLink, BookOpen, CheckCircle, Clock, Sparkles } from 'lucide-react';

export const ResearchPortfolioTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const domains = ['ALL', 'Physics', 'Biology', 'Mathematics', 'AI', 'Cybersecurity', 'Accessibility'];

  const filteredPapers = RESEARCH_PORTFOLIO.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.contribution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (paper.journal && paper.journal.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDomain =
      selectedDomain === 'ALL' ||
      paper.domain.toLowerCase().includes(selectedDomain.toLowerCase());

    return matchesSearch && matchesDomain;
  });

  const getStatusBadge = (statusType: ResearchPaper['statusType'], statusText: string) => {
    switch (statusType) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {statusText}
          </span>
        );
      case 'under-review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {statusText}
          </span>
        );
      case 'preprint':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {statusText}
          </span>
        );
      case 'in-progress':
      case 'development':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-purple-500/10 text-purple-300 border border-purple-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {statusText}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl liquid-glass">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search 17 investigations, keywords, journals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all whitespace-nowrap ${
                selectedDomain === d
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Table with Liquid Glass */}
      <div className="overflow-hidden rounded-2xl liquid-glass border border-white/[0.1]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                <th className="py-4 px-6 w-16">#</th>
                <th className="py-4 px-6 w-2/5">Research Investigation</th>
                <th className="py-4 px-6">Application / Scientific Contribution</th>
                <th className="py-4 px-6 text-right w-64">Status / Publication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs">
              {filteredPapers.map((paper) => (
                <tr
                  key={paper.id}
                  className="group hover:bg-white/[0.03] transition-colors"
                >
                  {/* Paper ID */}
                  <td className="py-5 px-6 font-mono text-neutral-500 group-hover:text-white transition-colors font-medium">
                    {paper.id}
                  </td>

                  {/* Title & Domain Tag */}
                  <td className="py-5 px-6 space-y-1.5">
                    <div className="text-white font-medium text-sm leading-snug group-hover:text-neutral-100 transition-colors">
                      {paper.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase">
                        {paper.domain}
                      </span>
                    </div>
                  </td>

                  {/* Contribution */}
                  <td className="py-5 px-6 text-neutral-300 font-light leading-relaxed">
                    {paper.contribution}
                  </td>

                  {/* Status & Journal */}
                  <td className="py-5 px-6 text-right space-y-1.5">
                    <div>{getStatusBadge(paper.statusType, paper.status)}</div>
                    {paper.journal && (
                      <div className="text-[11px] font-mono text-neutral-400 tracking-tight">
                        {paper.journal}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPapers.length === 0 && (
          <div className="py-16 text-center text-neutral-400 font-mono text-xs">
            No research investigations found matching your filter criteria.
          </div>
        )}
      </div>

      <div className="text-right text-[11px] font-mono text-neutral-500">
        The structure and portfolio entries correspond to the research tables in the supplied PLECTIK/NEXUS deck.
      </div>
    </div>
  );
};
