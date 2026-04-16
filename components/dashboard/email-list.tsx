"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EmailDetail } from "./email-detail"
import { useEmails } from "@/hooks/useSupabaseData"
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
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailListProps {
  activeView: string
}

export function EmailList({ activeView }: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)
  
  const { emails: fetchedEmails, isLoading } = useEmails(activeView)

  // Filter based on search query
  const emails = fetchedEmails.filter((e: any) => 
    e.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.preview?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-900 border border-red-500 text-red-500"
      case "high":
        return "bg-[#EA580C]/20 border border-[#EA580C] text-[#EA580C]"
      case "medium":
        return "bg-[#FFD600]/20 border border-[#FFD600] text-[#FFD600]"
      case "low":
        return "bg-emerald-900 border border-emerald-500 text-emerald-500"
      default:
        return "bg-[#1E293B] border border-white/20 text-[#94A3B8]"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "text-[#F7931A]"
      case "billing":
        return "text-[#FFD600]"
      case "sales":
        return "text-emerald-400"
      case "complaint":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Clock className="w-3 h-3 text-[10px]" />
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
    <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
      
      <div className="bg-[#0F1115] p-6 border-b border-math z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold text-white capitalize tracking-wide">{activeView}</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="font-heading uppercase tracking-widest text-[#94A3B8] border-math bg-transparent hover:text-white hover:border-[#F7931A]">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="font-heading text-[#94A3B8] border-math bg-transparent hover:text-white hover:border-[#F7931A]">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-transparent border-0 border-b-2 border-white/20 rounded-none h-12 text-white placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono text-sm uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 relative">
        {isLoading ? (
          <div className="text-center p-8 font-mono text-[#94A3B8] uppercase tracking-widest flex items-center justify-center gap-2">
            <Zap className="animate-pulse w-4 h-4 text-[#F7931A]"/> Extracting Data Blocks...
          </div>
        ) : emails.length === 0 ? (
          <div className="text-center p-8 font-mono text-[#94A3B8] uppercase tracking-widest">No nodes found.</div>
        ) : (
          emails.map((email: any) => (
          <div
            key={email.id}
            className={cn(
              "crypto-block group cursor-pointer",
              email.status === "unread" && "border-l-2 border-l-[#F7931A]",
            )}
            onClick={() => setSelectedEmailId(email.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/20 bg-black/40 rounded-lg flex items-center justify-center text-white">
                  <User className="w-5 h-5 opacity-70" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-white uppercase tracking-wider">{email.sender}</h3>
                    {email.isStarred && <Star className="w-4 h-4 text-[#FFD600] drop-shadow-[0_0_5px_rgba(255,214,0,0.5)] fill-current" />}
                  </div>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase truncate max-w-[200px]">{email.senderEmail}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-mono text-xs text-[#94A3B8] tracking-wider">
                  {email.timestamp ? new Date(email.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}) : ""}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("text-[10px] uppercase font-mono tracking-widest rounded-sm py-0.5", getPriorityColor(email.priority))}>
                    {email.priority}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-heading font-medium text-white mb-2 tracking-wide flex items-center gap-2">
                 <span className={cn("text-[10px] uppercase font-mono tracking-widest", getCategoryColor(email.category))}>[{email.category}]</span> 
                 {email.subject}
              </h4>
              <p className="text-sm text-[#94A3B8] font-body line-clamp-2">{email.preview}</p>
            </div>

            {email.aiSummary && (
              <div className="mb-4 p-4 border-math bg-black/30 backdrop-blur-sm relative overflow-hidden group-hover:border-[#EA580C]/30 transition-colors">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#F7931A] opacity-50"></div>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-4 h-4 text-[#F7931A]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F7931A]">AI Consensus Output</span>
                  {email.confidenceScore && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFD600] ml-auto">
                      CONF: {Math.round(email.confidenceScore * 100)}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#94A3B8] font-body leading-relaxed">{email.aiSummary}</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-math pt-3 mt-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#94A3B8]">
                {getStatusIcon(email.status)}
                {email.status}
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#94A3B8] hover:text-[#F7931A] hover:bg-transparent">
                  <Reply className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#94A3B8] hover:text-[#FFD600] hover:bg-transparent">
                  <Forward className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#94A3B8] hover:text-[#EA580C] hover:bg-transparent">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#94A3B8] hover:text-red-500 hover:bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
