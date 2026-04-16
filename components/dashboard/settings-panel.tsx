"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Shield,
  Bell,
  Palette,
  Key,
  Download,
  Upload,
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Settings,
  Zap,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSettings } from "@/hooks/useSupabaseData"
import React, { useEffect } from "react"

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: any
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "Identity Protocol",
    description: "Manage your cryptographic personal configuration",
    icon: User,
  },
  {
    id: "email",
    title: "Network Relays",
    description: "Connect and audit external routing nodes",
    icon: Mail,
  },
  {
    id: "ai",
    title: "Consensus Engine",
    description: "Customize algorithmic validation strictness",
    icon: Cpu,
  },
  {
    id: "notifications",
    title: "Event Triggers",
    description: "Configure system alerts and telemetry",
    icon: Bell,
  },
  {
    id: "security",
    title: "Security Layers",
    description: "Manage 2FA and cryptographic boundaries",
    icon: Shield,
  },
  {
    id: "appearance",
    title: "Terminal Interface",
    description: "Customize visualization aesthetics",
    icon: Palette,
  },
  {
    id: "integrations",
    title: "API Bindings",
    description: "Manage REST access and token generation",
    icon: Key,
  },
  {
    id: "data",
    title: "Immutable Records",
    description: "Export full block transitions",
    icon: Download,
  },
]

