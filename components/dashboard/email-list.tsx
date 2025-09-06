"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EmailDetail } from "./email-detail"
import {
  Search,
  Filter,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  Clock,
  CheckCircle2,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  timestamp: string
  priority: "low" | "medium" | "high" | "urgent"
  category: "general" | "technical" | "billing" | "sales" | "complaint"
  status: "unread" | "read" | "responded" | "archived"
  isStarred: boolean
  aiSummary?: string
  confidenceScore?: number
}

// Mock data for demonstration
const mockEmails: Email[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah@techcorp.com",
    subject: "Urgent: Server downtime affecting production",
    preview:
      "We're experiencing critical server issues that are impacting our production environment. The main database server went down at 2:30 PM EST...",
    timestamp: "2 min ago",
    priority: "urgent",
    category: "technical",
    status: "unread",
    isStarred: true,
    aiSummary:
      "Critical server outage requiring immediate attention. Database server failure at 2:30 PM EST affecting production.",
    confidenceScore: 0.95,
  },
  {
    id: "2",
    sender: "Mike Chen",
    senderEmail: "mike@startup.io",
    subject: "Question about API integration pricing",
    preview:
      "Hi there! I'm interested in integrating your API into our platform. Could you provide more details about the pricing structure for enterprise...",
    timestamp: "15 min ago",
    priority: "high",
    category: "sales",
    status: "unread",
    isStarred: false,
    aiSummary: "Sales inquiry about API integration pricing for enterprise use. Potential high-value customer.",
    confidenceScore: 0.88,
  },
  {
    id: "3",
    sender: "Emma Wilson",
    senderEmail: "emma@design.co",
    subject: "Thank you for the quick resolution!",
    preview:
      "I wanted to reach out and thank your team for the incredibly fast response to our support ticket. The issue was resolved within hours...",
    timestamp: "1 hour ago",
    priority: "low",
    category: "general",
    status: "read",
    isStarred: false,
    aiSummary: "Positive feedback thanking team for quick support resolution. Customer satisfaction confirmation.",
    confidenceScore: 0.92,
  },
  {
    id: "4",
    sender: "David Rodriguez",
    senderEmail: "david@finance.com",
    subject: "Billing discrepancy - Invoice #INV-2024-001",
    preview:
      "I've noticed a discrepancy in our latest invoice. The amount charged doesn't match our agreed-upon pricing structure...",
    timestamp: "3 hours ago",
    priority: "medium",
    category: "billing",
    status: "responded",
    isStarred: false,
    aiSummary:
      "Billing inquiry about invoice discrepancy. Requires review of pricing agreement and invoice correction.",
    confidenceScore: 0.91,
  },
  {
    id: "5",
    sender: "Lisa Park",
    senderEmail: "lisa@marketing.agency",
    subject: "Partnership opportunity discussion",
    preview:
      "We're a growing marketing agency and would love to explore potential partnership opportunities with your company...",
    timestamp: "5 hours ago",
    priority: "medium",
    category: "sales",
    status: "read",
    isStarred: true,
    aiSummary: "Partnership inquiry from marketing agency. Potential business development opportunity.",
    confidenceScore: 0.85,
  },
]

interface EmailListProps {
  activeView: string
}

export function EmailList({ activeView }: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-500"
      case "billing":
        return "bg-purple-500"
      case "sales":
        return "bg-emerald-500"
      case "complaint":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Clock className="w-3 h-3" />
      case "responded":
        return <CheckCircle2 className="w-3 h-3" />
      case "archived":
        return <Archive className="w-3 h-3" />
      default:
        return null
    }
  }

  if (selectedEmailId) {
    return <EmailDetail emailId={selectedEmailId} onBack={() => setSelectedEmailId(null)} />
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="glass-nav p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{activeView}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockEmails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "glass-card p-4 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer",
              email.status === "unread" && "bg-white/15 border-l-4 border-l-blue-500",
            )}
            onClick={() => setSelectedEmailId(email.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{email.sender}</h3>
                    {email.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{email.senderEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("text-xs text-white border-0", getPriorityColor(email.priority))}
                >
                  {email.priority}
                </Badge>
                <Badge
                  variant="secondary"
                  className={cn("text-xs text-white border-0", getCategoryColor(email.category))}
                >
                  {email.category}
                </Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">{email.timestamp}</span>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="font-medium text-slate-900 dark:text-white mb-1 text-balance">{email.subject}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 text-pretty">{email.preview}</p>
            </div>

            {email.aiSummary && (
              <div className="mb-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">AI Summary</span>
                  {email.confidenceScore && (
                    <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-600 dark:text-blue-400">
                      {Math.round(email.confidenceScore * 100)}% confidence
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 text-pretty">{email.aiSummary}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(email.status)}
                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{email.status}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                  <Reply className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                  <Forward className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                  <Archive className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:glass hover:bg-white/10">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
