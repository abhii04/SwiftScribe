"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: 12, color: "bg-blue-500" },
    { id: "unread", label: "Unread", icon: Mail, count: 8, color: "bg-orange-500" },
    { id: "urgent", label: "Urgent", icon: AlertCircle, count: 3, color: "bg-red-500" },
    { id: "pending", label: "Pending", icon: Clock, count: 5, color: "bg-yellow-500" },
    { id: "responded", label: "Responded", icon: CheckCircle2, count: 24, color: "bg-green-500" },
    { id: "starred", label: "Starred", icon: Star, count: 7, color: "bg-amber-500" },
    { id: "sent", label: "Sent", icon: Send, count: 18, color: "bg-purple-500" },
    { id: "archived", label: "Archived", icon: Archive, count: 156, color: "bg-gray-500" },
    { id: "trash", label: "Trash", icon: Trash2, count: 2, color: "bg-slate-500" },
  ]

  const bottomItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 h-screen glass-sidebar border-r border-white/10 p-4 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center glass shadow-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">AI Assistant</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Email Management</p>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeView === item.id
                ? "glass bg-white/20 text-slate-900 dark:text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400 hover:glass hover:bg-white/10",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
            {item.count > 0 && (
              <Badge variant="secondary" className={cn("text-xs text-white border-0 shadow-sm", item.color)}>
                {item.count}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4 space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeView === item.id
                ? "glass bg-white/20 text-slate-900 dark:text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400 hover:glass hover:bg-white/10",
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
