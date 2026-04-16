"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Star,
  Archive,
  Trash2,
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Clock,
  User,
  Bot,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailDetailProps {
  emailId: string
  onBack: () => void
}

import { useEmail } from "@/hooks/useSupabaseData"

const mockAiResponses = [
  {
    id: "1",
    content: "Request acknowledged. Validation in progress.",
    confidence: 0.95,
    tone: "professional",
  },
  {
    id: "2",
    content: "Incident escalated to Node Security operators.",
    confidence: 0.88,
    tone: "urgent",
  }
]

export function EmailDetail({ emailId, onBack }: EmailDetailProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [customResponse, setCustomResponse] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  
  const { email, isLoading } = useEmail(emailId)

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center h-screen font-mono text-[#94A3B8] tracking-widest uppercase">Decoupling Data Block...</div>
  }

  if (!email) {
    return <div className="flex-1 flex items-center justify-center h-screen font-mono text-red-500 tracking-widest uppercase">Entity Not Resolved.</div>
  }

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
        return "bg-blue-900 text-blue-400 border border-blue-500"
      case "billing":
        return "bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]"
      case "sales":
        return "bg-emerald-900 text-emerald-400 border border-emerald-500"
      case "complaint":
        return "bg-red-900 text-red-400 border border-red-500"
      default:
        return "bg-[#1E293B] text-[#94A3B8] border border-white/20"
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#0F1115] p-6 border-b border-math z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="font-heading uppercase tracking-widest text-[#94A3B8] hover:text-white border-math bg-transparent hover:border-[#F7931A]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return
            </Button>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn("text-[10px] uppercase font-mono tracking-widest rounded-sm", getPriorityColor(email.priority || 'medium'))}
              >
                {email.priority || 'medium'}
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-[10px] uppercase font-mono tracking-widest rounded-sm", getCategoryColor(email.category || 'general'))}
              >
                {email.category || 'general'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-[#FFD600] border-math bg-transparent">
              <Star className={cn("w-4 h-4", email.is_starred && "text-[#FFD600] fill-current")} />
            </Button>
            <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-[#EA580C] border-math bg-transparent">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-red-500 border-math bg-transparent">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-white border-math bg-transparent">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto z-10 relative">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          {/* Email Header */}
          <div className="crypto-glass-block relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/5 pointer-events-none"></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border border-[#F7931A]/30">
                  <AvatarFallback className="bg-black/50 text-[#F7931A] font-mono">
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-heading font-semibold text-white tracking-widest uppercase">{email.sender}</h2>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">{email.sender_email}</p>
                  <p className="font-mono text-[10px] text-[#F7931A] tracking-widest uppercase mt-1">To: {email.recipient || "root@system.local"}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-[#94A3B8] tracking-wider uppercase">
                  {email.timestamp ? new Date(email.timestamp).toLocaleString() : ""}
                </p>
                <div className="flex items-center gap-2 mt-2 justify-end">
                  <Clock className="w-3 h-3 text-[#F7931A]" />
                  <span className="font-mono text-[10px] text-[#F7931A] uppercase tracking-widest">{email.status}</span>
                </div>
              </div>
            </div>

            <h1 className="font-heading text-2xl font-bold text-white mb-6 uppercase tracking-wide border-b border-math pb-4">
              {email.subject}
            </h1>

            <div className="prose prose-sm max-w-none text-[#94A3B8] font-body">
              <div className="whitespace-pre-wrap leading-relaxed">{email.body || email.preview}</div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="crypto-glass-block border-[#F7931A]/30 shadow-[0_0_30px_-5px_rgba(234,88,12,0.1)] relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-[#F7931A]/50 bg-[#EA580C]/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FFD600]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white tracking-widest uppercase">System Consensus</h3>
            </div>
            <p className="text-[#94A3B8] font-body leading-relaxed">{email.ai_summary || "No consensus derived."}</p>
          </div>

          {/* AI Response Suggestions */}
          <div className="crypto-glass-block">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[#FFD600]/50 bg-[#FFD600]/10 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#FFD600]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white tracking-widest uppercase">Automated Protocols</h3>
            </div>

            <div className="space-y-4">
              {(email.ai_responses || mockAiResponses).map((response: any, index: number) => (
                <div
                  key={response.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300 font-body cursor-pointer relative overflow-hidden group",
                    selectedResponse === response.id
                      ? "border-[#F7931A] bg-[#EA580C]/10 shadow-bitcoin-primary"
                      : "border-math bg-black/30 hover:border-[#F7931A]/50",
                  )}
                  onClick={() => setSelectedResponse(response.id)}
                >
                  {selectedResponse === response.id && <div className="absolute top-0 right-0 w-2 h-full bg-[#F7931A]"></div>}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest border-[#F7931A]/30 text-[#F7931A] rounded-sm">
                        Protocol {index + 1}
                      </Badge>
                      {response.confidence && (
                         <Badge
                           variant="outline"
                           className="font-mono text-[10px] uppercase tracking-widest border-[#FFD600]/30 text-[#FFD600] rounded-sm"
                         >
                           {Math.round(response.confidence * 100)}% Match
                         </Badge>
                      )}
                      {response.tone && (
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px] uppercase tracking-widest border-white/20 text-[#94A3B8] rounded-sm"
                        >
                          {response.tone}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#94A3B8] hover:text-[#FFD600]">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#94A3B8] hover:text-[#EA580C]">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                    {response.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Editor */}
          <div className="crypto-block">
            <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
              <h3 className="font-heading text-lg font-bold text-white tracking-widest uppercase">Constructor Interface</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="font-heading tracking-widest uppercase text-xs border-math bg-transparent text-[#94A3B8] hover:text-white"
                >
                  <Edit3 className="w-3 h-3 mr-2" />
                  {isEditing ? "Read Only" : "Modify"}
                </Button>
                <Button variant="outline" size="sm" className="font-heading tracking-widest uppercase text-xs border border-[#F7931A]/50 bg-[#F7931A]/10 text-[#F7931A] hover:bg-[#F7931A]/20">
                  <Zap className="w-3 h-3 mr-2 text-[#FFD600]" />
                  Compute Hash
                </Button>
              </div>
            </div>

            <Textarea
              placeholder={
                selectedResponse
                  ? "Selected protocol loaded. Awaiting modification..."
                  : "Input transaction parameters or select protocol above..."
              }
              value={
                selectedResponse
                  ? (email.ai_responses || mockAiResponses).find((r: any) => r.id === selectedResponse)?.content || ""
                  : customResponse
              }
              onChange={(e) => setCustomResponse(e.target.value)}
              className="min-h-[200px] bg-black/50 border-0 border-l-2 border-b-2 border-white/10 rounded-none text-white focus-visible:border-[#F7931A] focus-visible:ring-0 focus-visible:outline-none font-mono text-sm leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-math gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="font-heading uppercase tracking-widest text-[#94A3B8] bg-transparent border-math hover:border-white/40 hover:text-white text-xs">
                  <Reply className="w-3 h-3 mr-2" />
                  Reply
                </Button>
                <Button variant="outline" size="sm" className="font-heading uppercase tracking-widest text-[#94A3B8] bg-transparent border-math hover:border-white/40 hover:text-white text-xs">
                  <Forward className="w-3 h-3 mr-2" />
                  Proxy
                </Button>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button variant="outline" className="font-heading uppercase tracking-widest text-[#94A3B8] bg-transparent border-math hover:border-white/40 hover:text-white text-xs h-[44px]">
                  Store Block
                </Button>
                <Button className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0 h-[44px] px-6">
                  <Send className="w-4 h-4 mr-2" />
                  Broadcast
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
