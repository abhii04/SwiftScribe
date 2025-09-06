"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, BookOpen, Edit3, Trash2, Eye, Tag, Calendar, User, FileText, Save, X, Hash } from "lucide-react"
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

// Mock knowledge base data
const mockArticles: KnowledgeArticle[] = [
  {
    id: "1",
    title: "How to Handle Server Outage Incidents",
    content: `# Server Outage Response Protocol

## Immediate Actions (First 15 minutes)
1. Acknowledge the incident within 5 minutes
2. Escalate to Level 3 support team
3. Assign dedicated engineer
4. Establish communication channel

## Assessment Phase
- Review server logs and monitoring data
- Identify root cause
- Estimate impact and affected users
- Determine recovery timeline

## Communication
- Notify customers via status page
- Send direct communication to enterprise clients
- Provide regular updates every 30 minutes

## Resolution Steps
1. Implement immediate workarounds if available
2. Execute recovery procedures
3. Monitor system stability
4. Conduct post-incident review`,
    category: "Technical Support",
    tags: ["server", "outage", "incident", "emergency"],
    author: "Alex Chen",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    views: 45,
  },
  {
    id: "2",
    title: "API Integration Pricing Guidelines",
    content: `# API Integration Pricing Structure

## Enterprise Tier
- Up to 100,000 requests/month: $299/month
- Up to 500,000 requests/month: $799/month
- Up to 1,000,000 requests/month: $1,499/month
- Custom enterprise solutions available

## Features Included
- 99.9% uptime SLA
- Priority support
- Custom rate limits
- Dedicated account manager
- Advanced analytics

## Implementation Support
- Free setup consultation (2 hours)
- Technical integration support
- Documentation and code samples
- Testing environment access`,
    category: "Sales",
    tags: ["api", "pricing", "enterprise", "integration"],
    author: "Sarah Johnson",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    isActive: true,
    views: 32,
  },
  {
    id: "3",
    title: "Billing Dispute Resolution Process",
    content: `# Billing Dispute Resolution

## Initial Response (Within 24 hours)
1. Acknowledge the dispute
2. Request specific details about the discrepancy
3. Provide case number for tracking
4. Set expectations for resolution timeline

## Investigation Process
- Review billing records and usage data
- Compare with customer's agreement terms
- Identify any system errors or misunderstandings
- Calculate correct charges if applicable

## Resolution Options
- Issue credit for overcharges
- Adjust future billing if ongoing issue
- Provide detailed explanation of charges
- Offer payment plan if needed`,
    category: "Billing",
    tags: ["billing", "dispute", "refund", "process"],
    author: "Mike Rodriguez",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    isActive: true,
    views: 28,
  },
]

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

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleSaveArticle = () => {
    // In a real app, this would save to the database
    console.log("Saving article:", newArticle)
    setIsCreating(false)
    setNewArticle({
      title: "",
      content: "",
      category: "General",
      tags: [],
      tagInput: "",
    })
  }

  if (isCreating || editingArticle) {
    return (
      <div className="flex-1 flex flex-col h-screen">
        <div className="glass-nav p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isCreating ? "Create New Article" : "Edit Article"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {isCreating ? "Add new knowledge base content" : "Update existing article"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setEditingArticle(null)
                }}
                className="glass border-white/20 bg-white/10 backdrop-blur-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveArticle}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Article
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Article Title
                  </label>
                  <Input
                    placeholder="Enter article title..."
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="w-full px-3 py-2 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200 rounded-md text-slate-900 dark:text-white"
                    >
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag..."
                        value={newArticle.tagInput}
                        onChange={(e) => setNewArticle({ ...newArticle, tagInput: e.target.value })}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                        className="glass border-white/20 bg-white/10 backdrop-blur-sm"
                      >
                        <Hash className="w-4 h-4" />
                      </Button>
                    </div>
                    {newArticle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newArticle.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-0"
                          >
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
                  <Textarea
                    placeholder="Write your article content here... (Markdown supported)"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="min-h-[400px] glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200 resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports Markdown formatting. Use # for headings, ** for bold, * for italic, etc.
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
    <div className="flex-1 flex flex-col h-screen">
      <div className="glass-nav p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Knowledge Base
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your AI training content and support documentation
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search articles, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-1 glass rounded-lg p-1 border border-white/20 bg-white/10 backdrop-blur-sm">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "h-8 px-3 text-xs font-medium transition-all duration-200",
                  selectedCategory === category
                    ? "bg-white/20 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-white/10",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="glass-card p-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 mb-1"
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingArticle(article)}
                      className="h-8 w-8 p-0 hover:glass hover:bg-white/10"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-balance line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-pretty">
                  {article.content.replace(/[#*]/g, "").substring(0, 150)}...
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-slate-500/20 text-slate-700 dark:text-slate-300 border-0"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-slate-500/20 text-slate-700 dark:text-slate-300 border-0"
                    >
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 rounded-xl border-0 shadow-lg max-w-md mx-auto">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {searchQuery || selectedCategory !== "All"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by creating your first knowledge base article."}
                </p>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Article
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