export function SettingsPanel() {
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const { settings, isLoading, saveSettings } = useSettings()

  const [profileData, setProfileData] = useState({
    fullName: "Current User",
    email: "user@example.com",
    role: "User",
    timezone: "America/New_York",
  })

  // Synchronize db settings with local state
  useEffect(() => {
    if (settings) {
      setProfileData({
        fullName: settings.display_name || "",
        email: "user@example.com", // Assuming fetched from auth later
        role: "User",
        timezone: "America/New_York", // Extend DB for these later
      })
    }
  }, [settings])

  const handleSaveChanges = async () => {
    try {
       await saveSettings({
         display_name: profileData.fullName,
       });
       alert("Configuration Transmitted!");
    } catch (e) {
       console.error("Failed to save settings", e);
    }
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="crypto-glass-block">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest mb-6">Identity Registry</h3>
        <div className="flex items-center gap-6 mb-8 border-b border-math pb-6">
          <Avatar className="w-20 h-20 border border-[#F7931A]">
            <AvatarFallback className="bg-gradient-to-br from-[#EA580C] to-[#FFD600] text-black text-xl font-heading font-bold shadow-bitcoin-primary">
              AC
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <Button variant="outline" className="font-heading uppercase tracking-widest text-[#94A3B8] border-math bg-transparent hover:border-[#F7931A] hover:text-[#F7931A] text-xs">
              <Upload className="w-4 h-4 mr-2" />
              Upload Hash
            </Button>
            <p className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-widest">PNG, JPG 2MB Limit</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">Display Alias</label>
            <Input
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">Contact Protocol</label>
            <Input
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">Clearance Level</label>
            <Input
              value={profileData.role}
              onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">Temporal Node</label>
            <select
              value={profileData.timezone}
              onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono outline-none"
            >
              <option value="America/New_York" className="bg-[#0F1115]">Eastern Time (ET)</option>
              <option value="America/Chicago" className="bg-[#0F1115]">Central Time (CT)</option>
              <option value="America/Denver" className="bg-[#0F1115]">Mountain Time (MT)</option>
              <option value="America/Los_Angeles" className="bg-[#0F1115]">Pacific Time (PT)</option>
              <option value="Europe/London" className="bg-[#0F1115]">London (GMT)</option>
              <option value="Europe/Paris" className="bg-[#0F1115]">Paris (CET)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="crypto-glass-block">
        <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
          <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">Network Nodes</h3>
          <Button className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0 text-xs px-4 h-9">
            <Plus className="w-4 h-4 mr-2" />
            Add Node
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/30 border border-math hover:border-[#F7931A]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#ea4335]/20 border border-[#ea4335]/50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#ea4335]" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-white tracking-widest uppercase">Gmail Server</h4>
                <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">support@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-widest border-[#FFD600]/30 text-[#FFD600] rounded-sm">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Active
              </Badge>
              <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-red-500 hover:bg-transparent px-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-black/30 border border-math hover:border-[#F7931A]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#0078d4]/20 border border-[#0078d4]/50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#0078d4]" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-white tracking-widest uppercase">Outlook Server</h4>
                <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">alex@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-widest border-red-500/30 text-red-500 rounded-sm bg-red-900/20">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Sync Failed
              </Badge>
              <Button variant="ghost" size="sm" className="text-[#94A3B8] hover:text-red-500 hover:bg-transparent px-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAISettings = () => (
    <div className="space-y-6">
      <div className="crypto-glass-block">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-math pb-4">Consensus Strictness</h3>
        <div className="space-y-8">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-4">
              Confidence Weight Matrix
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="flex-1 h-1 bg-[#1E293B] appearance-none cursor-pointer accent-[#F7931A]"
              />
              <span className="font-mono text-xs text-[#FFD600] w-12 font-bold shadow-gold-accent bg-[#FFD600]/10 px-2 flex justify-center py-1">80%</span>
            </div>
            <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-4 opacity-50">
               Threshold validation determines automated drafting availability
            </p>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-4">Semantic Target Range</label>
            <select className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:outline-none focus:ring-0 font-mono outline-none">
              <option value="professional" className="bg-[#0F1115]">Strict Formal</option>
              <option value="friendly" className="bg-[#0F1115]">Optimistic Casual</option>
              <option value="formal" className="bg-[#0F1115]">Corporate Protocol</option>
              <option value="casual" className="bg-[#0F1115]">Loosely Structured</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="crypto-glass-block">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-math pb-4">Cryptographic Layer</h3>
        <div className="space-y-6">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">
              Current Cipherkey
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current block cipher"
                className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">New Cipherkey Sequence</label>
            <Input
              type="password"
              placeholder="Generate new sequence"
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] mb-2">
              Validate Cipherkey Sequence
            </label>
            <Input
              type="password"
              placeholder="Re-enter sequence"
              className="w-full bg-black/50 border-0 border-b-2 border-white/20 h-10 px-4 py-2 text-white text-sm rounded-none focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none focus:ring-0 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="crypto-glass-block">
        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-math pb-4">Multi-factor Shielding</h3>
        <div className="flex items-center justify-between p-4 bg-black/30 border border-math hover:border-[#F7931A]/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FFD600]/20 border border-[#FFD600]/50 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#FFD600]" />
            </div>
            <div>
              <h4 className="font-heading font-medium text-white tracking-widest uppercase">TOTP Protocol Active</h4>
              <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">Requires hardware device</p>
            </div>
          </div>
          <Button variant="outline" className="font-heading tracking-widest uppercase text-[10px] border border-[#F7931A]/50 bg-[#F7931A]/10 text-[#F7931A] hover:bg-[#F7931A]/20">
            Initialize 2FA
          </Button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings()
      case "email":
        return renderEmailSettings()
      case "ai":
        return renderAISettings()
      case "security":
        return renderSecuritySettings()
      case "notifications":
      case "appearance":
      case "integrations":
      case "data":
        return (
          <div className="crypto-glass-block text-center flex flex-col items-center justify-center py-20">
            <Settings className="w-12 h-12 text-[#1E293B] mb-6 animate-[spin_20s_linear_infinite]" />
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest mb-2">
              {settingsSections.find((s) => s.id === activeSection)?.title} Uninitialized
            </h3>
            <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">Module pending next block update...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
      <div className="bg-[#0F1115] p-6 border-b border-math z-10 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-heading font-bold text-white capitalize tracking-wide bg-gradient-to-r from-[#EA580C] to-[#F7931A] bg-clip-text text-transparent">
            System State
          </h1>
          <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-2">
            Configure local node directives and bounds
          </p>
        </div>
        <Button onClick={handleSaveChanges} className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0 z-10 text-xs px-6">
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? "Syncing..." : "Commit Changes"}
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden z-10">
        {/* Settings Navigation */}
        <div className="w-80 bg-[#030304] border-r border-math p-6 overflow-y-auto">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-lg text-left transition-all duration-300 border border-transparent",
                  activeSection === section.id
                    ? "bg-[#EA580C]/10 border-[#F7931A]/30 shadow-[inset_2px_0_0_#F7931A]"
                    : "hover:bg-[#0F1115] hover:border-white/10",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                    activeSection === section.id
                      ? "bg-[#F7931A]/20 border border-[#F7931A]/50 text-[#F7931A] shadow-gold-accent"
                      : "bg-[#0F1115] border border-math text-[#94A3B8]",
                  )}
                >
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={cn("font-heading font-medium text-xs tracking-wider uppercase mb-1", activeSection === section.id ? "text-white" : "text-[#94A3B8]")}>{section.title}</h3>
                  <p className="font-mono text-[9px] text-[#94A3B8]/70 uppercase tracking-wider">{section.description}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
