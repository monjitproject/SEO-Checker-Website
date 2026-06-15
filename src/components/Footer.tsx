import React from "react";
import { ShieldCheck, ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-800 bg-semrush-navy text-slate-400">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-semrush-orange to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 text-left">
          
          {/* Brand Bio */}
          <div className="col-span-2 space-y-4">
            <button 
              onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-semrush-orange shadow-lg shadow-semrush-orange/15 group-hover:scale-105 transition-transform duration-200">
                <span className="font-black text-white text-xs tracking-tighter">SEM</span>
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block">semrush <span className="text-semrush-orange">audit</span></span>
                <span className="text-[10px] text-slate-500 font-bold block leading-none">Google Publisher Sandbox</span>
              </div>
            </button>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400 font-medium">
              Mapping raw web components into highly performant indices. Benchmark meta properties, indexation canonical tags, load responsiveness, and policy guidelines against modern crawler emulators.
            </p>
            <div className="flex gap-4 pt-4 items-center">
              <span className="font-bold text-[10px] uppercase tracking-wider text-slate-500">Corporate connections:</span>
              <a href="#" className="hover:text-semrush-orange text-slate-400 transition-colors" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-semrush-orange text-slate-400 transition-colors" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="hover:text-semrush-orange text-slate-400 transition-colors" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">Core Analyzers</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => { setActiveTab("seo-checker"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer flex items-center gap-1 group">
                  SEO Checker <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-semrush-orange" />
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("adsense-checker"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer flex items-center gap-1 group">
                  AdSense Evaluator <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-semrush-orange" />
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("blog"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer flex items-center gap-1 group">
                  Optimization Blog <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-semrush-orange" />
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("pricing"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer flex items-center gap-1 group">
                  Premium Subscriptions <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-semrush-orange" />
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Disclosures (Critical for AdSense Checker checklist) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">Legal & Support</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => { setActiveTab("privacy"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("disclaimer"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer">
                  Disclaimers Page
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("terms"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("sitemap"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer">
                  Sitemap Schema
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("faq"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-semrush-orange transition-colors text-left cursor-pointer">
                  Helper FAQ
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Bottom Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-800 pt-8 text-[11px] text-slate-500 font-bold">
          <div className="flex items-center gap-1.5 mb-4 sm:mb-0">
            <ShieldCheck className="h-4 w-4 text-semrush-green" />
            <span>Certified Google AdSense Guidance Framework Sandbox active.</span>
          </div>
          <p>© {currentYear} Semrush Theme Sandbox. Built securely for crawlers verification.</p>
        </div>
      </div>
    </footer>
  );
}
