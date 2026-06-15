import React, { useState } from "react";
import { 
  AlertCircle, AlertTriangle, CheckCircle, Info, ArrowRight, Sparkles, Filter, CheckCheck
} from "lucide-react";
import { SEORecommendation } from "../types";

interface AIRecommendationsCardProps {
  recommendations: SEORecommendation[];
}

export default function AIRecommendationsCard({ recommendations }: AIRecommendationsCardProps) {
  const [activePriorityFilter, setActivePriorityFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);

  const toggleFixApplied = (recId: string) => {
    if (appliedFixes.includes(recId)) {
      setAppliedFixes(appliedFixes.filter(id => id !== recId));
    } else {
      setAppliedFixes([...appliedFixes, recId]);
    }
  };

  const filteredRecs = recommendations.filter(rec => {
    if (activePriorityFilter === "all") return true;
    return rec.priority === activePriorityFilter;
  });

  return (
    <div className="rounded-3xl border border-semrush-border bg-white p-6 md:p-8 shadow-sm relative overflow-hidden text-left">
      {/* Absolute ambient light */}
      <div className="absolute top-0 right-0 h-40 w-44 bg-semrush-orange/5 blur-3xl rounded-full"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-150 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-semrush-orange/10 text-semrush-orange font-bold">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-black text-[#171A21] tracking-tight">AI Audit Priority Recommendations</h3>
          </div>
          <p className="text-xs text-gray-500 mt-1 max-w-xl font-medium leading-relaxed">
            Intelligent crawler optimization engine based on technical severity matrices and Google AdSense manual review guidelines.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 self-start md:self-center font-bold">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 px-2 flex items-center gap-1 shrink-0">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {(["all", "high", "medium", "low"] as const).map((pr) => (
            <button
              key={pr}
              onClick={() => setActivePriorityFilter(pr)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition-all cursor-pointer ${
                activePriorityFilter === pr
                  ? pr === "high"
                    ? "bg-red-500/15 text-red-650 border border-red-200"
                    : pr === "medium"
                    ? "bg-amber-50 text-amber-600 border border-amber-200"
                    : pr === "low"
                    ? "bg-[#00BC98]/10 text-semrush-green border border-[#00BC98]/20"
                    : "bg-semrush-orange text-white"
                  : "text-gray-500 hover:text-[#171A21]"
              }`}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
            <CheckCircle className="h-10 w-10 text-semrush-green mb-2" />
            <p className="text-sm font-bold text-[#171A21]">All scanned rules are clean for this category!</p>
            <p className="text-xs text-gray-500 mt-1 font-semibold">Select another priority filter criteria above.</p>
          </div>
        ) : (
          filteredRecs.map((rec) => {
            const isCompleted = appliedFixes.includes(rec.id);
            return (
              <div 
                key={rec.id}
                className={`group relative rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
                  isCompleted 
                    ? "bg-gray-50/65 border-gray-200 opacity-60" 
                    : rec.priority === "high"
                    ? "bg-red-50/20 border-red-150 hover:bg-gray-50/25 hover:border-red-300"
                    : rec.priority === "medium"
                    ? "bg-amber-50/20 border-amber-150 hover:bg-gray-50/25 hover:border-amber-300"
                    : "bg-[#00BC98]/5 border-emerald-100 hover:bg-gray-50/25 hover:border-emerald-300"
                }`}
                id={`recommendation-item-${rec.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {/* Severity Indicator */}
                    <div className="mt-1 shrink-0">
                      {isCompleted ? (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-semrush-green/10 text-semrush-green">
                          <CheckCheck className="h-5 w-5" />
                        </div>
                      ) : rec.priority === "high" ? (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-650 border border-red-200">
                          <AlertCircle className="h-5 w-5" />
                        </div>
                      ) : rec.priority === "medium" ? (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-semrush-green border border-emerald-100">
                          <Info className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Category Header Tag */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-md ${
                          rec.priority === "high"
                            ? "bg-red-50 text-red-650"
                            : rec.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-semrush-green"
                        }`}>
                          {rec.priority} PRIORITY
                        </span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-100 py-0.5 px-2 rounded-md">
                          {rec.category}
                        </span>
                      </div>

                      <h4 className={`text-base font-black mt-2 tracking-tight ${isCompleted ? "line-through text-gray-400" : "text-[#171A21]"}`}>
                        {rec.title}
                      </h4>

                      {/* Diagnostic details */}
                      <div className="grid gap-3 sm:grid-cols-2 mt-4 text-xs font-semibold text-gray-600">
                        <div className="rounded-xl bg-gray-50/50 p-3 border border-gray-200">
                          <span className="font-extrabold text-gray-400 uppercase text-[10px] block mb-1">DETECTED PROBLEM</span>
                          <p className="text-gray-700 leading-relaxed font-semibold">{rec.problem}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50/50 p-3 border border-gray-200">
                          <span className="font-extrabold text-gray-400 uppercase text-[10px] block mb-1">CRAWLER STATUS IMPACT</span>
                          <p className="text-gray-700 leading-relaxed font-semibold">{rec.impact}</p>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 border-l-2 border-semrush-orange pl-4 py-1">
                        <p className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                          <ArrowRight className="h-3 w-3 text-semrush-orange" /> Actionable Fix Recipe:
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed font-semibold">{rec.fixSuggestion}</p>
                      </div>

                      {/* AdSense Impact details */}
                      {rec.adSenseImpact && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] text-[#171A21] border border-emerald-100 font-semibold">
                          <span className="text-semrush-green font-black">Monetization AdSense Consequence:</span>
                          <span>{rec.adSenseImpact}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mark as Completed toggle */}
                  <button
                    onClick={() => toggleFixApplied(rec.id)}
                    className={`mt-2 md:mt-0 shrink-0 self-start md:self-center flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold cursor-pointer select-none transition-all active:scale-95 ${
                      isCompleted 
                        ? "bg-semrush-green/10 text-semrush-green border-semrush-green/20" 
                        : "bg-gray-150 hover:bg-[#171A21] hover:text-white border-gray-200 text-gray-700"
                    }`}
                    style={{ touchAction: "manipulation" }}
                    id={`btn-toggle-completion-${rec.id}`}
                  >
                    {isCompleted ? "Simulated Resolved ✓" : "Commit simulated fix"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
