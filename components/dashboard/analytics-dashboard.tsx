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
import { useEmails } from "@/hooks/useSupabaseData"

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
  { name: "Technical", value: 35, color: "#F7931A" },
  { name: "Sales", value: 28, color: "#EA580C" },
  { name: "Billing", value: 20, color: "#FFD600" },
  { name: "General", value: 12, color: "#1E293B" },
  { name: "Complaint", value: 5, color: "#EF4444" },
]

const confidenceData = [
  { range: "90-100%", count: 45, color: "#FFD600" },
  { range: "80-89%", count: 32, color: "#F7931A" },
  { range: "70-79%", count: 18, color: "#EA580C" },
  { range: "60-69%", count: 8, color: "#EF4444" },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const { emails } = useEmails("all")

  const metrics = [
    {
      title: "Inbound Nodes",
      value: emails ? emails.length.toString() : "0",
      change: "Sync Active",
      trend: "up",
      icon: Mail,
      color: "border-[#F7931A] text-[#F7931A]",
    },
    {
      title: "Avg Resolution",
      value: "24m",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
      color: "border-[#FFD600] text-[#FFD600]",
    },
    {
      title: "Consensus Weight",
      value: "87.3%",
      change: "+3.1%",
      trend: "up",
      icon: Zap,
      color: "border-[#EA580C] text-[#EA580C]",
    },
    {
      title: "Block Finality",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Target,
      color: "border-[#10B981] text-[#10B981]",
    },
  ]

  return (
    <div className="flex-1 flex flex-col h-screen font-body relative overflow-hidden">
      <div className="bg-[#0F1115] p-6 border-b border-math z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white capitalize tracking-wide bg-gradient-to-r from-[#EA580C] to-[#FFD600] bg-clip-text text-transparent">
              Network Telemetry
            </h1>
            <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-2">
              Real-time consensus metrics and node health
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-black/40 border border-math rounded-lg p-1">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "h-8 px-4 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded",
                    timeRange === range
                      ? "bg-[#EA580C]/20 text-[#F7931A] shadow-gold-accent"
                      : "text-[#94A3B8] hover:bg-white/10 hover:text-white",
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="font-heading uppercase tracking-widest text-[#94A3B8] bg-transparent border-math hover:border-[#F7931A] hover:text-white text-xs h-10 px-4">
              <Filter className="w-3 h-3 mr-2" />
              Filter Array
            </Button>
            <Button variant="outline" size="sm" className="font-heading uppercase tracking-widest text-[#94A3B8] bg-transparent border-math hover:border-[#FFD600] hover:text-white text-xs h-10 px-4">
              <Calendar className="w-3 h-3 mr-2" />
              Export Hash
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div key={metric.title} className="crypto-glass-block overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/5 pointer-events-none group-hover:border-[#F7931A]/30 transition-colors"></div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border bg-black/40 shadow-bitcoin-primary",
                      metric.color,
                    )}
                  >
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-mono tracking-widest uppercase rounded-sm border-0",
                      metric.trend === "up"
                        ? "bg-[#FFD600]/10 text-[#FFD600]"
                        : "bg-red-900/40 text-red-400",
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
                  <h3 className="font-heading text-3xl font-bold text-white mb-1 shadow-gold-accent">{metric.value}</h3>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">{metric.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Volume Chart */}
            <div className="crypto-block">
              <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">Transaction Volume</h3>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">Daily block processing</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F7931A]"></div>
                    <span className="text-[#94A3B8]">Inbound</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#EA580C]"></div>
                    <span className="text-[#94A3B8]">Processed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFD600]"></div>
                    <span className="text-[#94A3B8]">Exported</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={emailVolumeData}>
                  <defs>
                    <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EA580C" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EA580C" stopOpacity={0}/>
                    </linearGradient>
                     <linearGradient id="colorResponded" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD600" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F1115",
                      border: "1px solid rgba(247, 147, 26, 0.3)",
                      borderRadius: "0px",
                      color: "#fff",
                      fontFamily: "JetBrains Mono",
                      fontSize: "12px",
                      textTransform: "uppercase"
                    }}
                    itemStyle={{ color: "#F7931A" }}
                  />
                  <Area type="step" dataKey="received" stroke="#F7931A" strokeWidth={2} fillOpacity={1} fill="url(#colorReceived)" />
                  <Area type="step" dataKey="processed" stroke="#EA580C" strokeWidth={2} fillOpacity={1} fill="url(#colorProcessed)" />
                  <Area type="step" dataKey="responded" stroke="#FFD600" strokeWidth={2} fillOpacity={1} fill="url(#colorResponded)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Response Time Chart */}
            <div className="crypto-block">
              <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">Network Latency</h3>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">Average consensus time by block</p>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] uppercase tracking-widest border-[#FFD600]/30 text-[#FFD600] rounded-sm bg-[#FFD600]/10"
                >
                  Benchmark: 30min
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                  <Tooltip
                     contentStyle={{
                      backgroundColor: "#0F1115",
                      border: "1px solid rgba(247, 147, 26, 0.3)",
                      borderRadius: "0px",
                      color: "#fff",
                      fontFamily: "JetBrains Mono",
                      fontSize: "12px",
                      textTransform: "uppercase"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#FFD600"
                    strokeWidth={3}
                    dot={{ fill: "#FFD600", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#EA580C" }}
                  />
                  <Line
                    type="step"
                    dataKey="target"
                    stroke="#F7931A"
                    strokeWidth={1}
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
            <div className="crypto-glass-block">
              <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">Data Routing Map</h3>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">Distribution by classification</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="60%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                       contentStyle={{
                        backgroundColor: "#0F1115",
                        border: "1px solid rgba(247, 147, 26, 0.3)",
                        borderRadius: "0px",
                        color: "#fff",
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                        textTransform: "uppercase"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between border-b border-white/5 pb-2">
                       <div className="flex items-center gap-3">
                        <div className="w-2 h-2" style={{ backgroundColor: category.color }}></div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8]">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-heading font-bold text-white">{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Confidence Distribution */}
            <div className="crypto-glass-block">
              <div className="flex items-center justify-between mb-6 border-b border-math pb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">Network Consensus</h3>
                  <p className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase mt-1">Distribution of model validation</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={confidenceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis type="number" stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                  <YAxis dataKey="range" type="category" stroke="#94A3B8" fontSize={10} fontFamily="JetBrains Mono" width={60} tickLine={false} axisLine={false} />
                  <Tooltip
                     contentStyle={{
                      backgroundColor: "#0F1115",
                      border: "1px solid rgba(247, 147, 26, 0.3)",
                      borderRadius: "0px",
                      color: "#fff",
                      fontFamily: "JetBrains Mono",
                      fontSize: "12px",
                      textTransform: "uppercase"
                    }}
                    cursor={{fill: 'rgba(247, 147, 26, 0.1)'}}
                  />
                  <Bar dataKey="count" fill="#F7931A" radius={[0, 4, 4, 0]}>
                    {
                      confidenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="crypto-glass-block border-[#FFD600]/30 shadow-[0_0_30px_-5px_rgba(255,214,0,0.1)]">
            <div className="flex items-center gap-3 mb-6 border-b border-math pb-4">
              <div className="w-10 h-10 border border-[#FFD600]/50 bg-[#FFD600]/10 rounded-lg flex items-center justify-center shadow-gold-accent">
                <AlertTriangle className="w-5 h-5 text-[#FFD600]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-widest">System Telemetry Output</h3>
                <p className="font-mono text-[10px] text-[#FFD600] tracking-widest uppercase mt-1">Algorithmic recommendations broadcasted</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-black/40 border border-math hover:border-[#FFD600]/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD600]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                    Latency Optimized
                  </span>
                </div>
                <p className="text-sm font-body text-[#94A3B8] leading-relaxed">
                  Execution times are 15% below threshold configuration. System nominal.
                </p>
              </div>
              <div className="p-4 bg-black/40 border border-math hover:border-[#EA580C]/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#EA580C]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#EA580C]">Compute Spike Detected</span>
                </div>
                <p className="text-sm font-body text-[#94A3B8] leading-relaxed">
                  Elevated block confirmations required between index 1200-1600.
                </p>
              </div>
              <div className="p-4 bg-black/40 border border-math hover:border-[#F7931A]/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#F7931A]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F7931A]">Validation Improved</span>
                </div>
                <p className="text-sm font-body text-[#94A3B8] leading-relaxed">
                  Heuristic certainty coefficient increased by 0.08 points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
