import React, { useState } from "react";
import { 
  Search, Calendar, User, Eye, ArrowRight, BookOpen, Clock, Tag, HelpCircle, 
  ChevronRight, Heart, Send, Check
} from "lucide-react";
import { BlogPost, Comment } from "../types";

interface BlogSectionProps {
  posts: BlogPost[];
  onAddPost?: (post: Partial<BlogPost>) => void;
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({
    "post_1": [
      { id: "c1", author: "SEO_Optimist", content: "Following this exact guide saved my site! I published Privacy Policy and Contact pages, and was approved in exactly 4 business days. Thank you!", date: "2026-06-11" },
      { id: "c2", author: "Pavel_Tech", content: "Great explanation on the DoubleClick cookie requirements. Most bloggers overlook that part completely in their privacy statements.", date: "2026-06-13" }
    ],
    "post_2": [
      { id: "c3", author: "CrawlerMaster", content: "A neat configuration file example for robots.txt files. Highly helpful check layout.", date: "2026-06-14" }
    ]
  });

  // Keep track of comment input
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [successCommentMsg, setSuccessCommentMsg] = useState(false);

  // Categories extraction
  const categories = ["All", "AdSense Approval Guides", "Technical SEO Articles", "Website Optimization Tutorials"];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const handleSubmitComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentContent.trim()) return;

    const newCommentObj: Comment = {
      id: `c_${Date.now()}`,
      author: newCommentAuthor.trim(),
      content: newCommentContent.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj]
    }));

    setNewCommentAuthor("");
    setNewCommentContent("");
    setSuccessCommentMsg(true);
    setTimeout(() => setSuccessCommentMsg(false), 3000);
  };

  if (readingPost) {
    const activeComments = comments[readingPost.id] || [];
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
        
        {/* Back and title */}
        <div className="space-y-4">
          <button 
            onClick={() => setReadingPost(null)}
            className="text-xs font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Back to All SEO Tips
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {readingPost.category}
            </span>
            <span className="text-xs text-slate-500 font-medium font-mono">{readingPost.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {readingPost.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-900 pb-4">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-indigo-400" /> By {readingPost.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-indigo-400" /> {readingPost.date}</span>
            <button 
              onClick={(e) => handleLike(readingPost.id, e)}
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer ml-auto"
            >
              <Heart className="h-3.5 w-3.5 fill-pink-500/20 group-hover:fill-pink-500" /> 
              <span>Like post ({likes[readingPost.id] || 8})</span>
            </button>
          </div>
        </div>

        {/* Hero image mockup */}
        <div className="h-72 w-full rounded-3xl overflow-hidden relative border border-slate-900 shadow-xl bg-slate-900">
          <img 
            src={readingPost.image} 
            alt={readingPost.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
          {readingPost.content.split("\n\n").map((para, idx) => {
            if (para.startsWith("### ")) {
              return <h3 key={idx} className="text-lg font-bold text-white pt-4 border-b border-slate-905 border-slate-900 pb-2">{para.replace("### ", "")}</h3>;
            }
            if (para.startsWith("* ")) {
              return (
                <ul key={idx} className="list-disc pl-6 space-y-1.5 text-xs text-slate-350">
                  {para.split("\n").map((li, lIdx) => (
                    <li key={lIdx} className="text-slate-300">{li.replace("* ", "")}</li>
                  ))}
                </ul>
              );
            }
            if (para.startsWith("```")) {
              return (
                <pre key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-900 overflow-x-auto text-xs font-mono text-cyan-400 leading-normal">
                  {para.replace(/```/g, "")}
                </pre>
              );
            }
            return <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{para}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 border-t border-b border-slate-900 py-4">
          {readingPost.tags.map((tag, idx) => (
            <span key={idx} className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg">
              <Tag className="h-3 w-3 text-indigo-400" /> #{tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            Discussions & Comments ({activeComments.length})
          </h4>

          {/* Comment list */}
          <div className="space-y-4">
            {activeComments.map((comment) => (
              <div key={comment.id} className="rounded-2xl border border-slate-905 bg-slate-900/10 p-5 border-slate-900">
                <div className="flex items-center justify-between border-b border-slate-950 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-200">@{comment.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{comment.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Add feedback box */}
          <form onSubmit={(e) => handleSubmitComment(readingPost.id, e)} className="rounded-2xl border border-slate-900 bg-slate-950 p-5 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Add your public comment:</span>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <input 
                type="text" 
                placeholder="Your username/alias (e.g. SEOScout)" 
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="rounded-xl border border-slate-900 bg-slate-900/60 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all font-mono"
                required
              />
            </div>
            
            <textarea 
              rows={3} 
              placeholder="What are your thoughts on this tutorial guide?..." 
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full rounded-xl border border-slate-900 bg-slate-900/60 p-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
              required
            />

            {successCommentMsg && (
              <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-1">
                <Check className="h-4 w-4" /> Your comment has been published to this post successfully!
              </p>
            )}

            <button
              type="submit"
              className="rounded-xl bg-indigo-500 hover:bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white cursor-pointer active:scale-95 flex items-center gap-1.5 transition-all"
            >
              <Send className="h-3.5 w-3.5" /> Publish Comment
            </button>
          </form>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Blog Intro banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
          <BookOpen className="h-5 w-5" />
        </div>
        <h2 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight">The Monetization & Growth Blog</h2>
        <p className="text-xs sm:text-sm text-slate-450 text-slate-400">
          Professional tips, technical guides, sitemaps debugging, and handbooks to pass AdSense manual evaluations.
        </p>
      </div>

      {/* Filter and search utilities */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-900">
        
        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search keywords or articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-900 bg-slate-900/60 py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat 
                  ? "bg-indigo-500 text-white font-bold" 
                  : "bg-slate-900 hover:bg-slate-805 text-slate-400 hover:text-white"
              }`}
            >
              {cat === "All" ? "All categories" : cat.replace(" Articles", "").replace(" Guides", "").replace(" Tutorials", "")}
            </button>
          ))}
        </div>

      </div>

      {/* Grid posts cards */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-900 rounded-3xl text-center">
          <BookOpen className="h-10 w-10 text-indigo-500 mb-2 opacity-50" />
          <p className="text-sm font-semibold text-slate-300">No blog posts found</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting your category or queries rules filter parameters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="group cursor-pointer rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-xl hover:border-indigo-500/20 hover:shadow-indigo-505/10 hover:shadow-indigo-500/10 transition-all flex flex-col justify-between"
              id={`blog-card-${post.slug}`}
            >
              <div>
                {/* Visual graphic mockup */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-900 border-b border-slate-900">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute top-3 left-3 rounded-lg bg-slate-950/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-indigo-400 border border-slate-800">
                    {post.category.replace(" Articles", "").replace(" Guides", "").replace(" Tutorials", "")}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-900/60 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-sans tracking-tight">By {post.author}</span>
                <span className="text-xs font-semibold text-indigo-455 text-indigo-400 group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
