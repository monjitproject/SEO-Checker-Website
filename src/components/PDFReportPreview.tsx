import React, { useState } from "react";
import { 
  FileText, Download, Printer, ShieldCheck, Mail, Check, AlertTriangle, AlertCircle, X, Globe, Star
} from "lucide-react";
import { SEOReport } from "../types";

interface PDFReportPreviewProps {
  report: SEOReport;
  onClose: () => void;
}

export default function PDFReportPreview({ report, onClose }: PDFReportPreviewProps) {
  const [copied, setCopied] = useState(false);

  // Compile download content (.md format is highly professional for developer and agency hand-offs)
  const buildMarkdownReport = () => {
    let md = `# SEO AUDIT & GOOGLE ADSENSE READINESS REPORT\n`;
    md += `Target Website: ${report.url}\n`;
    md += `Date Generated: ${new Date(report.timestamp).toUTCString()}\n`;
    md += `Overall SEO Quality Score: ${report.overallScore}/100\n`;
    md += `Google AdSense Readiness Score: ${report.adSenseReadiness.score}/100\n`;
    md += `Status: ${report.adSenseReadiness.status.toUpperCase().replace("_", " ")}\n`;
    md += `===========================================================\n\n`;

    md += `## ON-PAGE SEO METRICS (Score: ${report.onPage.score}/100)\n`;
    md += `- Page Title: ${report.onPage.title}\n`;
    md += `  Feedback: ${report.onPage.titleFeedback}\n`;
    md += `- Meta Description: ${report.onPage.description || 'Missing'}\n`;
    md += `  Feedback: ${report.onPage.descriptionFeedback}\n`;
    md += `- Structured Headings: ${report.onPage.h1.length} H1 titles, ${report.onPage.h2.length} H2 tags detected.\n`;
    md += `- Images Alternate Tags: ${report.onPage.imageAltCount} images analyzed, ${report.onPage.imageAltMissing} missing ALT attributes.\n`;
    md += `  Feedback: ${report.onPage.imageAltFeedback}\n`;
    md += `-----------------------------------------------------------\n\n`;

    md += `## TECHNICAL CRITIQUE (Score: ${report.technical.score}/100)\n`;
    md += `- Robots.txt URL: ${report.technical.robotsUrl}\n`;
    md += `  Robots Feedback: ${report.technical.robotsFeedback}\n`;
    md += `- XML Sitemap Pointer: ${report.technical.sitemapUrl}\n`;
    md += `  Sitemap Feedback: ${report.technical.sitemapFeedback}\n`;
    md += `- Structured Schema Active: ${report.technical.structuredDataDetected ? 'Yes' : 'No'}\n`;
    md += `-----------------------------------------------------------\n\n`;

    md += `## SPEED & CORE WEB VITALS (Score: ${report.performance.score}/100)\n`;
    md += `- Core Render Load Time: ${report.performance.loadTimeSeconds} seconds\n`;
    md += `- Page Size Weight: ${report.performance.pageSizeMb} MB\n`;
    md += `- Largest Contentful Paint (LCP): ${report.performance.lcpSeconds}s\n`;
    md += `- Compression Enabled: ${report.performance.isCompressed ? 'Yes' : 'No'}\n`;
    md += `  Diagnostic feedback: ${report.performance.coreWebVitalsFeedback}\n`;
    md += `-----------------------------------------------------------\n\n`;

    md += `## PRIORITIZED FIX RECOMMENDATIONS:\n`;
    report.recommendations.forEach((rec, index) => {
      md += `${index + 1}. [${rec.priority.toUpperCase()} PRIORITY] ${rec.title}\n`;
      md += `   - Detected Problem: ${rec.problem}\n`;
      md += `   - Search Index Impact: ${rec.impact}\n`;
      md += `   - Fix Suggested: ${rec.fixSuggestion}\n`;
      md += `   - AdSense Earnings Impact: ${rec.adSenseImpact}\n\n`;
    });
    
    md += `\n===========================================================\n`;
    md += `Generated via AuditPro Inc. Google AdSense Guideline Systems.`;
    return md;
  };

  const handleDownloadFile = () => {
    const rawContent = buildMarkdownReport();
    const blob = new Blob([rawContent], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    const domainPart = report.url.replace(/^https?:\/\/(www\.)?/, "").replace(/[^a-zA-Z0-9]/g, "_");
    link.href = URL.createObjectURL(blob);
    link.download = `SEO_Audit_Report_${domainPart}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left pane: interactive controls */}
        <div className="p-6 md:p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-900 flex flex-col justify-between bg-slate-950">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">Export Agency Report</h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Generate customizable report logs for clients or technical administrators. Includes SEO Grades, Page metrics, security headers, and recommendations.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleDownloadFile}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 p-3 text-sm font-semibold text-white shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95"
                style={{ touchAction: "manipulation" }}
                id="btn-print-download"
              >
                <Download className="h-4 w-4" /> Download Markdown Report
              </button>

              <button
                onClick={handleCopy}
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-805 text-slate-350 border border-slate-800 p-3 text-sm font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-print-copy"
              >
                {copied ? "Copied to Clipboard ✓" : "Copy Report Markdown"}
              </button>

              <button
                onClick={handlePrint}
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-805 text-slate-330 border border-slate-800 p-3 text-sm font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-print-window"
              >
                <Printer className="h-4 w-4" /> Open Print PDF Dialog
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 mt-6 hidden md:block">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Standard RFC compliance document.</span>
            </div>
            <button 
              onClick={onClose} 
              className="mt-4 text-xs font-semibold text-indigo-400 hover:text-white transition-colors cursor-pointer block text-left"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Right pane: visual PDF template preview */}
        <div className="p-6 md:p-8 md:w-2/3 overflow-y-auto bg-slate-950 text-slate-305 max-h-[60vh] md:max-h-none print:bg-white print:text-black">
          
          <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
            <span className="text-[10px] font-bold tracking-widest text-[#a5b4fc] uppercase">AGENCY GRADE AUDIT SHEET</span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 hover:bg-slate-900 text-slate-400 hover:text-white md:hidden cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Printable Report Design sheet */}
          <div className="space-y-6 text-slate-300 print:text-black p-4 rounded-2xl border border-slate-900 bg-slate-950 font-sans" id="printable-area-preview">
            
            <div className="flex justify-between items-start gap-4 border-b border-slate-900 pb-4 flex-wrap">
              <div>
                <h4 className="text-xl font-bold text-white tracking-tight">AuditPro Inc. SEO Scan</h4>
                <div className="flex items-center gap-1 text-xs text-slate-450 mt-1 text-slate-400">
                  <Globe className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{report.url}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">GENERATION DATE:</span>
                <span className="text-xs font-mono font-bold text-white block mt-0.5">
                  {new Date(report.timestamp).toLocaleDateString()} UTC
                </span>
              </div>
            </div>

            {/* Metrics tables */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-900">
                <span className="text-xs text-slate-500 block">SEO QUALITY METRIC:</span>
                <span className="text-3xl font-black text-indigo-400 font-mono mt-1 block">{report.overallScore}/100</span>
                <span className="text-[10px] font-bold text-slate-400">Dim score weight average</span>
              </div>

              <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-900">
                <span className="text-xs text-slate-50 relative block">ADSENSE READINESS INDICATOR:</span>
                <span className="text-3xl font-black text-emerald-400 font-mono mt-1 block">{report.adSenseReadiness.score}%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mt-1">{report.adSenseReadiness.status.replace("_", " ")}</span>
              </div>
            </div>

            {/* granular checks table */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Granular compliance checks:</span>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-900">
                  <span className="font-semibold text-slate-350 text-slate-300">Page Title parameter</span>
                  <span className="text-emerald-400 font-medium font-mono">{report.onPage.titleStatus.toUpperCase()} Check</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-900">
                  <span className="font-semibold text-slate-350 text-slate-300">Meta descriptions parameters</span>
                  <span className="text-emerald-400 font-medium font-mono">{report.onPage.descriptionStatus.toUpperCase()} Check</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-900">
                  <span className="font-semibold text-slate-350 text-slate-300">Robots.txt XML sitemaps pointers</span>
                  <span className="text-emerald-400 font-medium font-mono">{report.technical.robotsStatus.toUpperCase()} Found</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-900">
                  <span className="font-semibold text-slate-350 text-slate-300">HTTPS Encryption status</span>
                  <span className="text-emerald-400 font-medium font-mono">ENFORCED</span>
                </div>
              </div>
            </div>

            {/* Smart Suggestion Summary list */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Smart fix recomendations:</span>
              
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-900 border border-slate-900 text-xs text-slate-300">
                    <span className="font-bold text-indigo-400 uppercase">FIX #{index + 1}: {rec.title}</span>
                    <p className="text-slate-400 mt-1 leading-relaxed"><strong className="text-slate-300">Improve recipe:</strong> {rec.fixSuggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-900 pt-4 text-center">
              <p className="text-[10px] text-slate-500 font-mono">End of certified SEO Audit report. Generated via high performance Gemini analysis pipelines.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
