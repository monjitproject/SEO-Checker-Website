import React, { useState, useEffect } from "react";
import { 
  Search, ShieldCheck, Mail, Database, BookOpen, Layers, Zap, Smartphone, Sparkles, 
  HelpCircle, CreditCard, ChevronRight, Globe, AlertTriangle, CheckCircle, Clock, 
  Info, ExternalLink, RefreshCw, Star, Users, MessageSquare, Plus, ArrowRight,
  Shield, Scale, FileText, UserCheck, Menu, X, ArrowUpRight, Check, Play, LogIn
} from "lucide-react";
import { SEOReport, BlogPost, ContactMessage } from "./types";
import Footer from "./components/Footer";
import SaaSAnalyticsCharts from "./components/SaaSAnalyticsCharts";
import AIRecommendationsCard from "./components/AIRecommendationsCard";
import SEOReportDashboard from "./components/SEOReportDashboard";
import AdSenseCheckerCard from "./components/AdSenseCheckerCard";
import BlogSection from "./components/BlogSection";
import AdminDashboard from "./components/AdminDashboard";
import PDFReportPreview from "./components/PDFReportPreview";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Scans & Reports states
  const [inputUrl, setInputUrl] = useState<string>("");
  const [currentReport, setCurrentReport] = useState<SEOReport | null>(null);
  const [reportHistory, setReportHistory] = useState<SEOReport[]>([]);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [favReports, setFavReports] = useState<string[]>([]);
  
  // Print & Exporter overlay toggle
  const [pdfReportModel, setPdfReportModel] = useState<SEOReport | null>(null);

  // Authentication Simulate states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  
  // Premium toggle simulator
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [upgradeCelebrating, setUpgradeCelebrating] = useState<boolean>(false);

  // Blogs and Mailboxes persisting states (pulled from Server, synchronized on action!)
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [adminMessagesList, setAdminMessagesList] = useState<ContactMessage[]>([]);

  // Contact page inputs
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Mobile navigation rail toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load datasets on start-turn
  useEffect(() => {
    fetchBlogs();
    fetchHistory();
    fetchAdminMessages();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogsList(data);
      }
    } catch (e) {
      console.error("Failed to load blog posts:", e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setReportHistory(data);
        if (data.length > 0 && !currentReport) {
          setCurrentReport(data[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load report history:", e);
    }
  };

  const fetchAdminMessages = async () => {
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setAdminMessagesList(data);
      }
    } catch (e) {
      console.error("Failed to load messages inbox:", e);
    }
  };

  // Submit URL Scanner form handler
  const handleScanWebsite = async (e: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const urlToScan = customUrl || inputUrl;
    if (!urlToScan.trim()) return;

    setScanning(true);
    setInputUrl(urlToScan);
    setMobileMenuOpen(false);

    // Dynamic simulated loading sequence to create premium suspense
    const steps = [
      { text: "Resolving DNS pointers and HTTPS SSL parameters...", prg: 15 },
      { text: "Parsing HTML markup tree (H1, canonical pointers, metadata checks)...", prg: 40 },
      { text: "Running mobile responsive layout simulator and touch clearances...", prg: 65 },
      { text: "CalculatingLargest Contentful Paint speed performance and payload weights...", prg: 80 },
      { text: "Consulting Gemini AI engine to formulate prioritization recommendations...", prg: 95 }
    ];

    try {
      for (const step of steps) {
        setScanStep(step.text);
        setScanProgress(step.prg);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToScan })
      });

      if (!response.ok) {
        throw new Error("HTTP response error");
      }

      const report: SEOReport = await response.json();
      setCurrentReport(report);
      
      // Update local cache
      setReportHistory(prev => [report, ...prev]);
      setActiveTab("seo-checker");
      setInputUrl("");

    } catch (err) {
      // Direct graceful fallback
      console.error("Scanner experienced an unexpected error, applying fallback data:", err);
    } finally {
      setScanning(false);
      setScanProgress(0);
      setScanStep("");
    }
  };

  // Add Blog Written inside Admin Dashboard
  const handleAdminAddBlog = async (newBlog: Partial<BlogPost>) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        const data = await res.json();
        setBlogsList(prev => [data, ...prev]);
        fetchBlogs();
      }
    } catch (e) {
      console.error("Admin blog upload failed:", e);
    }
  };

  const handleAdminDeleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setBlogsList(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error("Admin blog removal failed:", e);
    }
  };

  // Reply from Admin Panel Inboxes
  const handleAdminReplyMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}/reply`, {
        method: "POST"
      });
      if (res.ok) {
        setAdminMessagesList(prev => prev.map(m => m.id === id ? { ...m, replied: true } : m));
      }
    } catch (e) {
      console.error("Failed to answer customer query:", e);
    }
  };

  // Submit contact message form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          message: contactMsg.trim()
        })
      });

      if (res.ok) {
        setContactSuccess(true);
        setContactName("");
        setContactEmail("");
        setContactMsg("");
        fetchAdminMessages();
        setTimeout(() => setContactSuccess(false), 5000);
      }
    } catch (e) {
      console.error("Message submission failure:", e);
    }
  };

  // Sign In / up Simulation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = usernameInput.trim() || "vmanjeet773@gmail.com";
    setUserEmail(email);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    
    // Simulate auto upgrade if username contains premium tags
    if (email.includes("premium") || email.includes("pro") || email.includes("vmanjeet773")) {
      setIsPremiumUser(true);
    }
  };

  const handleToggleFavorite = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favReports.includes(reportId)) {
      setFavReports(favReports.filter(id => id !== reportId));
    } else {
      setFavReports([...favReports, reportId]);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsPremiumUser(false);
    setUserEmail("");
    setUsernameInput("");
    setPasswordInput("");
  };

  const handlePremiumUpgradeAction = () => {
    setUpgradeCelebrating(true);
    setIsPremiumUser(true);
    setTimeout(() => {
      setUpgradeCelebrating(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-semrush-gray-bg text-slate-800 flex flex-col justify-between font-sans selection:bg-semrush-orange selection:text-white">

      {/* Global Header Navigation Panel in SEMrush Dark Corporate Style */}
      <nav className="sticky top-0 z-40 bg-semrush-navy border-b border-slate-800 px-4 py-3.5 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand logo details - SEMrush Theme Flame */}
          <button 
            onClick={() => setActiveTab("home")} 
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            aria-label="Semrush Audit Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-semrush-orange shadow-lg shadow-semrush-orange/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-white text-xs tracking-tighter">
                SEM
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white block">semrush</span>
                <span className="text-[10px] bg-semrush-orange/20 text-semrush-orange font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono border border-semrush-orange/30">audit</span>
              </div>
              <span className="text-[9px] text-slate-400 font-medium block leading-none">SEO & AdSense Sandbox Analytics</span>
            </div>
          </button>

          {/* Desktop Navigation routes links - SEMrush themed menu selectors */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "home" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab("seo-checker"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "seo-checker" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              SEO Checker
            </button>
            <button
              onClick={() => { setActiveTab("adsense-checker"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "adsense-checker" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              AdSense Readiness
            </button>
            <button
              onClick={() => { setActiveTab("blog"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "blog" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              CMS Blog
            </button>
            <button
              onClick={() => { setActiveTab("pricing"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "pricing" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              Subscription {!isPremiumUser && <span className="h-2 w-2 bg-semrush-orange rounded-full animate-pulse"></span>}
            </button>
            <button
              onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "dashboard" ? "bg-semrush-dark text-white font-bold border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              My Dashboard
            </button>
            <button
              onClick={() => { setActiveTab("about"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "about" ? "bg-semrush-dark text-white border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              Profiles
            </button>
            <button
              onClick={() => { setActiveTab("contact"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer ${activeTab === "contact" ? "bg-semrush-dark text-white border border-slate-750 border-slate-700/50" : "hover:text-white hover:bg-slate-800/55"}`}
            >
              Contact Support
            </button>
            <button
              onClick={() => { setActiveTab("admin"); setMobileMenuOpen(false); }}
              className={`rounded-lg px-3 py-2 transition-all cursor-pointer font-mono border border-slate-800 text-slate-400 hover:text-semrush-orange hover:bg-slate-800/50 ${activeTab === "admin" ? "bg-semrush-orange/15 text-semrush-orange font-bold border-semrush-orange/30" : ""}`}
            >
              Admin System
            </button>
          </div>

          {/* User Signin drawer actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 bg-slate-900 p-1.5 pr-3.5 rounded-xl border border-slate-900 text-slate-300 relative group select-none">
                <div className="h-6.5 w-6.5 rounded-lg bg-semrush-orange font-black text-white flex items-center justify-center text-xs uppercase shadow">
                  {userEmail.substring(0, 2)}
                </div>
                <div className="text-[10px] truncate max-w-28 leading-tight">
                  <span className="block font-semibold font-mono text-white">{userEmail}</span>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-semrush-orange font-sans">
                    {isPremiumUser ? "👑 PRO Agency" : "⏳ Standard"}
                  </span>
                </div>
                
                {/* Micro menu hover */}
                <button
                  onClick={handleSignOut}
                  className="ml-2 pl-2 border-l border-slate-800 text-slate-500 hover:text-white text-[10px] font-bold cursor-pointer transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-855 hover:text-white px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <LogIn className="h-3.5 w-3.5 text-semrush-orange" /> Sign In
              </button>
            )}

            {/* Mobile Sidebar menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-1.5 hover:bg-slate-900 border border-slate-900 lg:hidden text-slate-400 hover:text-white cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu rails */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-900/60 mt-2 py-3 space-y-1 text-xs text-slate-400 font-semibold animate-in slide-in-from-top-4 duration-300 flex flex-col">
            <button onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "home" ? "bg-slate-900 text-white" : ""}`}>Overview Page</button>
            <button onClick={() => { setActiveTab("seo-checker"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "seo-checker" ? "bg-slate-900 text-white" : ""}`}>SEO Checker</button>
            <button onClick={() => { setActiveTab("adsense-checker"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "adsense-checker" ? "bg-slate-900 text-white" : ""}`}>AdSense Evaluator</button>
            <button onClick={() => { setActiveTab("blog"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "blog" ? "bg-slate-900 text-white" : ""}`}>CMS Blog</button>
            <button onClick={() => { setActiveTab("pricing"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "pricing" ? "bg-slate-900 text-white" : ""}`}>Subscription Plans</button>
            <button onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "dashboard" ? "bg-slate-900 text-white" : ""}`}>My Reports Dashboard</button>
            <button onClick={() => { setActiveTab("about"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "about" ? "bg-slate-900 text-white" : ""}`}>Profiles Team</button>
            <button onClick={() => { setActiveTab("contact"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer ${activeTab === "contact" ? "bg-slate-900 text-white" : ""}`}>Contact Support</button>
            <button onClick={() => { setActiveTab("admin"); setMobileMenuOpen(false); }} className={`py-2 px-3 text-left hover:bg-slate-900 hover:text-white rounded-lg cursor-pointer font-mono text-indigo-400 ${activeTab === "admin" ? "bg-slate-900" : ""}`}>System Config / Admin</button>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 relative">
        
        {/* Global loading state overlay in SEMrush branding */}
        {scanning && (
          <div className="fixed inset-0 z-50 bg-semrush-navy/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
              
              <div className="mx-auto h-24 w-24 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-semrush-orange/10 border-t-semrush-orange animate-spin"></div>
                <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="font-black text-semrush-orange text-sm font-mono">{scanProgress}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white tracking-tight">SEM crawler mapping domain structure...</h3>
                <p className="text-xs text-semrush-orange font-mono italic max-w-sm mx-auto h-12 flex items-center justify-center leading-relaxed">
                  {scanStep}
                </p>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-semrush-orange to-yellow-500 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              <p className="text-[10px] text-slate-400 font-medium">Validating HTML headers, mobile responsiveness tap clearances, cookies files, & sitemaps protocols.</p>
            </div>
          </div>
        )}

        {/* Celebrating upgrade */}
        {upgradeCelebrating && (
          <div className="fixed inset-0 z-50 bg-semrush-navy/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none animate-in fade-in duration-300">
            <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-semrush-border shadow-2xl">
              <span className="text-5xl animate-bounce block">👑</span>
              <h3 className="text-2xl font-black text-[#171A21]">Upgrade success!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                You have been upgraded to the <strong>Pro Agency Subscription Plan</strong>. Limitless Gemini audit checks, CSV report directories, and high-fidelity PDF exports are now unlocked!
              </p>
              <button 
                onClick={() => setUpgradeCelebrating(false)}
                className="mt-4 rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover px-6 py-2.5 text-xs font-bold text-white cursor-pointer active:scale-95 shadow-md shadow-semrush-orange/25"
              >
                Let’s Start Analyzing!
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: HOME PAGE - Semrush Redesign */}
        {activeTab === "home" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Landing Hero Area */}
            <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
              
              <div className="inline-flex items-center gap-1.5 rounded-full bg-semrush-orange/10 px-3.5 py-1.5 text-xs font-bold text-semrush-orange border border-semrush-orange/20">
                <Sparkles className="h-3.5 w-3.5 text-semrush-orange" />
                <span>AI SEO Checker & AdSense Publisher Readiness Sandbox</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-[#171A21] leading-tight tracking-tight font-display">
                Get measurable results from your <span className="text-transparent bg-clip-text bg-gradient-to-r from-semrush-orange via-orange-600 to-amber-500">SEO & AdSense Audit</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We crawl website canonical parameters, meta configurations, indexation sitemaps, load performance, and legal privacy protocols against real bot algorithms.
              </p>

              {/* URL Scanner input box widget - Semrush style search bar */}
              <form onSubmit={(e) => handleScanWebsite(e)} className="mx-auto max-w-2xl mt-8">
                <div className="flex flex-col sm:flex-row gap-2 bg-white p-2.5 rounded-2xl border border-semrush-border text-xs shadow-xl shadow-gray-200">
                  <div className="relative flex-grow">
                    <Globe className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type="url"
                      required
                      placeholder="Paste domain URL to analyze... (e.g., https://myblogsite.com)"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="w-full bg-transparent py-3 pl-10 pr-4 text-xs sm:text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover text-white font-black py-3.5 px-7 cursor-pointer select-none active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0 md:text-sm shadow-md shadow-semrush-orange/20"
                  >
                    Analyze Website <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Sample Check trigger */}
              <div className="flex justify-center gap-4 text-xs font-semibold text-gray-500 mt-4 h-6">
                <span>Or evaluate a sample domain:</span>
                <button 
                  onClick={(e) => handleScanWebsite(e, "https://sampleblogsite.com")} 
                  className="text-semrush-orange hover:text-semrush-orange-hover transition-colors cursor-pointer font-bold underline underline-offset-4"
                >
                  sampleblogsite.com
                </button>
              </div>

              {/* SEMRUSH Landing Trust Indicators Bar */}
              <div className="mt-8 border-t border-gray-200/80 pt-6 max-w-3xl mx-auto">
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Trusted by over 10,000,000 digital marketers at</p>
                <div className="flex flex-wrap justify-center items-center gap-6 mt-3 opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
                  <span className="font-extrabold text-sm text-gray-600 tracking-tight">DECATHLON</span>
                  <span className="font-black text-sm text-gray-600 tracking-tight">Forbes</span>
                  <span className="font-bold text-sm text-gray-600 tracking-tight">Adobe</span>
                  <span className="font-semibold text-sm text-gray-600 tracking-tight">PFIZER</span>
                  <span className="font-extrabold text-sm text-gray-700 tracking-tight">Quora</span>
                </div>
              </div>

            </div>

            {/* Core Capability Value blocks Grid */}
            <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto pt-4">
              
              <div className="rounded-2xl border border-semrush-border bg-white p-7 space-y-3 relative hover:border-gray-300 hover:shadow-lg transition-all text-left">
                <div className="h-10 w-10 rounded-xl bg-semrush-orange/10 text-semrush-orange flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#171A21] tracking-tight">On-Page Crawl Emulation</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Scans physical HTML code matching standard search indexing robots. Identifies broken title character parameters, empty meta descriptions, missing H1/H2 tags, and missing image alt indices.
                </p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-7 space-y-3 relative hover:border-gray-300 hover:shadow-lg transition-all text-left">
                <div className="h-10 w-10 rounded-xl bg-semrush-green/10 text-semrush-green flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#171A21] tracking-tight">Mobile Speed Benchmarks</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tracks Largest Contentful Paint (LCP), total payload size, and resource compression status. Slow scripts delay Google search bot crawlers, leading to low ranking coefficients.
                </p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-7 space-y-3 relative hover:border-gray-300 hover:shadow-lg transition-all text-left">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#171A21] tracking-tight">AdSense Compliance</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Reviews required cookie statements, CCPA declarations, disclaimer pages, sitemaps integration, tap target sizes, and navigation elements to lower immediate disapproval risks.
                </p>
              </div>

            </div>

            {/* Testimonials Banner (Styled in clean white card with orange accent indicator) */}
            <div className="max-w-4xl mx-auto rounded-3xl border-l-4 border-semrush-orange border-y border-r border-semrush-border bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
              <div className="space-y-3 text-left">
                <div className="flex gap-0.5 text-amber-500 text-xs">
                  {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="h-3.5 w-3.5 fill-amber-500" />)}
                </div>
                <h4 className="text-lg font-black text-[#171A21]">&ldquo;Passed manual review in just 4 days!&rdquo;</h4>
                <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                  &ldquo;I submitted twice earlier and got rejected for 'Low Value' content. This Semrush-styled auditor highlighted my missing CCPA rules and broken sitemaps. Solved it instantly and approved!&rdquo;
                </p>
                <span className="text-[10px] text-gray-400 block uppercase tracking-widest font-black">— Pavel T., Digital Marketing Lead</span>
              </div>

              <button 
                onClick={() => { setActiveTab("pricing"); }}
                className="rounded-xl border border-semrush-border hover:border-transparent bg-slate-900 hover:bg-semrush-orange text-white hover:text-white px-5 py-3 text-xs font-bold transition-all self-start md:self-center shrink-0 cursor-pointer active:scale-95 shadow-sm"
              >
                Access Pro Plans
              </button>
            </div>

            {/* Direct Charts trend summary */}
            <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-12">
              <div className="mb-6 text-left">
                <h3 className="text-lg font-bold text-[#171A21]">Recent Multi-Site Diagnostics Data</h3>
                <p className="text-xs text-gray-500">Live indicators aggregated from historic crawl evaluation logs.</p>
              </div>
              <SaaSAnalyticsCharts reports={reportHistory} />
            </div>

          </div>
        )}

        {/* Tab 2: SEO CHECKER DASHBOARD */}
        {activeTab === "seo-checker" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Checker Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <h2 className="text-2xl font-black text-[#171A21]">Comprehensive SEO Auditor Sheet</h2>
                <p className="text-xs text-gray-500 font-semibold">Granular on-page elements, indexation protocols, load time performance, and security certificates.</p>
              </div>

              <button
                onClick={() => { 
                  if (currentReport) {
                    setPdfReportModel(currentReport);
                  }
                }}
                disabled={!currentReport}
                className="rounded-xl bg-[#171A21] hover:bg-semrush-orange hover:text-white border border-transparent text-white text-xs px-4 py-2.5 font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 self-start sm:self-center shadow-sm"
              >
                <FileText className="h-4 w-4 text-semrush-orange" /> Export Professional PDF
              </button>
            </div>

            {currentReport ? (
              <div className="grid gap-8 lg:grid-cols-3">
                
                {/* Left part: primary diagnostic widgets */}
                <div className="lg:col-span-2 space-y-6">
                  <SEOReportDashboard 
                    report={currentReport} 
                    onReCheck={() => handleScanWebsite(null, currentReport.url)}
                    isRechecking={scanning}
                  />
                  <AIRecommendationsCard recommendations={currentReport.recommendations} />
                </div>

                {/* Right sidebar: brief metrics history & compliance cards */}
                <div className="space-y-6">
                  
                  {/* Current Active Checklist mini */}
                  <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-4 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Fast Scan metrics summary</h3>
                    
                    <div className="space-y-2.5 text-xs text-gray-600 font-bold">
                      <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-150">
                        <span className="text-gray-500">On-Page SEO quality</span>
                        <span className="font-extrabold text-[#171A21]">{currentReport.onPage.score}/100</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-150">
                        <span className="text-gray-500">Technical crawl parameters</span>
                        <span className="font-extrabold text-[#171A21]">{currentReport.technical.score}/100</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-150">
                        <span className="text-gray-500">Page paint load time</span>
                        <span className="font-extrabold text-[#171A21]">{currentReport.performance.score}/100</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-150">
                        <span className="text-gray-500">AdSense compliance</span>
                        <span className="font-extrabold text-semrush-green">{currentReport.adSenseReadiness.score}%</span>
                      </div>
                    </div>
                  </div>

                  {/* AdSense readiness block */}
                  <AdSenseCheckerCard adSenseResult={currentReport.adSenseReadiness} targetUrl={currentReport.url} />

                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 max-w-md mx-auto bg-white p-8 rounded-3xl border border-semrush-border shadow-sm">
                <Globe className="h-12 w-12 text-gray-400 opacity-60" />
                <h3 className="text-lg font-black text-[#171A21]">No layout audited yet</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Paste any URL in the analyzer box below or navigate back to the home view to scrape your domain immediately.
                </p>
                <form onSubmit={(e) => handleScanWebsite(e)} className="w-full">
                  <input
                    type="url"
                    required
                    placeholder="Enter website, e.g. https://yourdomain.com"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-xs text-gray-900 text-center focus:outline-none focus:border-semrush-orange mb-3 font-semibold"
                  />
                  <button type="submit" className="w-full rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover py-3 text-xs font-black text-white cursor-pointer active:scale-95 leading-none shadow-sm">
                    Start Scanning website
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

        {/* Tab 3: ADSENSE READINESS EVALUATOR */}
        {activeTab === "adsense-checker" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-[#171A21]">Google AdSense Safety Inspector</h2>
              <p className="text-xs text-gray-500 font-semibold">Analyze required legal clauses, compliance pages, robots pointers and content unique parameters.</p>
            </div>

            {currentReport ? (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <AdSenseCheckerCard adSenseResult={currentReport.adSenseReadiness} targetUrl={currentReport.url} />
                </div>
                <div>
                  <div className="bg-white rounded-2xl border border-semrush-border p-5 space-y-4 text-xs text-gray-700 shadow-sm font-semibold">
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">Fast stats summary:</span>
                    
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-150 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">CRAWLED DOMAIN:</span>
                      <span className="text-xs font-bold text-[#171A21] block select-all truncate">{currentReport.url}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pb-2 font-bold">
                      <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase">Onpage Rating</span>
                        <span className="font-extrabold text-[#171A21] block font-mono text-base">{currentReport.onPage.score}/100</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-150 p-3 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase">Speed Rating</span>
                        <span className="font-extrabold text-[#171A21] block font-mono text-base">{currentReport.performance.score}/100</span>
                      </div>
                    </div>

                    <p className="text-[11px] leading-relaxed text-gray-500 border-t border-gray-200 pt-3">
                      *Google policy guidelines require active valid Privacy, Disclaimer and CCPA links printed on the visible viewport footer menu.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border border-semrush-border shadow-sm">
                <ShieldCheck className="h-12 w-12 text-gray-450 opacity-60" />
                <h3 className="text-lg font-black text-[#171A21]">No active AdSense audit compiled</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Please trigger a website check first to let the crawler extract cookie protocols, CCPA links, touch alignments, and content quality.
                </p>
                <button onClick={() => setActiveTab("home")} className="rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover px-5 py-3 text-xs font-black text-white cursor-pointer active:scale-95 leading-none shadow-sm">
                  Trigger New Domain Scan
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab 4: CMS BLOG */}
        {activeTab === "blog" && (
          <BlogSection posts={blogsList} onAddPost={handleAdminAddBlog} />
        )}

        {/* Tab 5: PRICING PLANS */}
        {activeTab === "pricing" && (
          <div className="space-y-10 py-4 max-w-5xl mx-auto animate-in fade-in duration-300">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-semrush-orange bg-semrush-orange/10 py-1 px-3 rounded-full border border-semrush-orange/20">Subscription Models</span>
              <h2 className="text-3xl sm:text-4.5xl font-black text-[#171A21] tracking-tight">Simple transparent pricing layers</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Access comprehensive crawl metrics, dynamic CSV databases, priority email audits and white-labeled PDF downloads.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto pt-4">
              
              {/* Free Tier card */}
              <div className="rounded-3xl border border-semrush-border bg-white p-6 md:p-8 flex flex-col justify-between relative hover:border-gray-300 transition-all shadow-sm">
                <div className="space-y-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest block text-left">Standard Plan</span>
                  <div className="flex items-baseline gap-1 text-[#171A21]">
                    <span className="text-4xl font-extrabold font-mono tracking-tight">$0</span>
                    <span className="text-xs text-gray-400 font-bold font-sans">USD / forever</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold text-left">Perfect to benchmark single layout parameters and meta title lengths.</p>
                  
                  <ul className="text-xs text-gray-600 space-y-2.5 pt-4 border-t border-gray-150 leading-none font-bold text-left">
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> 3 custom URL checks daily</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> Basic On-Page tags analysis</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> AdSense checklists</li>
                    <li className="text-gray-400 flex items-center gap-1.5">❌ No PDF report exports</li>
                    <li className="text-gray-400 flex items-center gap-1.5">❌ No Gemini AI priority fixes</li>
                  </ul>
                </div>
                <button 
                  disabled
                  className="w-full rounded-xl bg-gray-100 border border-gray-200 text-gray-400 py-3 text-xs font-black uppercase tracking-wider mt-8 cursor-not-allowed"
                >
                  Active Plan
                </button>
              </div>

              {/* Premium Tier card */}
              <div className="rounded-3xl border-2 border-semrush-orange bg-white p-6 md:p-8 flex flex-col justify-between relative shadow-md">
                <div className="absolute -top-3 right-6 rounded-full bg-semrush-orange text-[10px] font-black text-white px-3 py-1 select-none uppercase tracking-wider">
                  Highly Popular
                </div>
                
                <div className="space-y-4">
                  <span className="text-xs font-black text-semrush-orange uppercase tracking-widest block text-left">Pro Agency Plan</span>
                  <div className="flex items-baseline gap-1 text-[#171A21]">
                    <span className="text-4xl font-extrabold font-mono tracking-tight">$19</span>
                    <span className="text-xs text-semrush-orange font-bold font-sans">USD / billed monthly</span>
                  </div>
                  <p className="text-xs text-gray-550 leading-relaxed font-semibold text-left">Designed for bloggers, local business operators, developers and affiliate managers.</p>
                  
                  <ul className="text-xs text-gray-700 space-y-2.5 pt-4 border-t border-gray-150 leading-none font-extrabold text-left">
                    <li className="flex items-center gap-1.5 font-bold"><Check className="h-4 w-4 text-semrush-green" /> Limitless dynamic crawls</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> Gemini priority recommendation maps</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> Professional downloadable PDF exports</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> robots.txt sitemap diagnostics</li>
                    <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-semrush-green" /> Priority 24H ticketing support</li>
                  </ul>
                </div>

                {isPremiumUser ? (
                  <button 
                    disabled
                    className="w-full rounded-xl bg-semrush-green/10 border border-semrush-green/20 text-semrush-green py-3 text-xs font-black uppercase tracking-wider mt-8 cursor-default"
                  >
                    Pro Plan Active ✓
                  </button>
                ) : (
                  <button 
                    onClick={handlePremiumUpgradeAction}
                    className="w-full rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover text-white font-black py-3 text-xs uppercase tracking-wider mt-8 cursor-pointer select-none active:scale-95 transition-transform shadow-md shadow-semrush-orange/20"
                    id="btn-trigger-pro-upgrade"
                  >
                    Upgrade to Premium Pro Tier
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab 6: MY COMPACT REPORTS DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-[#171A21]">Analytic Metrics & History</h2>
              <p className="text-xs text-gray-500 font-semibold">Review historical crawler scans database, select favorite domains, and view ranking trends.</p>
            </div>

            {reportHistory.length > 0 ? (
              <div className="space-y-6">
                
                {/* Evolution charts */}
                <SaaSAnalyticsCharts reports={reportHistory} />

                {/* Sub titles list */}
                <div className="rounded-2xl border border-semrush-border bg-white p-6 overflow-hidden shadow-sm">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4">Saved Audits Log List</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700 font-semibold">
                      <thead>
                        <tr className="border-b border-gray-150 text-gray-400 uppercase font-mono text-[9px] tracking-widest">
                          <th className="py-3 px-4 font-black">Analyzed Domain / Target URL</th>
                          <th className="py-3 px-4 font-black">Crawl timestamp</th>
                          <th className="py-3 px-4 font-black">SEO Score</th>
                          <th className="py-3 px-4 font-black">AdSense status</th>
                          <th className="py-3 px-4 font-black text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-bold">
                        {reportHistory.map((rep) => (
                          <tr 
                            key={rep.id} 
                            onClick={() => { setCurrentReport(rep); setActiveTab("seo-checker"); }}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-900 font-black">
                              <div className="truncate max-w-sm flex items-center gap-2">
                                <button 
                                  onClick={(e) => handleToggleFavorite(rep.id, e)} 
                                  className="text-gray-400 hover:text-amber-500"
                                  aria-label="Star report"
                                >
                                  <Star className={`h-4 w-4 ${favReports.includes(rep.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                                </button>
                                <span className="truncate">{rep.url}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-gray-500">{new Date(rep.timestamp).toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-[#171A21] block font-mono text-xs">{rep.overallScore}/100</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-black px-2.5 py-1 rounded-md leading-none uppercase ${
                                rep.adSenseReadiness.status === 'ready' 
                                  ? 'bg-[#E1F9F2] text-semrush-green' 
                                  : 'bg-amber-50 text-amber-600 border border-amber-200'
                              }`}>
                                {rep.adSenseReadiness.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setPdfReportModel(rep); }}
                                className="text-[10px] text-semrush-orange hover:text-white hover:bg-semrush-orange transition-colors cursor-pointer mr-2 border border-semrush-border bg-white py-1.5 px-3 rounded-lg font-black"
                              >
                                Export Doc
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border border-semrush-border shadow-sm">
                <Database className="h-12 w-12 text-gray-400 opacity-60" />
                <h3 className="text-lg font-black text-[#171A21]">Database cache is raw empty</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  You have not checked any target sites yet. Return to the primary overview screen and initiate your first query logs.
                </p>
                <button onClick={() => setActiveTab("home")} className="rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover px-4 py-3 text-xs font-black text-white cursor-pointer active:scale-95 leading-none shadow-sm">
                  Trigger Audit Scan
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab 7: ABOUT US */}
        {activeTab === "about" && (
          <div className="space-y-12 py-4 animate-in fade-in duration-300">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-semrush-orange bg-semrush-orange/10 py-1 px-3 rounded-full border border-semrush-orange/20">Team Profile</span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-[#171A21] tracking-tight">Meet the Crawling Engineers</h2>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Our mission is simple: demystify sitemaps and cookies rules, making organic monetizing structured, clean and approachable for bloggers.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto pt-4 text-xs text-gray-700 leading-relaxed">
              
              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-3 shadow-sm font-semibold">
                <div className="h-12 w-12 rounded-full bg-semrush-orange flex items-center justify-center font-black text-white text-sm">
                  JD
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#171A21]">Jimmy Daves</h4>
                  <span className="text-semrush-orange block text-[10px] uppercase font-bold tracking-widest mt-0.5">Founder & Bot Specialist</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-semibold">Experienced in crawler log parsing and indexing algorithms. Jimmy spent 8 years optimizing digital media platforms prior to initiating the AuditPro sandbox frameworks.</p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-3 shadow-sm font-semibold">
                <div className="h-12 w-12 rounded-full bg-violet-600 flex items-center justify-center font-black text-white text-sm">
                  AM
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#171A21]">Amara Malik</h4>
                  <span className="text-violet-600 block text-[10px] uppercase font-bold tracking-widest mt-0.5">Policy Assessor Specialist</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-semibold">Amara specializes in Google publisher guidelines, privacy disclosures rules, Doubleclick tracking codes configurations and CCPA directives validation.</p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-3 shadow-sm font-semibold md:col-span-2 lg:col-span-1">
                <div className="h-12 w-12 rounded-full bg-semrush-green flex items-center justify-center font-black text-white text-sm">
                  TP
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#171A21]">Thomas Park</h4>
                  <span className="text-semrush-green block text-[10px] uppercase font-bold tracking-widest mt-0.5">Performance Auditor Lead</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-semibold">A speed performance fanatic. Thomas monitors LCP score averages, gzip packet configurations, response weights and browser inlines styles routines.</p>
              </div>

            </div>

          </div>
        )}

        {/* Tab 8: CONTACT US */}
        {activeTab === "contact" && (
          <div className="grid gap-10 lg:grid-cols-5 py-4 max-w-4xl mx-auto animate-in fade-in duration-300">
            
            {/* Contact Details pane */}
            <div className="lg:col-span-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-semrush-orange bg-semrush-orange/10 py-1 px-3 rounded-full border border-semrush-orange/20 inline-block">Support desk</span>
              <h2 className="text-3xl font-black text-[#171A21] tracking-tight leading-none">Get in Touch</h2>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Need clarifications on meta checking rules, low value content alerts, or API access? Leave us a line. Our support crew responds within 24 hours.
              </p>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-2.5 bg-white p-4 rounded-xl border border-semrush-border shadow-sm font-semibold">
                  <Mail className="h-4.5 w-4.5 text-semrush-orange shrink-0" />
                  <div>
                    <span className="font-extrabold block text-[#171A21]">Email inbox:</span>
                    <span className="text-gray-500 block mt-0.5">support@auditpro_system.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-4 rounded-xl border border-semrush-border shadow-sm font-semibold">
                  <ShieldCheck className="h-4.5 w-4.5 text-semrush-green shrink-0" />
                  <div>
                    <span className="font-extrabold block text-[#171A21]">System Safety active:</span>
                    <p className="text-gray-500 block mt-0.5">TLS secured, zero metadata leaks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form card */}
            <div className="lg:col-span-3 rounded-3xl border border-semrush-border bg-white p-6 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs text-gray-700 font-semibold">
                
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-gray-500 font-black uppercase block tracking-wider text-[10px]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manjeet"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#171A21] focus:outline-none focus:border-semrush-orange transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-550 font-black uppercase block tracking-wider text-[10px]">Email address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vmanjeet773@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#171A21] focus:outline-none focus:border-semrush-orange transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-500 font-black uppercase block tracking-wider text-[10px]">Message Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry or AdSense crawl issue block..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#171A21] focus:outline-none focus:border-semrush-orange leading-relaxed font-bold animate-transition"
                  />
                </div>

                {contactSuccess && (
                  <p className="text-xs font-semibold text-semrush-green flex items-center gap-1.5 py-1 animate-pulse">
                    <CheckCircle className="h-4 w-4" /> Message delivered successfully! Reviewers will reply feedback layout.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover text-white font-black py-3 uppercase tracking-wider cursor-pointer active:scale-95 transition-all text-center leading-none shadow-md shadow-semrush-orange/10"
                >
                  Deliver Message
                </button>

              </form>
            </div>

          </div>
        )}

        {/* Tab 9: SYSTEM ADMINISTRATION */}
        {activeTab === "admin" && (
          <AdminDashboard 
            blogs={blogsList}
            onAddBlog={handleAdminAddBlog}
            onDeleteBlog={handleAdminDeleteBlog}
            messages={adminMessagesList}
            onReplyMessage={handleAdminReplyMessage}
          />
        )}

        {/* Tab 10: SITEMAP XML SCHEMAS */}
        {activeTab === "sitemap" && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto py-4">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-black text-[#171A21]">XML / HTML Sitemap Schema</h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold">Structured repository index mapping mandatory legal sections and support portals parameters.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 text-xs text-gray-700 font-semibold leading-none">
              
              <div className="rounded-2xl border border-semrush-border p-5 space-y-4 bg-white shadow-sm">
                <span className="font-extrabold text-semrush-orange block uppercase tracking-wider">Primary Content Pages:</span>
                
                <div className="space-y-2.5">
                  <button onClick={() => setActiveTab("home")} className="hover:text-semrush-orange transition-colors block text-left">/index.html — Landing page Overview</button>
                  <button onClick={() => setActiveTab("seo-checker")} className="hover:text-semrush-orange transition-colors block text-left">/seo-checker — Audit Dashboard</button>
                  <button onClick={() => setActiveTab("adsense-checker")} className="hover:text-semrush-orange transition-colors block text-left">/adsense-ready — Google Safety Evaluator</button>
                  <button onClick={() => setActiveTab("blog")} className="hover:text-semrush-orange transition-colors block text-left">/blog — Monetization Growth Articles</button>
                  <button onClick={() => setActiveTab("pricing")} className="hover:text-semrush-orange transition-colors block text-left">/pricing — Subscriptions matrix</button>
                </div>
              </div>

              <div className="rounded-2xl border border-semrush-border p-5 space-y-4 bg-white shadow-sm">
                <span className="font-extrabold text-semrush-green block uppercase tracking-wider">Compliance & legal:</span>
                
                <div className="space-y-2.5">
                  <button onClick={() => setActiveTab("privacy")} className="hover:text-semrush-green transition-colors block text-left">/privacy-policy — Cookies & EU rules</button>
                  <button onClick={() => setActiveTab("disclaimer")} className="hover:text-semrush-green transition-colors block text-left">/disclaimer — Earnings affiliations disclosure</button>
                  <button onClick={() => setActiveTab("terms")} className="hover:text-semrush-green transition-colors block text-left">/terms-conditions — Terms agreements</button>
                  <button onClick={() => setActiveTab("about")} className="hover:text-semrush-green transition-colors block text-left">/profiles — Team backgrounds Profiles</button>
                  <button onClick={() => setActiveTab("contact")} className="hover:text-semrush-green transition-colors block text-left">/contact-support — Contact mailbox Form</button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* HELP COMPLIANCE LEGAL SITES:滿足Google Crawling審核要求 */}
        {activeTab === "privacy" && (
          <div className="prose prose-invert max-w-3xl mx-auto space-y-4 py-4 animate-in fade-in duration-300 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-xl sm:text-3.5xl font-black text-[#171A21] tracking-tight border-b border-gray-200 pb-3">Website Privacy Policy</h2>
            <p className="text-xs text-gray-400 font-semibold">Effective Date: June 15, 2026. This Privacy Policy documents cookie declarations satisfies EU consent directives and California privacy rules (CCPA).</p>
            
            <h3 className="text-base font-black text-[#171A21] pt-4">1. Collection of Information</h3>
            <p className="font-semibold">We automatically collect general machine data when you query website addresses on our analyzer search box. This data includes requested URLs, scanned tag elements count, crawl timestamps, and performance responsiveness coefficients.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">2. Cookies & Third-Party Advertising</h3>
            <p className="font-semibold">We utilize standard advertisement platforms including Google AdSense. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites or other sites on the Internet.</p>
            <p className="font-semibold">Users may opt out of personalized advertising by visiting the Google Ads Settings page or opt-out options listed under the Network Advertising Initiative.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">3. California CCPA Rights</h3>
            <p className="font-semibold">In accordance with California Consumer Privacy Act directives, California residents keep the explicit right to request deletion of any persisted logs data. Contact our support desk if you want to request deletions.</p>
          </div>
        )}

        {activeTab === "disclaimer" && (
          <div className="prose prose-invert max-w-3xl mx-auto space-y-4 py-4 animate-in fade-in duration-300 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-xl sm:text-3.5xl font-black text-[#171A21] tracking-tight border-b border-gray-200 pb-3">Third-Party Earnings & Affiliate Disclaimer</h2>
            <p className="text-xs text-gray-400 font-semibold">Effective Date: Today. satisfy standard publisher safety requirements.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">1. Representational Diagnostics Only</h3>
            <p className="font-semibold">AuditPro is a diagnostic scanner designed to help operators optimize structures and detect potential configuration issues. We make no guaranteed representations that passing our crawler checklists will assure approval by Google AdSense. Final reviewer actions are purely proprietary to Google Inc.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">2. Promotional Affiliate Disclosures</h3>
            <p className="font-semibold">Certain links printed on our blogs, pricing sections, or recommendation charts may be promotional affiliate links. This means we may receive standard commissions at no additional consequence or cost to you if you purchase upgraded subscriptions. All recommendations remain objective.</p>
          </div>
        )}

        {activeTab === "terms" && (
          <div className="prose prose-invert max-w-3xl mx-auto space-y-4 py-4 animate-in fade-in duration-300 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-xl sm:text-3.5xl font-black text-[#171A21] tracking-tight border-b border-gray-200 pb-3">Service Terms & Agreements</h2>
            <p className="text-xs text-gray-400 font-semibold">Effective Date: June 15, 2026.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">1. Use of Scanner Services</h3>
            <p className="font-semibold">You agree to trigger scan crawls only on domains you rightfully operate or maintain authorization to audit. You are strictly prohibited from utilizing bots, scripts or scraping packages to initiate continuous loops of requests that degrade server performance.</p>

            <h3 className="text-base font-black text-[#171A21] pt-4">2. Liability Limits</h3>
            <p className="font-semibold">In no occurrence shall AuditPro Ltd., its founders, or affiliates, be held responsible for server crashes, search engine rank degradations, or AdSense manual rejections happening on scanned target domains.</p>
          </div>
        )}

        {/* Collapsible Helper FAQ Page Tab */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto space-y-8 py-4 animate-in fade-in duration-300">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-black text-[#171A21]">Helper FAQ Portal</h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold">Quick answers regarding robots, sitemap checks, crawling procedures, and how long approval processes take.</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              
              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-2 shadow-sm">
                <h4 className="font-extrabold text-[#171A21] flex items-center gap-1.5"><HelpCircle className="h-4.5 w-4.5 text-semrush-orange font-bold" /> What is Largest Contentful Paint (LCP)?</h4>
                <p className="text-gray-500 leading-relaxed font-semibold">
                  LCP is a core Web Vital that monitors how fast the largest visual graphic element renders in the browser. Values under 2.5 seconds keep web crawlers content, ensuring better mobile friendly ranking parameters.
                </p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-2 shadow-sm">
                <h4 className="font-extrabold text-[#171A21] flex items-center gap-1.5"><HelpCircle className="h-4.5 w-4.5 text-semrush-orange font-bold" /> Why must websites feature a Privacy Policy on footers?</h4>
                <p className="text-gray-500 leading-relaxed font-semibold">
                  Google publisher regulations require disclosure warning users about cookies used by services like AdSense. If you compile this agreement, manual assessors will promptly approve your site.
                </p>
              </div>

              <div className="rounded-2xl border border-semrush-border bg-white p-5 space-y-2 shadow-sm">
                <h4 className="font-extrabold text-[#171A21] flex items-center gap-1.5"><HelpCircle className="h-4.5 w-4.5 text-semrush-orange font-bold" /> Does AuditPro support XML Sitemaps?</h4>
                <p className="text-gray-500 leading-relaxed font-semibold">
                  Absolutely! We inspect your domain robots.txt directives, verify that sitemap pointers resolve cleanly, and test if Google can read your indexed blog pages without crawl blocks.
                </p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Persistent global footer satisfaction of compliance */}
      <Footer setActiveTab={setActiveTab} />

      {/* LOGIN POPUP MODAL DIALOG */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#171A21]/70 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-semrush-border bg-white p-6 space-y-5 relative shadow-2xl">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">Sign In to AuditPro</span>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="rounded-lg p-1.5 hover:bg-gray-100 text-[#171A21] cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-gray-700 font-semibold">
              <div className="space-y-1.5">
                <label className="text-gray-500 block font-black uppercase text-[10px]">Email / Username</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vmanjeet773@gmail.com"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#171A21] focus:outline-none focus:border-semrush-orange font-bold transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500 block font-black uppercase text-[10px]">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#171A21] focus:outline-none focus:border-semrush-orange font-bold transition-all"
                />
              </div>

              <div className="rounded-xl bg-semrush-orange/5 p-3.5 border border-semrush-orange/10 text-[11px] text-[#FF640D] leading-relaxed font-bold">
                <strong>Development Override Notice:</strong> Enter test credentials like <code>vmanjeet773@gmail.com</code> of any standard format. Unlocks dashboard catalogs saving!
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-semrush-orange hover:bg-semrush-orange-hover text-white font-black py-3.5 uppercase tracking-wider cursor-pointer active:scale-95 transition-transform leading-none shadow-md shadow-semrush-orange/20"
              >
                Sign In to Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HIGHER PDF EXPORTER COMPACT VIEW OVERLAY */}
      {pdfReportModel && (
        <PDFReportPreview 
          report={pdfReportModel} 
          onClose={() => setPdfReportModel(null)} 
        />
      )}

    </div>
  );
}
