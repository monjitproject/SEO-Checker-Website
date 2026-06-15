import React, { useState } from "react";
import { 
  Database, Users, FileText, Settings, Sparkles, MessageSquare, Plus, Trash2, 
  Check, Mail, ShieldAlert, DollarSign, Eye, RefreshCw, Layers
} from "lucide-react";
import { BlogPost, ContactMessage } from "../types";

interface AdminDashboardProps {
  blogs: BlogPost[];
  onAddBlog: (newBlog: Partial<BlogPost>) => void;
  onDeleteBlog: (id: string) => void;
  messages: ContactMessage[];
  onReplyMessage: (id: string) => void;
}

export default function AdminDashboard({ 
  blogs, 
  onAddBlog, 
  onDeleteBlog, 
  messages, 
  onReplyMessage 
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"users" | "blogs" | "messages" | "config">("users");

  // Create blog inputs
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("SEO Tips");
  const [newContent, setNewContent] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newTags, setNewTags] = useState("");
  const [isPublishingBlog, setIsPublishingBlog] = useState(false);

  // Simulated metrics
  const simulatedStats = {
    totalUsers: 1420,
    premiumSubscribers: 388,
    mrr: 4620,
    totalScansDaily: 143,
    activeApiKeysCount: 1
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsPublishingBlog(true);

    const tagsArray = newTags 
      ? newTags.split(",").map(t => t.trim()) 
      : ["SEO", "Monetization"];

    onAddBlog({
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      excerpt: newExcerpt.trim() || newContent.substring(0, 100) + "...",
      image: newImage.trim() || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: tagsArray,
      author: "Admin Control Panel",
      readTime: `${Math.ceil(newContent.split(" ").length / 200)} min read`
    });

    setNewTitle("");
    setNewContent("");
    setNewExcerpt("");
    setNewImage("");
    setNewTags("");
    setIsPublishingBlog(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Upper info banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">System Administration Panel</h3>
          </div>
          <p className="text-xs text-slate-450 text-slate-400 mt-1">
            Global diagnostic monitoring console. Modify blog guides, simulate contact feedback, and track subscription metrics.
          </p>
        </div>

        {/* Sub tab selectors */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-805 border-slate-800">
          {(["users", "blogs", "messages", "config"] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubTab(sub)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === sub 
                  ? "bg-slate-950 text-white font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === "users" && (
        <div className="space-y-6">
          
          {/* Key metrics blocks */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-slate-900 p-5 bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total SaaS Registered</span>
                <Users className="h-4.5 w-4.5 text-indigo-400" />
              </div>
              <span className="text-2xl font-black text-white mt-1.5 block font-mono">
                {simulatedStats.totalUsers} users
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-medium block mt-1">+14 registered today</span>
            </div>

            <div className="rounded-2xl border border-slate-900 p-5 bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-505 font-bold uppercase tracking-wider text-slate-400">Premium active tier</span>
                <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              </div>
              <span className="text-2xl font-black text-white mt-1.5 block font-mono">
                {simulatedStats.premiumSubscribers} members
              </span>
              <span className="text-[10px] text-indigo-400 font-medium block mt-1">27.3% subscription conversion</span>
            </div>

            <div className="rounded-2xl border border-slate-900 p-5 bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Monthly MRR Recur</span>
                <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
              </div>
              <span className="text-2xl font-black text-white mt-1.5 block font-mono">
                ${simulatedStats.mrr} USD
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">Free tier limits at 3 daily checks</span>
            </div>

            <div className="rounded-2xl border border-slate-900 p-5 bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold tracking-wider uppercase">Scans processed (24H)</span>
                <RefreshCw className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
              </div>
              <span className="text-2xl font-black text-white mt-1.5 block font-mono">
                {simulatedStats.totalScansDaily} audits
              </span>
              <span className="text-[10px] text-emerald-450 text-emerald-400 block mt-1">Crawl limits: 100% capacity</span>
            </div>

          </div>

          {/* Active members review table */}
          <div className="rounded-2xl border border-slate-900 bg-slate-950 p-6 overflow-hidden">
            <h4 className="text-xs font-extrabold uppercase text-indigo-400 tracking-wider mb-4">Granular Users records:</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-widest font-mono text-[10px]">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Subscription Plan</th>
                    <th className="py-3 px-4">Reports Scanned</th>
                    <th className="py-3 px-4">System Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 font-medium leading-none">
                  <tr>
                    <td className="py-3 px-4 text-slate-200">vmanjeet773@gmail.com</td>
                    <td className="py-3 px-4 text-indigo-400">👑 Premium Tier</td>
                    <td className="py-3 px-4 font-mono">24 scans</td>
                    <td className="py-3 px-4"><span className="text-emerald-400 font-bold">Active</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-202 text-slate-300">client_sample@website.io</td>
                    <td className="py-3 px-4 text-slate-400">⏳ Free Tier</td>
                    <td className="py-3 px-4 font-mono">2 scans</td>
                    <td className="py-3 px-4"><span>Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === "blogs" && (
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Create Blog Form */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-900 bg-slate-950 p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Plus className="h-4.5 w-4.5 text-indigo-400" /> Write & Publish New SEO Guideline Article
            </h4>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs text-slate-300">
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Canonical Rewrite parameters"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-900 bg-slate-900 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-510 font-bold uppercase tracking-wider block">Category Layout</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-900 bg-slate-900 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all font-sans"
                  >
                    <option value="AdSense Approval Guides">AdSense Approval Guides</option>
                    <option value="Technical SEO Articles">Technical SEO Articles</option>
                    <option value="Website Optimization Tutorials">Website Optimization Tutorials</option>
                    <option value="SEO Tips">SEO Tips</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider block">Image path / Unsplash URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full rounded-xl border border-slate-950 border border-slate-900 p-2.5 text-xs text-white bg-slate-900 focus:outline-none focus:indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-510 font-bold uppercase tracking-wider block">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="SSL, Page Speed, Canonical"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full rounded-xl border border-slate-900 p-2.5 text-xs text-white bg-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wider block">Excerpt / Summary line</label>
                <input
                  type="text"
                  placeholder="A short tagline overview displayed in card layout grids..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full rounded-xl border border-slate-900 p-2.5 text-xs text-white bg-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold uppercase tracking-wider block">Article Content (Support Markdown tags)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="### 1. Title section&#10;Write parameters detail...&#10;&#10;* Bullet item one&#10;* Bullet item two"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-xl border border-slate-900 p-3 text-xs text-white bg-slate-900 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isPublishingBlog}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white transition-all cursor-pointer select-none active:scale-95 hover:opacity-95"
              >
                {isPublishingBlog ? "Publishing..." : "Publish Article ✓"}
              </button>

            </form>
          </div>

          {/* Manage Existing posts list */}
          <div className="rounded-2xl border border-slate-900 bg-slate-950 p-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Posts database list</h4>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {blogs.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-955 flex items-center justify-between gap-3 border-slate-900">
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">{b.category}</span>
                    <span className="text-xs font-semibold text-white block mt-0.5 truncate">{b.title}</span>
                  </div>
                  <button
                    onClick={() => onDeleteBlog(b.id)}
                    className="rounded-lg p-2 text-red-400 hover:bg-slate-950 hover:text-white shrink-0 active:scale-95 cursor-pointer"
                    aria-label="Delete this post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeSubTab === "messages" && (
        <div className="space-y-4 text-xs text-slate-350">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
            <h4 className="text-sm font-semibold text-white">Contact Messages & Feedbacks Inbox ({messages.length})</h4>
            <p className="text-xs text-slate-500 mt-1">Simulated user inquiries regarding SEO recommendations, pricing structures and premium features.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {messages.map((msg) => (
              <div key={msg.id} className="relative rounded-2xl border border-slate-900 bg-slate-950 p-5">
                <div className="flex items-center justify-between border-b border-sidebar-line/60 pb-2 mb-3 border-slate-900">
                  <div>
                    <span className="font-extrabold text-white block">{msg.name}</span>
                    <span className="text-slate-500 font-mono text-[10px] mt-0.5 block">{msg.email}</span>
                  </div>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    msg.replied ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400 animate-pulse"
                  }`}>
                    {msg.replied ? "Replied ✓" : "Pending Action"}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed font-sans mb-4 min-h-16">
                  &ldquo;{msg.message}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 font-mono">Date: {new Date(msg.date).toLocaleDateString()}</span>
                  {!msg.replied ? (
                    <button
                      onClick={() => onReplyMessage(msg.id)}
                      className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-bold text-indigo-400 hover:text-white hover:bg-indigo-500 transition-all cursor-pointer"
                    >
                      Process Simulated Reply
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Auto Response Dispatched
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "config" && (
        <div className="rounded-2xl border border-slate-900 bg-slate-950 p-6 space-y-6 text-xs text-slate-300">
          <div>
            <h4 className="text-sm font-semibold text-white">System Weights Configurator</h4>
            <p className="text-xs text-slate-500 mt-1">Configure diagnostic crawler heuristics coefficients for simulated audits.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            
            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-900">
              <span className="font-bold text-slate-400 block mb-1">On-Page SEO audit Coefficient:</span>
              <span className="text-lg font-black text-white font-mono block">0.35</span>
              <p className="text-[11px] text-slate-550 text-slate-500">Weight factor applied to tag metrics during diagnostic passes.</p>
            </div>

            <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-900">
              <span className="font-bold text-slate-400 block mb-1">Performance analysis speed factor:</span>
              <span className="text-lg font-black text-white font-mono block font-mono">0.25</span>
              <p className="text-[11px] text-slate-500">Optimizes mobile Vitals loading thresholds.</p>
            </div>

          </div>

          <div className="rounded-xl border border-red-500/10 bg-red-950/5 p-4 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">AdSense Policy Compliance Warning:</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Ensure missing Privacy Disclaimers guidelines coefficient is set to 1.0 (strict fail mode). Setting this lower violates default manual approval reviews directives and halts genuine approval tracking.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
