import React, { useState } from "react";
import { 
  Search, Menu, X, Landmark, User, ShieldCheck, 
  ChevronDown, Layers, FileCheck, HelpCircle, LogOut, LayoutDashboard, Database
} from "lucide-react";
import { User as UserType } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: (mode: "login" | "signup") => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onLogout, 
  onOpenAuth 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "seo-checker", label: "SEO Checker" },
    { id: "adsense-checker", label: "AdSense Checker" },
    { id: "blog", label: "Blog Tips" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setShowProductDropdown(false);
    setShowProfileDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick("home")} 
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
              id="nav-logo"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] transition-transform duration-300 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-lg font-extrabold tracking-wider text-transparent">SEO</span>
                </div>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-bold tracking-tight text-white sm:text-base">AuditPro</span>
                <span className="text-[10px] font-medium text-slate-400">AdSense Analyzer</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products Interactive Mega Menu */}
            <div className="relative">
              <button 
                onMouseEnter={() => setShowProductDropdown(true)}
                onClick={() => setShowProductDropdown(!showProductDropdown)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                id="btn-products-menu"
              >
                Scan Tools <ChevronDown className="h-4 w-4 opacity-70" />
              </button>

              {showProductDropdown && (
                <div 
                  onMouseLeave={() => setShowProductDropdown(false)}
                  className="absolute top-full left-0 mt-1 w-80 rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200"
                >
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Analysis Modules</p>
                  <div className="grid gap-2">
                    <button 
                      onClick={() => handleNavClick("seo-checker")}
                      className="flex items-start gap-3 rounded-xl p-2 hover:bg-slate-900/60 text-left transition-colors cursor-pointer"
                    >
                      <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Full SEO Checker</p>
                        <p className="text-xs text-slate-400">Check H1-H2 tags, robots meta, keywords, canonical rules.</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleNavClick("adsense-checker")}
                      className="flex items-start gap-3 rounded-xl p-2 hover:bg-slate-900/60 text-left transition-colors cursor-pointer"
                    >
                      <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">AdSense Readiness Audit</p>
                        <p className="text-xs text-slate-400">Scan for privacy policy, about pages, content standard metrics.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? "bg-slate-900 text-indigo-400 shadow-inner" 
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 pr-3 hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                  style={{ touchAction: "manipulation" }}
                  id="btn-user-profile"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col items-start text-xs leading-tight">
                    <span className="font-semibold text-slate-200">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {currentUser.subscription.plan === "premium" ? "👑 Premium" : "⏳ Free Plan"}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-805 bg-slate-950 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 border-slate-800">
                    <div className="px-3 py-2 border-b border-slate-900">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-300 truncate">{currentUser.email}</p>
                    </div>
                    
                    <div className="p-1 grid gap-1">
                      <button
                        onClick={() => handleNavClick("dashboard")}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-950 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4 text-indigo-400" />
                        User Dashboard
                      </button>

                      <button
                        onClick={() => handleNavClick("admin")}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-950 hover:text-white hover:bg-slate-900 transition-all cursor-pointer text-slate-400 hover:text-indigo-300"
                        id="nav-admin-shortcut"
                      >
                        <Database className="h-4 w-4 text-cyan-400" />
                        Admin Panel
                      </button>

                      <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-400 hover:bg-slate-900 transition-all cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
                  id="btn-header-login"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth("signup")}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
                  id="btn-header-signup"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-full border border-slate-800 text-xs text-indigo-400 font-mono font-bold mr-1">
                {currentUser.subscription.plan === "premium" ? "👑" : "⏳"}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
              id="btn-mobile-hamburger"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="grid gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? "bg-slate-900 text-indigo-400 font-semibold" 
                    : "text-slate-350 text-slate-300 hover:bg-slate-900"
                }`}
                style={{ minHeight: "44px" }}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}

            {currentUser && (
              <>
                <button
                  onClick={() => handleNavClick("dashboard")}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-2"
                  style={{ minHeight: "44px" }}
                >
                  <LayoutDashboard className="h-4 w-4 text-indigo-400" />
                  User Dashboard
                </button>

                <button
                  onClick={() => handleNavClick("admin")}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-2"
                  style={{ minHeight: "44px" }}
                >
                  <Database className="h-4 w-4 text-cyan-450 text-cyan-400" />
                  Admin settings Console
                </button>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-slate-900">
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                      {currentUser.subscription.plan === "premium" ? "👑 Premium" : "Free Plan"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-lg p-2 text-red-400 hover:bg-slate-800 transition-all cursor-pointer"
                  id="mobile-nav-logout"
                  style={{ minHeight: "44px", minWidth: "44px" }}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth("login"); }}
                  className="rounded-xl border border-slate-800 py-2.5 text-center text-sm font-semibold text-slate-300 active:bg-slate-900"
                  style={{ minHeight: "44px" }}
                >
                  Log In
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth("signup"); }}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg active:scale-95"
                  style={{ minHeight: "44px" }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
