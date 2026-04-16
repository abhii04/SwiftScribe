"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Inbox,
  Send,
  Archive,
  Star,
  Trash2,
  Settings,
  BarChart3,
  BookOpen,
  Plus,
  Mail,
  AlertCircle,
  Clock,
  CheckCircle2,
  Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEmails } from "@/hooks/useSupabaseData"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" })
  const { addEmail } = useEmails("inbox")

  const handleCompose = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addEmail({
        recipient: composeData.to,
        sender: "Current User",
        sender_email: "me@company.com", // normally from Auth
        subject: composeData.subject,
        body: composeData.body,
        category: "general",
        status: "unread",
        priority: "medium",
        is_starred: false,
      })
      alert("Email saved successfully!")
      setIsComposeOpen(false)
      setComposeData({ to: "", subject: "", body: "" })
    } catch (err: any) {
      alert("Failed to compose: " + err.message)
    }
  }

  const menuItems = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "unread", label: "Unread", icon: Mail },
    { id: "urgent", label: "Urgent", icon: AlertCircle },
    { id: "pending", label: "Pending", icon: Clock },
    { id: "responded", label: "Responded", icon: CheckCircle2 },
    { id: "starred", label: "Starred", icon: Star },
    { id: "sent", label: "Sent", icon: Send },
    { id: "archived", label: "Archived", icon: Archive },
    { id: "trash", label: "Trash", icon: Trash2 },
  ]

  const bottomItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 h-screen bg-[#030304] border-r border-[#1E293B] p-4 flex flex-col font-body">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 border border-[#F7931A]/30 bg-[#F7931A]/10 rounded-xl flex items-center justify-center shadow-gold-accent">
             <Cpu className="w-5 h-5 text-[#F7931A]" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-white tracking-widest text-sm uppercase">SwiftScribe</h2>
            <p className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-widest">Network Active</p>
          </div>
        </div>

        <Button onClick={() => setIsComposeOpen(true)} className="w-full font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 min-h-[44px] border-0">
          <Plus className="w-4 h-4 mr-2" />
          Draft Entity
        </Button>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent",
              activeView === item.id
                ? "bg-[#EA580C]/10 border-[#F7931A]/30 text-[#F7931A] shadow-[inset_2px_0_0_#F7931A]"
                : "text-[#94A3B8] hover:bg-[#0F1115] hover:border-white/10 hover:text-white",
            )}
          >
            <div className="flex items-center gap-3 font-mono tracking-widest uppercase text-xs">
              <item.icon className={cn("w-4 h-4", activeView === item.id ? "text-[#F7931A]" : "text-[#94A3B8]")} />
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="border-t border-[#1E293B] pt-4 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent",
              activeView === item.id
                ? "bg-[#EA580C]/10 border-[#F7931A]/30 text-[#F7931A] shadow-[inset_2px_0_0_#F7931A]"
                : "text-[#94A3B8] hover:bg-[#0F1115] hover:border-white/10 hover:text-white",
            )}
          >
            <item.icon className={cn("w-4 h-4", activeView === item.id ? "text-[#F7931A]" : "text-[#94A3B8]")} />
            <span className="font-mono tracking-widest uppercase text-xs">{item.label}</span>
          </button>
        ))}
      </div>

      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0F1115] border border-math w-full max-w-lg rounded-2xl shadow-[0_0_50px_-10px_rgba(247,147,26,0.1)] overflow-hidden font-body">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="font-heading text-xl font-bold text-white tracking-widest uppercase">Construct Entity</h3>
              <button onClick={() => setIsComposeOpen(false)} className="text-[#94A3B8] hover:text-[#F7931A] transition-colors">
                ✕
              </button>
            </div>
            <form onSubmit={handleCompose} className="p-6 space-y-6">
              <div>
                <Input 
                  placeholder="Destination Address" 
                  value={composeData.to} 
                  onChange={e => setComposeData({...composeData, to: e.target.value})}
                  className="bg-black/50 border-0 border-b-2 border-white/20 h-12 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 placeholder:text-white/30 font-mono"
                  required
                />
              </div>
              <div>
                <Input 
                  placeholder="Subject Hash / Topic" 
                  value={composeData.subject} 
                  onChange={e => setComposeData({...composeData, subject: e.target.value})}
                  className="bg-black/50 border-0 border-b-2 border-white/20 h-12 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 placeholder:text-white/30 font-mono"
                  required
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Enter block data..." 
                  rows={6}
                  value={composeData.body} 
                  onChange={e => setComposeData({...composeData, body: e.target.value})}
                  className="bg-black/50 border-0 border-b-2 border-white/20 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 placeholder:text-white/30 resize-none font-mono"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsComposeOpen(false)} className="font-heading uppercase tracking-wider text-white hover:bg-white/10 hover:text-[#F7931A]">Abort</Button>
                <Button type="submit" className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0">Transmit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
