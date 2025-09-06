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
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: any
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Manage your personal information and preferences",
    icon: User,
  },
  {
    id: "email",
    title: "Email Accounts",
    description: "Connect and manage your email integrations",
    icon: Mail,
  },
  {
    id: "ai",
    title: "AI Configuration",
    description: "Customize AI behavior and response settings",
    icon: Zap,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure alerts and notification preferences",
    icon: Bell,
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Manage your account security and privacy settings",
    icon: Shield,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize the look and feel of your dashboard",
    icon: Palette,
  },
  {
    id: "integrations",
    title: "API & Integrations",
    description: "Manage third-party integrations and API keys",
    icon: Key,
  },
  {
    id: "data",
    title: "Data Management",
    description: "Export, import, and manage your data",
    icon: Download,
  },
]

export function SettingsPanel() {
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Alex Chen",
    email: "alex@company.com",
    role: "Senior Support Manager",
    timezone: "America/New_York",
  })

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Personal Information</h3>
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
              AC
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG up to 2MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <Input
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <Input
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
            <Input
              value={profileData.role}
              onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
              className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Timezone</label>
            <select
              value={profileData.timezone}
              onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
              className="w-full px-3 py-2 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200 rounded-md text-slate-900 dark:text-white"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Connected Email Accounts</h3>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Gmail</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">support@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-green-500/30 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Outlook</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">alex@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Needs Auth
              </Badge>
              <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
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
      <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Response Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Minimum Confidence Threshold
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-900 dark:text-white w-12">80%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              AI responses below this confidence level will be flagged for review
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Response Tone</label>
            <select className="w-full px-3 py-2 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200 rounded-md text-slate-900 dark:text-white">
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Auto-send Threshold
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="95"
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-900 dark:text-white w-12">95%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Responses above this confidence level can be sent automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Password & Authentication</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="pr-10 glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">Authenticator App</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Use an authenticator app for 2FA</p>
            </div>
          </div>
          <Button variant="outline" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
            Enable
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
          <div className="glass-card p-8 rounded-xl border-0 shadow-lg text-center">
            <Settings className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {settingsSections.find((s) => s.id === activeSection)?.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">This section is coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="glass-nav p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your account, preferences, and system configuration
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Settings Navigation */}
        <div className="w-80 glass-sidebar border-r border-white/10 p-6 overflow-y-auto">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-lg text-left transition-all duration-200",
                  activeSection === section.id
                    ? "glass bg-white/20 text-slate-900 dark:text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:glass hover:bg-white/10",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    activeSection === section.id
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      : "bg-white/10 text-slate-500 dark:text-slate-400",
                  )}
                >
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm mb-1">{section.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{section.description}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
