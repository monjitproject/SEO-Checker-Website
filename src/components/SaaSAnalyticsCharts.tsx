import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { SEOReport } from "../types";

interface SaaSAnalyticsChartsProps {
  reports: SEOReport[];
}

export default function SaaSAnalyticsCharts({ reports }: SaaSAnalyticsChartsProps) {
  // If we have no reports in history, let's render active default analytics trends to avoid a blank screen
  const defaultTrendData = [
    { name: "Report #1", seo: 72, adsense: 60, speed: 65 },
    { name: "Report #2", seo: 78, adsense: 72, speed: 70 },
    { name: "Report #3", seo: 84, adsense: 80, speed: 82 },
    { name: "Report #4", seo: 89, adsense: 85, speed: 80 }
  ];

  const trendData = reports.length > 0 
    ? [...reports].reverse().map((r, idx) => ({
        name: r.url.replace(/^https?:\/\/(www\.)?/, "").substring(0, 15) || `Scan #${idx + 1}`,
        seo: r.overallScore,
        adsense: r.adSenseReadiness.score,
        speed: r.performance.score
      }))
    : defaultTrendData;

  const currentReport = reports[0];

  // Dynamic distribution of issue types using Semrush green, Semrush orange, and red warning tones
  const issueDistributionData = [
    { name: "Passed Audit", value: 16, color: "#00BC98" },
    { name: "Warnings Flagged", value: 6, color: "#FFA114" },
    { name: "Failed Items", value: 4, color: "#FF4A4A" }
  ];

  if (currentReport) {
    let passed = 0;
    let warning = 0;
    let failed = 0;

    // Evaluate On-Page
    const statuses = [
      currentReport.onPage.titleStatus,
      currentReport.onPage.descriptionStatus,
      currentReport.onPage.h1Status,
      currentReport.onPage.h2Status,
      currentReport.onPage.imageAltStatus,
      currentReport.onPage.canonicalStatus,
      currentReport.onPage.robotsMetaStatus,
      currentReport.technical.sitemapStatus,
      currentReport.technical.robotsStatus,
      currentReport.technical.httpsStatus,
      currentReport.technical.sslStatus,
      currentReport.technical.structuredDataStatus,
      currentReport.performance.loadTimeStatus,
      currentReport.performance.pageSizeStatus,
      currentReport.performance.coreWebVitalsStatus,
      currentReport.performance.compressionStatus,
      currentReport.mobile.mobileFriendlyStatus,
      currentReport.security.securityHeadersStatus
    ];

    statuses.forEach(st => {
      if (st === "passed") passed++;
      else if (st === "warning") warning++;
      else if (st === "failed") failed++;
    });

    issueDistributionData[0].value = passed;
    issueDistributionData[1].value = warning;
    issueDistributionData[2].value = failed || 1; // avoid 0 slice
  }

  // Scoring comparison categorizations
  const categoriesData = currentReport 
    ? [
        { category: "On Page", score: currentReport.onPage.score },
        { category: "Technical", score: currentReport.technical.score },
        { category: "Speed Performance", score: currentReport.performance.score },
        { category: "Mobile friendly", score: currentReport.mobile.score },
        { category: "Security SSL", score: currentReport.security.score },
        { category: "AdSense Readiness", score: currentReport.adSenseReadiness.score }
      ]
    : [
        { category: "On Page", score: 85 },
        { category: "Technical", score: 90 },
        { category: "Speed Performance", score: 75 },
        { category: "Mobile friendly", score: 95 },
        { category: "Security SSL", score: 92 },
        { category: "AdSense Readiness", score: 80 }
      ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
      
      {/* Chart 1: Evolution of score trends */}
      <div className="rounded-2xl border border-semrush-border bg-white p-5 shadow-sm hover:border-gray-300 transition-all">
        <h4 className="text-sm font-black text-[#171A21] mb-1">SEO & AdSense Benchmark Evolution</h4>
        <p className="text-xs text-gray-550 font-medium mb-4">Tracking target domains over latest analysis passes</p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="name" stroke="#a1a1a1" fontSize={10} tickLine={false} />
              <YAxis stroke="#a1a1a1" domain={[0, 100]} fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E9ECEF", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                labelStyle={{ fontSize: "11px", color: "#171A21", fontWeight: "bold" }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: "bold" }} />
              <Line type="monotone" dataKey="seo" stroke="#FF640D" name="SEO Score" strokeWidth={3} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="adsense" stroke="#00BC98" name="AdSense Ready" strokeWidth={2.5} />
              <Line type="monotone" dataKey="speed" stroke="#171A21" name="Page Speed" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Category Bar metrics comparison */}
      <div className="rounded-2xl border border-semrush-border bg-white p-5 shadow-sm hover:border-gray-300 transition-all">
        <h4 className="text-sm font-black text-[#171A21] mb-1 font-sans">SEO Module Scores Diagnostic</h4>
        <p className="text-xs text-gray-550 font-medium mb-4">Comparing granular dimension benchmarks</p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoriesData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="category" stroke="#a1a1a1" fontSize={9} tickLine={false} />
              <YAxis stroke="#a1a1a1" domain={[0, 100]} fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E9ECEF", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              />
              <Bar dataKey="score" fill="#FF4A4A" name="Dimension Score" radius={[4, 4, 0, 0]}>
                {categoriesData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 5 ? "#00BC98" : index === 2 ? "#FFA114" : index === 0 ? "#FF640D" : "#171A21"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Issues breakdown pie wheel */}
      <div className="rounded-2xl border border-semrush-border bg-white p-5 shadow-sm hover:border-gray-300 transition-all md:col-span-2 lg:col-span-1">
        <h4 className="text-sm font-black text-[#171A21] mb-1">Crawler Rules Checklist Density</h4>
        <p className="text-xs text-gray-550 font-medium mb-4">Ratio of compliance and configuration logs</p>
        
        <div className="flex h-56 items-center justify-center">
          <div className="h-full w-2/3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {issueDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #E9ECEF", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-1/3 flex flex-col justify-center gap-3">
            {issueDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 leading-none">
                <div className="h-2.5 w-2.5 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-[10px] font-black text-[#171A21]">{item.name}</p>
                  <p className="text-xs font-bold text-gray-400 mt-0.5">{item.value} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-gray-400 text-center border-t border-gray-150 pt-2 selection:bg-semrush-orange font-semibold">
          {currentReport 
            ? `Calculated over ${issueDistributionData.reduce((a, b) => a + b.value, 0)} criteria tests automatically analyzed.` 
            : "*Based on sample report scan data."
          }
        </p>
      </div>

    </div>
  );
}
