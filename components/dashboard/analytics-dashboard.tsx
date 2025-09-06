"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Mail,
  Clock,
  Zap,
  Target,
  Users,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock analytics data
const emailVolumeData = [
  { date: "Mon", received: 45, processed: 42, responded: 38 },
  { date: "Tue", received: 52, processed: 50, responded: 45 },
  { date: "Wed", received: 38, processed: 36, responded: 34 },
  { date: "Thu", received: 61, processed: 58, responded: 52 },
  { date: "Fri", received: 48, processed: 46, responded: 41 },
  { date: "Sat", received: 23, processed: 22, responded: 20 },
  { date: "Sun", received: 18, processed: 17, responded: 16 },
]

const responseTimeData = [
  { hour: "00", avgTime: 45, target: 30 },
  { hour: "04", avgTime: 38, target: 30 },
  { hour: "08", avgTime: 25, target: 30 },
  { hour: "12", avgTime: 18, target: 30 },
  { hour: "16", avgTime: 22, target: 30 },
  { hour: "20", avgTime: 35, target: 30 },
]

const categoryData = [
  { name: "Technical", value: 35, color: "#3B82F6" },
  { name: "Sales", value: 28, color: "#10B981" },
  { name: "Billing", value: 20, color: "#8B5CF6" },
  { name: "General", value: 12, color: "#F59E0B" },
  { name: "Complaint", value: 5, color: "#EF4444" },
]

const confidenceData = [
  { range: "90-100%", count: 45, color: "#10B981" },
  { range: "80-89%", count: 32, color: "#3B82F6" },
  { range: "70-79%", count: 18, color: "#F59E0B" },
  { range: "60-69%", count: 8, color: "#EF4444" },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const metrics = [
    {
      title: "Total Emails",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Mail,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Avg Response Time",
      value: "24m",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "AI Confidence",
      value: "87.3%",
      change: "+3.1%",
      trend: "up",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Target,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="glass-nav p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Monitor your AI communication performance and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 glass rounded-lg p-1 border border-white/20 bg-white/10 backdrop-blur-sm">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "h-8 px-3 text-xs font-medium transition-all duration-200",
                    timeRange === range
                      ? "bg-white/20 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-white/10",
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div key={metric.title} className="glass-card p-6 rounded-xl border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      metric.color,
                    )}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs border-0 font-medium",
                      metric.trend === "up"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400",
                    )}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{metric.value}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{metric.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Volume Chart */}
            <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Email Volume</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Daily email processing overview</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Received</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Processed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Responded</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={emailVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="date" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} />
                  <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#1e293b",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="received"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="responded"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Response Time Chart */}
            <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Response Time</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average response time by hour</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                >
                  Target: 30min
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="hour" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} />
                  <YAxis stroke="rgba(148, 163, 184, 0.5)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#1e293b",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Email Categories</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Distribution by category type</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="60%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        color: "#1e293b",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Confidence Distribution */}
            <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Confidence Scores</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Distribution of AI response confidence</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={confidenceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis type="number" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} />
                  <YAxis dataKey="range" type="category" stroke="rgba(148, 163, 184, 0.5)" fontSize={12} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#1e293b",
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Performance Insights</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI-generated recommendations and alerts</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Excellent Performance
                  </span>
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  Response times are 15% below target this week. Great work!
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Peak Hours</span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Highest email volume between 12-4 PM. Consider additional staffing.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Improvement</span>
                </div>
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  Technical category confidence increased by 8% this month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
