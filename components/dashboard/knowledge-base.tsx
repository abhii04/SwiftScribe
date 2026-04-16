"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, BookOpen, Edit3, Trash2, Eye, Tag, Calendar, User, FileText, Save, X, Hash, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface KnowledgeArticle {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  author: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  views: number
}

import { useArticles } from "@/hooks/useSupabaseData"

const categories = ["All", "Technical Support", "Sales", "Billing", "General", "Product"]

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreating, setIsCreating] = useState(false)
  const [editingArticle, setEditingArticle] = useState<KnowledgeArticle | null>(null)
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "General",
    tags: [] as string[],
    tagInput: "",
  })

  const { articles, isLoading, addArticle, updateArticle, deleteArticle } = useArticles()

  const filteredArticles = articles.filter((article: any) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags || []).some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddTag = () => {
    if (newArticle.tagInput.trim() && !newArticle.tags.includes(newArticle.tagInput.trim())) {
      setNewArticle({
        ...newArticle,
        tags: [...newArticle.tags, newArticle.tagInput.trim()],
        tagInput: "",
      })
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewArticle({
      ...newArticle,
      tags: newArticle.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSaveArticle = async () => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, {
          title: newArticle.title || editingArticle.title,
          content: newArticle.content || editingArticle.content,
          category: newArticle.category || editingArticle.category,
          tags: newArticle.tags.length ? newArticle.tags : editingArticle.tags,
          updated_at: new Date().toISOString()
        })
      } else {
        await addArticle({
          title: newArticle.title,
          content: newArticle.content,
          category: newArticle.category,
          tags: newArticle.tags,
          author: "Root Node" // Or fetch from auth
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsCreating(false)
      setEditingArticle(null)
      setNewArticle({
        title: "",
        content: "",
        category: "General",
        tags: [],
        tagInput: "",
      })
    }
  }

  if (isCreating || editingArticle) {
    return (
      <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
        <div className="bg-[#0F1115] p-6 border-b border-math z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading uppercase text-white tracking-widest">
                {isCreating ? "Construct Data Document" : "Modify Data Document"}
              </h1>
              <p className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-widest mt-2">
                {isCreating ? "Initialize new truth node" : "Overwrite existing sequence"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setEditingArticle(null)
                }}
                className="font-heading uppercase tracking-widest text-[#94A3B8] border-math bg-transparent hover:border-white/40 hover:text-white text-xs h-[40px]"
              >
                <X className="w-3 h-3 mr-2" />
                Abort
              </Button>
              <Button
                onClick={handleSaveArticle}
                className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0 h-[40px] px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                Commit Block
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 z-10 relative">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="crypto-glass-block">
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">
                    Document Identifier
                  </label>
                  <Input
                    placeholder="Enter block title..."
                    value={newArticle.title || (editingArticle?.title ?? "")}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">
                      Routing Tag
                    </label>
                    <select
                      value={newArticle.category || (editingArticle?.category ?? "General")}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:outline-none focus:ring-0 font-mono outline-none"
                    >
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category} className="bg-[#0F1115]">
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">Metadata Hash</label>
                    <div className="flex gap-2 items-center border-b-2 border-white/20 focus-within:border-[#F7931A] bg-black/50 h-10 transition-colors">
                      <Input
                        placeholder="Add tag..."
                        value={newArticle.tagInput}
                        onChange={(e) => setNewArticle({ ...newArticle, tagInput: e.target.value })}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        className="bg-transparent border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none focus:ring-0 text-white font-mono text-xs w-full"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="ghost"
                        className="text-[#94A3B8] hover:text-[#F7931A] h-full rounded-none"
                      >
                        <Hash className="w-4 h-4" />
                      </Button>
                    </div>
                    {((newArticle.tags.length > 0 ? newArticle.tags : editingArticle?.tags) || []).filter(Boolean).length > 0 && (
                       <div className="flex flex-wrap gap-2 mt-4">
                         {((newArticle.tags.length > 0 ? newArticle.tags : editingArticle?.tags) || []).map((tag: string) => (
                           <Badge
                             key={tag}
                             variant="outline"
                             className="bg-blue-900/20 text-blue-400 border border-blue-500 font-mono tracking-widest uppercase text-[10px]"
                           >
                             {tag}
                             <button onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-[#EA580C]">
                               <X className="w-3 h-3" />
                             </button>
                           </Badge>
                         ))}
                       </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2 border-t border-math pt-4">Data Payload</label>
                  <Textarea
                    placeholder="Input sequence... (Markdown protocol supported)"
                    value={newArticle.content || (editingArticle?.content ?? "")}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="min-h-[400px] bg-black/50 border-0 border-l-2 border-b-2 border-white/10 text-white rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.2)] focus-visible:outline-none focus:ring-0 font-mono text-sm leading-relaxed resize-none p-4"
                  />
                  <p className="font-mono text-[10px] text-[#F7931A] tracking-widest uppercase mt-4">
                    > Markdown Support Active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
      <div className="bg-[#0F1115] p-6 border-b border-math z-10 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white capitalize tracking-wide bg-gradient-to-r from-[#FFD600] to-[#F7931A] bg-clip-text text-transparent">
              Truth Base
            </h1>
            <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-2">
              Query algorithms and immutable responses
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0 text-xs px-6 h-10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Initialize Block
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <Input
              placeholder="Search data records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-transparent border-0 border-b-2 border-white/20 rounded-none h-12 text-white placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono text-sm uppercase tracking-widest"
            />
          </div>
          <div className="flex items-center gap-1 bg-black/40 border border-math rounded-lg p-1 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "h-8 px-4 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-[#EA580C]/20 text-[#F7931A] shadow-gold-accent"
                    : "text-[#94A3B8] hover:bg-white/10 hover:text-white",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 z-10 relative">
        <div className="max-w-6xl mx-auto">
           {isLoading ? (
               <div className="text-center py-20 font-mono text-[#94A3B8] uppercase tracking-widest flex justify-center items-center gap-3">
                  <Cpu className="w-6 h-6 animate-pulse text-[#FFD600]" /> Querying Data Nodes...
               </div>
           ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article: any) => (
              <div
                key={article.id}
                className="crypto-block group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-[#F7931A]/30 bg-[#F7931A]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#F7931A]" />
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono tracking-widest uppercase border-[#FFD600]/30 text-[#FFD600] rounded-sm bg-[#FFD600]/5 mb-1"
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#94A3B8] hover:text-[#FFD600] bg-transparent border-0 hover:bg-transparent">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingArticle(article)}
                      className="h-8 w-8 p-0 text-[#94A3B8] hover:text-[#F7931A] bg-transparent border-0 hover:bg-transparent"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteArticle(article.id)} className="h-8 w-8 p-0 text-[#94A3B8] hover:text-red-500 bg-transparent border-0 hover:bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-heading font-medium text-white mb-3 text-balance tracking-wide uppercase line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-[#94A3B8] font-body mb-6 line-clamp-3 leading-relaxed">
                  {article.content.replace(/[#*]/g, "").substring(0, 150)}...
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(article.tags || []).slice(0, 3).map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[9px] font-mono tracking-widest uppercase border-white/20 text-[#94A3B8] rounded"
                    >
                      <Tag className="w-2 h-2 mr-1 opacity-50" />
                      {tag}
                    </Badge>
                  ))}
                  {(article.tags || []).length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-[9px] font-mono tracking-widest uppercase border-white/20 text-[#94A3B8] rounded"
                    >
                      +{(article.tags || []).length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider border-t border-math pt-3 group-hover:border-[#EA580C]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#EA580C]" />
                      <span className="truncate max-w-[80px]">{article.author || "Root"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#FFD600]" />
                      <span>{article.views || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#F7931A]" />
                    <span>{article.updated_at ? new Date(article.updated_at).toLocaleDateString() : ""}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-20 flex justify-center">
              <div className="crypto-glass-block max-w-md">
                <FileText className="w-12 h-12 text-[#1E293B] mx-auto mb-6" />
                <h3 className="font-heading text-xl font-bold text-white mb-2 uppercase tracking-widest">No Documents Found</h3>
                <p className="font-mono text-xs text-[#94A3B8] mb-8 leading-relaxed">
                  {searchQuery || selectedCategory !== "All"
                    ? "Adjust search parameters to locate specific blocks."
                    : "No data mapped. Initialize your first truth document."}
                </p>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover transition-all duration-300 border-0 h-10 px-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Initialize Block
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
