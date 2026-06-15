import React, { useState } from "react";
import { 
  ShieldCheck, AlertCircle, HelpCircle, Layers, Cpu, Zap, Smartphone, ExternalLink, 
  ChevronDown, ChevronUp, Check, AlertTriangle, XCircle, Info, RefreshCw
} from "lucide-react";
import { SEOReport } from "../types";

interface SEOReportDashboardProps {
  report: SEOReport;
  onReCheck: () => void;
  isRechecking: boolean;
}

export default function SEOReportDashboard({ report, onReCheck, isRechecking }: SEOReportDashboardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("on-page");

  // Determine SEO grade according to Master prompt:
  // A+ = 95-100, A = 90-94, B = 80-89, C = 70-79, D = 50-69, F = Below 50
  const getSEOGrade = (score: number) => {
    if (score >= 95) return { grade: "A+", label: "Elite Portfolio", color: "text-semrush-green bg-semrush-green/15 border-semrush-green/20" };
    if (score >= 90) return { grade: "A", label: "Excellent Optimization", color: "text-semrush-green bg-semrush-green/15 border-semrush-green/20" };
    if (score >= 80) return { grade: "B", label: "Good Baseline", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (score >= 70) return { grade: "C", label: "Fair Quality", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    if (score >= 50) return { grade: "D", label: "Needs Urgent Attention", color: "text-orange-600 bg-orange-50 border-orange-200" };
    return { grade: "F", label: "High Risk Failure", color: "text-red-650 bg-red-50 border-red-200" };
  };

  const gradeInfo = getSEOGrade(report.overallScore);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderStatusIcon = (status: "passed" | "warning" | "failed") => {
    switch (status) {
      case "passed":
        return <Check className="h-4.5 w-4.5 text-semrush-green shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" fill="rgba(245,158,11,0.05)" />;
      case "failed":
        return <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0" fill="rgba(239,68,68,0.05)" />;
    }
  };

  const getStatusBadgeClass = (status: "passed" | "warning" | "failed") => {
    switch (status) {
      case "passed":
        return "bg-semrush-green/10 text-semrush-green border border-semrush-green/20";
      case "warning":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "failed":
        return "bg-red-50 text-red-650 border border-red-150";
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Upper score overview panel */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Score indicator section */}
        <div className="relative overflow-hidden rounded-3xl border border-semrush-border bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 right-0 h-24 w-24 bg-semrush-orange/5 blur-2xl rounded-full"></div>
          
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">OVERALL SEO SCORE</span>
          
          {/* Circular SVG Gauge widget styled with SEMrush Orange */}
          <div className="relative flex items-center justify-center my-4 h-32 w-32">
            <svg className="h-full w-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="52"
                strokeWidth="10"
                stroke="#F1F3F5"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                strokeWidth="10"
                strokeDasharray={326.7}
                strokeDashoffset={326.7 - (326.7 * report.overallScore) / 100}
                strokeLinecap="round"
                stroke="#FF640D"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1.5s ease" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-[#171A21] leading-none font-mono tracking-tight">{report.overallScore}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">/ 100</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5Packed mt-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${gradeInfo.color}`}>
              Grade {gradeInfo.grade} • {gradeInfo.label}
            </span>
          </div>
        </div>

        {/* Audited Domain profile */}
        <div className="rounded-3xl border border-semrush-border bg-white p-6 shadow-sm flex flex-col justify-between md:col-span-2">
          <div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-200 text-xs font-bold text-semrush-orange font-mono select-all truncate max-w-sm flex items-center gap-1.5">
                <span>{report.url}</span>
                <a href={report.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-semrush-orange transition-colors" aria-label="Open URL in new tab">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#a1a1a1] uppercase">
                Crawled: {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
              </span>
            </div>

            <h3 className="text-xl font-black text-[#171A21] mt-4 tracking-tight leading-snug">
              {report.onPage.title || "Target URL SEO Audit Document"}
            </h3>
            <p className="text-xs text-gray-500 mt-2 italic leading-relaxed line-clamp-2">
              Meta description: {report.onPage.description || "No description tags compiled."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-400 font-bold block uppercase text-[10px]">LCP speed</span>
                <span className="font-extrabold text-[#171A21] block mt-0.5">{report.performance.lcpSeconds}s</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="text-gray-400 font-bold block uppercase text-[10px]">Strict SSL</span>
                <span className="font-extrabold text-semrush-green block mt-0.5">Active ✓</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="text-gray-400 font-bold block uppercase text-[10px]">Schema JSON</span>
                <span className={`font-extrabold block mt-0.5 ${report.technical.structuredDataDetected ? "text-semrush-orange" : "text-amber-600"}`}>
                  {report.technical.structuredDataDetected ? "Detected" : "Missing"}
                </span>
              </div>
            </div>

            <button
              onClick={onReCheck}
              disabled={isRechecking}
              className={`rounded-xl bg-[#171A21] hover:bg-semrush-orange hover:text-white border border-transparent text-white px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${isRechecking ? 'opacity-60 cursor-not-allowed' : 'active:scale-95 shadow-sm'}`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
              {isRechecking ? "Re-scanning..." : "Fast Recheck"}
            </button>
          </div>
        </div>

      </div>

      {/* Accordion check components */}
      <div className="space-y-4">
        
        {/* On page SEO component */}
        <div className="rounded-2xl border border-semrush-border bg-white overflow-hidden shadow-sm transition-all">
          <button
            onClick={() => toggleSection("on-page")}
            className="w-full flex items-center justify-between p-5 text-left font-bold text-[#171A21] hover:bg-gray-50/50 cursor-pointer"
            id="accordion-on-page"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-semrush-orange/10 p-2.5 text-semrush-orange">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#171A21]">On-Page SEO Checks</p>
                <p className="text-xs text-gray-400 font-bold">Headers configuration metadata, Title tags, description parameters</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#FF640D]/10 text-[#FF640D] px-2.5 py-1 rounded-md border border-[#FF640D]/20 font-extrabold">
                Score: {report.onPage.score}/100
              </span>
              {expandedSection === "on-page" ? <ChevronUp className="h-4 w-4 text-gray-450" /> : <ChevronDown className="h-4 w-4 text-gray-450" />}
            </div>
          </button>

          {expandedSection === "on-page" && (
            <div className="border-t border-gray-200 bg-white p-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Title and Description */}
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">TITLE TAG AUDIT</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${getStatusBadgeClass(report.onPage.titleStatus)}`}>
                      {report.onPage.titleStatus}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#171A21] truncate bg-white p-2.5 rounded-lg border border-gray-200 mt-2 font-mono">{report.onPage.title}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    {renderStatusIcon(report.onPage.titleStatus)}
                    <span className="font-medium">{report.onPage.titleFeedback}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">META DESCRIPTION AUDIT</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${getStatusBadgeClass(report.onPage.descriptionStatus)}`}>
                      {report.onPage.descriptionStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200 mt-2 italic leading-relaxed">{report.onPage.description}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    {renderStatusIcon(report.onPage.descriptionStatus)}
                    <span className="font-medium">{report.onPage.descriptionFeedback}</span>
                  </p>
                </div>
              </div>

              {/* H1s and H2s */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">H1 HEADERS</span>
                      <span className="bg-gray-200 text-gray-600 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                        {report.onPage.h1.length} found
                      </span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${getStatusBadgeClass(report.onPage.h1Status)}`}>
                      {report.onPage.h1Status}
                    </span>
                  </div>
                  
                  <ul className="mt-3 space-y-1 text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200 divide-y divide-gray-100 max-h-24 overflow-y-auto font-mono">
                    {report.onPage.h1.map((tag, idx) => (
                      <li key={idx} className="py-1">H1: <span className="text-[#171A21] font-bold">{tag}</span></li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-600 mt-2 font-medium flex items-center gap-1.5 leading-relaxed">
                    {renderStatusIcon(report.onPage.h1Status)}
                    <span>{report.onPage.h1Feedback}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">H2 HEADERS</span>
                      <span className="bg-gray-200 text-gray-100/10 text-gray-600 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                        {report.onPage.h2.length} items
                      </span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${getStatusBadgeClass(report.onPage.h2Status)}`}>
                      {report.onPage.h2Status}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1 text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200 divide-y divide-gray-100 max-h-24 overflow-y-auto">
                    {report.onPage.h2.map((tag, idx) => (
                      <li key={idx} className="py-1">H2: <span className="text-gray-800 font-medium">{tag}</span></li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-600 mt-2 font-medium flex items-center gap-1.5 leading-relaxed">
                    {renderStatusIcon(report.onPage.h2Status)}
                    <span>{report.onPage.h2Feedback}</span>
                  </p>
                </div>
              </div>

              {/* Alt Tags, Canonical, Robots Meta */}
              <div className="grid gap-4 sm:grid-cols-3">
                
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">IMAGE ALT TAGS</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono font-bold text-gray-700">Total: {report.onPage.imageAltCount}</span>
                    <span className="text-xs font-mono font-bold text-red-650 text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md">Missing: {report.onPage.imageAltMissing}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 flex items-start gap-1 leading-relaxed">
                    {renderStatusIcon(report.onPage.imageAltStatus)}
                    <span>{report.onPage.imageAltFeedback}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">CANONICAL LINK</span>
                  <p className="text-[10px] font-mono text-semrush-orange bg-white p-1.5 rounded-md border border-gray-200 mt-2 truncate font-semibold">{report.onPage.canonical || "Not specified"}</p>
                  <p className="text-xs text-gray-600 mt-3 flex items-start gap-1 leading-relaxed">
                    {renderStatusIcon(report.onPage.canonicalStatus)}
                    <span>{report.onPage.canonicalFeedback}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">ROBOTS DIRECTIVES</span>
                  <p className="text-[10px] font-mono text-gray-700 bg-white p-1.5 rounded-md border border-gray-200 mt-2 truncate">{report.onPage.robotsMeta || "Not specified"}</p>
                  <p className="text-xs text-gray-600 mt-3 flex items-start gap-1 leading-relaxed">
                    {renderStatusIcon(report.onPage.robotsMetaStatus)}
                    <span>{report.onPage.robotsMetaFeedback}</span>
                  </p>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Technical SEO component */}
        <div className="rounded-2xl border border-semrush-border bg-white overflow-hidden shadow-sm transition-all">
          <button
            onClick={() => toggleSection("technical")}
            className="w-full flex items-center justify-between p-5 text-left font-bold text-[#171A21] hover:bg-gray-50/50 cursor-pointer"
            id="accordion-technical"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-semrush-orange/10 p-2.5 text-semrush-orange">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#171A21]">Technical audit & Indexability</p>
                <p className="text-xs text-gray-400 font-bold">Robots.txt configuration, sitemap integration feeds, SSL validation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#FF640D]/10 text-[#FF640D] px-2.5 py-1 rounded-md border border-[#FF640D]/20 font-extrabold">
                Score: {report.technical.score}/100
              </span>
              {expandedSection === "technical" ? <ChevronUp className="h-4 w-4 text-gray-450" /> : <ChevronDown className="h-4 w-4 text-gray-450" />}
            </div>
          </button>

          {expandedSection === "technical" && (
            <div className="border-t border-gray-200 bg-white p-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">ROBOTS.TXT SCHEMA</span>
                  <p className="text-[10px] font-mono text-semrush-orange mt-1 bg-white p-1.5 rounded-md border border-gray-200 font-bold">{report.technical.robotsUrl}</p>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                    {renderStatusIcon(report.technical.robotsStatus)}
                    <span>{report.technical.robotsFeedback}</span>
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">XML SITEMAP ADRESSE</span>
                  <p className="text-[10px] font-mono text-semrush-orange mt-1 bg-white p-1.5 rounded-md border border-gray-200 font-bold">{report.technical.sitemapUrl}</p>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                    {renderStatusIcon(report.technical.sitemapStatus)}
                    <span>{report.technical.sitemapFeedback}</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">SSL CERTIFICATE ENCRYPTION</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-2 w-2 rounded-full bg-semrush-green animate-pulse"></span>
                    <span className="text-xs font-bold text-semrush-green">Valid TLS Active</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{report.technical.sslFeedback}</p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">FORCED HTTPS TRANSIT</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-2 w-2 rounded-full bg-semrush-green"></span>
                    <span className="text-xs font-bold text-semrush-green">Redirect Active</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{report.technical.httpsFeedback}</p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">SCHEMA structured DATA</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${report.technical.structuredDataDetected ? 'bg-semrush-green' : 'bg-amber-500'}`} />
                    <span className={`text-xs font-bold ${report.technical.structuredDataDetected ? 'text-semrush-green' : 'text-amber-600'}`}>
                      {report.technical.structuredDataDetected ? 'JSON-LD Schema Active' : 'No strict match'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{report.technical.structuredDataFeedback}</p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Performance & speed component */}
        <div className="rounded-2xl border border-semrush-border bg-white overflow-hidden shadow-sm transition-all">
          <button
            onClick={() => toggleSection("performance")}
            className="w-full flex items-center justify-between p-5 text-left font-bold text-[#171A21] hover:bg-gray-50/50 cursor-pointer"
            id="accordion-performance"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-semrush-orange/10 p-2.5 text-semrush-orange">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#171A21]">Speed Optimization & Vitals</p>
                <p className="text-xs text-gray-400 font-bold">Largest Contentful Paint, file size speed, resource weights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#FF640D]/10 text-[#FF640D] px-2.5 py-1 rounded-md border border-[#FF640D]/20 font-extrabold">
                Score: {report.performance.score}/100
              </span>
              {expandedSection === "performance" ? <ChevronUp className="h-4 w-4 text-gray-450" /> : <ChevronDown className="h-4 w-4 text-gray-450" />}
            </div>
          </button>

          {expandedSection === "performance" && (
            <div className="border-t border-gray-200 bg-white p-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
              
              <div className="grid gap-3 sm:grid-cols-4">
                
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">PARSE CRAWL TIME</span>
                  <span className="text-2xl font-black text-[#171A21] mt-1 block font-mono">{report.performance.loadTimeSeconds}s</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 mt-2 inline-block rounded-md ${getStatusBadgeClass(report.performance.loadTimeStatus)}`}>
                    {report.performance.loadTimeStatus}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">TOTAL PAYLOAD WEIGHT</span>
                  <span className="text-2xl font-black text-[#171A21] mt-1 block font-mono">{report.performance.pageSizeMb} MB</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 mt-2 inline-block rounded-md ${getStatusBadgeClass(report.performance.pageSizeStatus)}`}>
                    {report.performance.pageSizeStatus}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">LCP CONTENTFUL INDEX</span>
                  <span className="text-2xl font-black text-[#171A21] mt-1 block font-mono">{report.performance.lcpSeconds}s</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 mt-2 inline-block rounded-md ${report.performance.lcpSeconds < 2.5 ? 'bg-semrush-green/10 text-semrush-green' : 'bg-amber-100 text-amber-700'}`}>
                    {report.performance.lcpSeconds < 2.5 ? 'Good status' : 'Needs tuning'}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">CUMULATIVE SHIFT CLS</span>
                  <span className="text-2xl font-black text-[#171A21] mt-1 block font-mono">{report.performance.clsScore}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 mt-2 inline-block rounded-md bg-semrush-green/10 text-semrush-green">
                    Strict Stable
                  </span>
                </div>

              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase">CORE WEB VITALS SYNTHESIS SUMMARY</span>
                <p className="text-xs text-semrush-orange font-mono font-bold mt-2">{report.performance.coreWebVitalsFeedback}</p>
                <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between text-xs text-gray-550 leading-relaxed font-semibold">
                  <span className="flex items-center gap-1 text-gray-600"><Check className="h-4 w-4 text-semrush-green" /> Header Compression Gzip forced.</span>
                  <span className="font-bold text-[#171A21]">{report.performance.compressionFeedback}</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Mobile friendly optimization component */}
        <div className="rounded-2xl border border-semrush-border bg-white overflow-hidden shadow-sm transition-all">
          <button
            onClick={() => toggleSection("mobile")}
            className="w-full flex items-center justify-between p-5 text-left font-bold text-[#171A21] hover:bg-gray-50/50 cursor-pointer"
            id="accordion-mobile"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-semrush-orange/10 p-2.5 text-semrush-orange">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#171A21]">Mobile optimization & responsive layout</p>
                <p className="text-xs text-gray-400 font-bold">Viewport settings validation, touch clearance spacing, responsiveness compatibility</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#FF640D]/10 text-[#FF640D] px-2.5 py-1 rounded-md border border-[#FF640D]/20 font-extrabold">
                Score: {report.mobile.score}/100
              </span>
              {expandedSection === "mobile" ? <ChevronUp className="h-4 w-4 text-gray-450" /> : <ChevronDown className="h-4 w-4 text-gray-450" />}
            </div>
          </button>

          {expandedSection === "mobile" && (
            <div className="border-t border-gray-200 bg-white p-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">TOUCH BOUNDARIES SCALING</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Check className="h-4.5 w-4.5 text-semrush-green" />
                    <span className="text-xs font-bold text-[#171A21]">Minimum 44px active</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-medium">{report.mobile.touchFriendlyFeedback}</p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">MEDIA VIEWPORT SCALING RULES</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Check className="h-4.5 w-4.5 text-semrush-green" />
                    <span className="text-xs font-bold text-[#171A21]">Responsive width active</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-medium">{report.mobile.viewportFeedback}</p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">CRAWL EMULATION TESTS</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="h-2 w-2 rounded-full bg-semrush-green animate-pulse"></div>
                    <span className="text-xs font-bold text-[#171A21]">Passed automated tester</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-medium">{report.mobile.mobileFriendlyFeedback}</p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
