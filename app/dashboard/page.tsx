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
    <div className="min-h-screen bg-[#030304] font-body text-white selection:bg-[#F7931A]/30">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="bg-radial-blur bg-[#EA580C] top-[-10%] left-[-10%]"></div>
        <div className="bg-radial-blur bg-[#FFD600] bottom-[-20%] right-[-20%] opacity-5"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        {renderContent()}
      </div>
    </div>
  )
}
