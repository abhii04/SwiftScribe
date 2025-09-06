"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { EmailList } from "@/components/dashboard/email-list"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { KnowledgeBase } from "@/components/dashboard/knowledge-base"
import { SettingsPanel } from "@/components/dashboard/settings-panel"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("inbox")

  const renderContent = () => {
    switch (activeView) {
      case "analytics":
        return <AnalyticsDashboard />
      case "knowledge":
        return <KnowledgeBase />
      case "settings":
        return <SettingsPanel />
      default:
        return <EmailList activeView={activeView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        {renderContent()}
      </div>
    </div>
  )
}
