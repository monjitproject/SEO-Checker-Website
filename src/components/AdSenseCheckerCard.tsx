import React, { useState } from "react";
import { 
  FileCheck, ShieldAlert, CheckCircle, AlertTriangle, HelpCircle, 
  ArrowRight, ShieldCheck, Star, Sparkles, BookOpen, Clock, AlertCircle
} from "lucide-react";
import { AdSenseReadinessResult } from "../types";

interface AdSenseCheckerCardProps {
  adSenseResult: AdSenseReadinessResult;
  targetUrl: string;
}

export default function AdSenseCheckerCard({ adSenseResult, targetUrl }: AdSenseCheckerCardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "guide">("overview");

  const getStatusColor = (status: "ready" | "needs_improvement" | "not_ready") => {
    switch (status) {
      case "ready":
        return { 
          badge: "bg-semrush-green/10 text-semrush-green border border-semrush-green/20", 
          text: "🟢 Ready for Submission", 
          banner: "bg-emerald-50 border-emerald-100 text-[#171A21]",
          feedback: "Your website satisfies all updated 2026 AdSense manual review requirements. High chance of approval!"
        };
      case "needs_improvement":
        return { 
          badge: "bg-amber-50 text-amber-600 border border-amber-200", 
          text: "🟡 Needs Action / Improvement", 
          banner: "bg-amber-50/50 border-amber-100 text-[#171A21]",
          feedback: "We detected minor discrepancies (e.g., missing disclosure files or layout anomalies) that will likely trigger automated reject loops."
        };
      case "not_ready":
        return { 
          badge: "bg-red-50 text-red-650 border border-red-200", 
          text: "🔴 Not Ready for AdSense", 
          banner: "bg-red-50 border-red-100 text-[#171A21]",
          feedback: "Several mandatory compliance documents are missing. Submitting now will result in immediate rejection."
        };
    }
  };

  const statusMeta = getStatusColor(adSenseResult.status);

  // Divide the checklist into legal pages vs structural features
  const legalChecks = adSenseResult.checklist.filter(item => 
    ["About Us Page", "Contact Us Page", "Privacy Policy Page", "Terms & Conditions", "Disclaimer Page"].includes(item.name) || 
    item.problem?.includes("Missing")
  );

  const designChecks = adSenseResult.checklist.filter(item => 
    !legalChecks.some(lc => lc.name === item.name)
  );

  const failedIssues = adSenseResult.checklist.filter(item => item.status === "failed" || item.status === "warning");

  return (
    <div className="rounded-3xl border border-semrush-border bg-white p-6 md:p-8 shadow-sm relative overflow-hidden text-left">
      
      {/* Decorative Top Left Spark */}
      <div className="absolute top-0 left-0 h-40 w-40 bg-semrush-orange/5 blur-3xl rounded-full"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-150 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-semrush-orange/10 text-semrush-orange font-bold">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black text-[#171A21] tracking-tight">Google AdSense Safety & Readiness Auditor</h3>
          </div>
          <p className="text-xs text-gray-500 mt-1 max-w-xl font-medium leading-relaxed">
            Automated emulator that tests physical website directories against manual reviewer criteria, CCPA parameters, sitemaps indexations, and California policy guidelines.
          </p>
        </div>

        {/* Tab Selector conforming to Semrush tab styles */}
        <div className="flex items-center gap-1 bg-gray-150 p-1 rounded-xl border border-gray-200 self-start md:self-center font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all cursor-pointer ${activeTab === "overview" ? "bg-white text-[#171A21] shadow-sm" : "text-gray-500 hover:text-[#171A21]"}`}
          >
            Readiness Index
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "issues" ? "bg-white text-[#171A21] shadow-sm" : "text-gray-500 hover:text-[#171A21]"}`}
          >
            Issues Detector 
            {failedIssues.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-semrush-orange text-[9px] font-black text-white">
                {failedIssues.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all cursor-pointer ${activeTab === "guide" ? "bg-white text-[#171A21] shadow-sm" : "text-gray-500 hover:text-[#171A21]"}`}
          >
            Compliance Tips
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Scoring Card */}
          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">APPROVAL PROBABILITY</span>
              <span className="text-5xl font-black text-semrush-orange my-3 tracking-tighter block font-mono">
                {adSenseResult.score}%
              </span>
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${statusMeta.badge}`}>
                {statusMeta.text}
              </span>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl border border-semrush-border p-6 flex flex-col justify-center">
              <span className="text-xs font-bold text-semrush-orange uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-semrush-orange" /> AdSense Manual Reviewer Assessment
              </span>
              <p className="text-sm text-[#171A21] leading-relaxed font-bold">
                {adSenseResult.overallFeedback}
              </p>
              <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed font-semibold italic">
                {statusMeta.feedback}
              </div>
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Legal compliance checklist */}
            <div className="rounded-2xl border border-gray-200 p-5 bg-white">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 border-b border-gray-150 pb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-semrush-green" /> Essential Legal Documents
              </h4>

              <div className="space-y-3">
                {legalChecks.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.status === 'passed' ? 'bg-semrush-green' : 'bg-semrush-orange animate-pulse'}`} />
                      {item.name}
                    </span>
                    <span className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded ${
                      item.status === "passed" ? "bg-semrush-green/10 text-semrush-green" : "bg-red-50 text-red-650"
                    }`}>
                      {item.status === "passed" ? "Located ✓" : "Missing ❌"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design & UX compliance Checklist */}
            <div className="rounded-2xl border border-gray-200 p-5 bg-white">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 border-b border-gray-150 pb-2 flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500 fill-amber-400" /> Structure & Content Parameters
              </h4>

              <div className="space-y-3">
                {designChecks.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-xs font-bold text-gray-700">
                      {item.name}
                    </span>
                    <span className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded ${
                      item.status === "passed" ? "bg-semrush-green/10 text-semrush-green" : "bg-amber-50 text-amber-600"
                    }`}>
                      {item.status === "passed" ? "Pass ✓" : "Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Stats banner */}
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200 flex items-center justify-between flex-wrap gap-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-semrush-orange" /> Standard Google AdSense manual approval backlog queue: <strong>3 - 14 business days</strong>.
            </span>
            <button onClick={() => setActiveTab("guide")} className="text-semrush-orange hover:text-semrush-orange-hover transition-colors font-bold flex items-center gap-1 cursor-pointer">
              View Approval Guideline Handbook <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      )}

      {activeTab === "issues" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h4 className="text-sm font-bold text-[#171A21]">AdSense Issues & Compliance Violations Detector</h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">Manual reviewers immediately crawl and reject sites violating these specific requirements. Solve them prior to clicking apply.</p>
          </div>

          {failedIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border border-dashed border-gray-300 rounded-2xl">
              <CheckCircle className="h-10 w-10 text-semrush-green mb-2" />
              <p className="text-sm font-bold text-[#171A21]">Zero active AdSense compliance blocks!</p>
              <p className="text-xs text-gray-500 mt-1">Your domain passes all mandatory legal, cookies policy, and mobile tap layouts checks.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {failedIssues.map((issue, idx) => (
                <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap border-b border-gray-150 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs border border-red-150">
                        ❗
                      </div>
                      <h5 className="text-sm font-black text-[#171A21]">{issue.problem || issue.name}</h5>
                    </div>
                    
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                      issue.priority === "high" ? "bg-red-50 text-red-600 border border-red-200" : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}>
                      {issue.priority || "High"} priority block
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 text-xs">
                    <div>
                      <span className="font-extrabold text-gray-400 block mb-1 uppercase text-[10px]">CRAWL CONSEQUENCE</span>
                      <p className="text-gray-600 leading-relaxed font-medium">{issue.impact || "Failed to locate mandatory compliance file inside canonical directories."}</p>
                    </div>

                    <div>
                      <span className="font-extrabold text-gray-400 block mb-1 uppercase text-[10px]">MANUAL FIX BLUEPRINT</span>
                      <p className="text-gray-600 leading-relaxed font-semibold">{issue.fixSuggestion || "Generate and publish this required page. Clearly display link maps to it in your global footers."}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="font-extrabold text-gray-400 block mb-1 uppercase text-[10px]">ADSENSE IMPACT</span>
                        <p className="text-semrush-orange font-bold leading-relaxed">{issue.adSenseImpact || "Instant automated disapproval."}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "guide" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h4 className="text-sm font-bold text-[#171A21]">The AdSense Golden Rules Handbook (SEMrush manual standards)</h4>
            <p className="text-xs text-gray-500 mt-1 font-medium">Four strict pillars to pass human reviewer quality score guidelines.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <h5 className="text-sm font-bold text-[#171A21] mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-semrush-orange" /> 1. Inimitable Content Standard
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Do not republish spun AI wire-posts or scrape raw external records databases. Google demands high quality primary evidence, custom case studies, or catalog insights. Target at least <strong>30 fully indexed rich pages</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <h5 className="text-sm font-bold text-[#171A21] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-semrush-green" /> 2. Complete Disclosures
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Google requires a clear privacy policy that explicitly warns visitors regarding third-party cookie tags (AdSense Doubleclick, Analytics). Place highly visible maps in the global footer.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <h5 className="text-sm font-bold text-[#171A21] mb-2 flex items-center gap-1.5">
                <ArrowRight className="h-4.5 w-4.5 text-blue-500" /> 3. Layout UX Stability
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                No overlapping headers, no hidden menus, no confusing redirect pathways or mock download triggers. Icons and buttons must maintain touch targets of at least 44 pixels. Good speed under 2.5s.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <h5 className="text-sm font-bold text-[#171A21] mb-2 flex items-center gap-1.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-500" /> 4. Domain Age & Indexation
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                While some domains get approved early, Google favors domains active for over 3 months with valid sitemap declarations in the Search Console database, insuring easy spider ingress.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
