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

// Mock email data
const mockEmailDetail = {
  id: "1",
  sender: "Sarah Johnson",
  senderEmail: "sarah@techcorp.com",
  recipient: "support@aiassistant.com",
  subject: "Urgent: Server downtime affecting production",
  timestamp: "Today at 2:45 PM",
  priority: "urgent",
  category: "technical",
  status: "unread",
  isStarred: true,
  body: `Hi Support Team,

We're experiencing critical server issues that are impacting our production environment. The main database server went down at 2:30 PM EST and we're unable to access our customer data.

This is affecting approximately 10,000 active users and we're losing revenue by the minute. Our internal team has tried the following:

1. Restarted the database service
2. Checked network connectivity
3. Reviewed error logs (attached)
4. Attempted failover to backup server

None of these steps have resolved the issue. We need immediate assistance as this is a P1 incident for our business.

Please prioritize this request and let us know the next steps.

Best regards,
Sarah Johnson
Senior DevOps Engineer
TechCorp Solutions`,
  aiSummary:
    "Critical server outage requiring immediate attention. Database server failure at 2:30 PM EST affecting production environment and 10,000 users. Customer has attempted basic troubleshooting without success.",
  aiResponses: [
    {
      id: "1",
      content: `Hi Sarah,

Thank you for reaching out about this critical issue. I understand the urgency and impact on your production environment.

I'm immediately escalating this to our Level 3 support team and our on-call database specialist. Here's what we're doing right now:

1. **Immediate Actions (Next 15 minutes)**:
   - Assigning our senior database engineer to your case
   - Reviewing your server logs and configuration
   - Preparing emergency diagnostic tools

2. **Next Steps**:
   - Our engineer will contact you directly at this email within 15 minutes
   - We'll schedule an emergency screen share session to diagnose the issue
   - If needed, we'll deploy our rapid response team for hands-on assistance

**Case Priority**: P1 - Critical
**Estimated Response Time**: 15 minutes
**Case Number**: #URGENT-2024-001

I'll personally monitor this case until resolution. You can reach me directly at my mobile: +1-555-0199 for immediate updates.

Best regards,
Alex Chen
Senior Support Manager
AI Assistant Support Team`,
      confidence: 0.95,
      tone: "professional",
      category: "urgent_response",
    },
    {
      id: "2",
      content: `Hello Sarah,

I've received your urgent report about the database server outage affecting your production environment. This is indeed a critical situation that requires immediate attention.

**Immediate Response Plan:**

🚨 **Priority Level**: P1 Critical
📞 **Direct Contact**: Our database specialist will call you within 10 minutes
⏰ **ETA for Resolution**: 2-4 hours maximum

**What we're doing now:**
- Activating our emergency response protocol
- Assigning our top database recovery specialist
- Preparing remote diagnostic access
- Alerting our infrastructure team

**What we need from you:**
- Confirmation of your direct phone number for immediate contact
- Remote access credentials (we'll send secure link)
- Any recent changes made to your system in the last 48 hours

I'm personally overseeing this case. My direct line is +1-555-0199.

We'll have you back online as quickly as possible.

Alex Chen
Senior Support Manager`,
      confidence: 0.88,
      tone: "urgent",
      category: "emergency_response",
    },
  ],
}

export function EmailDetail({ emailId, onBack }: EmailDetailProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [customResponse, setCustomResponse] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-500"
      case "billing":
        return "bg-purple-500"
      case "sales":
        return "bg-emerald-500"
      case "complaint":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="glass-nav p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:glass hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn("text-xs text-white border-0", getPriorityColor(mockEmailDetail.priority))}
              >
                {mockEmailDetail.priority}
              </Badge>
              <Badge
                variant="secondary"
                className={cn("text-xs text-white border-0", getCategoryColor(mockEmailDetail.category))}
              >
                {mockEmailDetail.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
              <Star className={cn("w-4 h-4", mockEmailDetail.isStarred && "text-yellow-500 fill-current")} />
            </Button>
            <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:glass hover:bg-white/10">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Email Header */}
          <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-600 text-white">
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{mockEmailDetail.sender}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{mockEmailDetail.senderEmail}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">to {mockEmailDetail.recipient}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400">{mockEmailDetail.timestamp}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-400">Unread</span>
                </div>
              </div>
            </div>

            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
              {mockEmailDetail.subject}
            </h1>

            <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300">
              <div className="whitespace-pre-wrap text-pretty">{mockEmailDetail.body}</div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">AI Analysis</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-pretty">{mockEmailDetail.aiSummary}</p>
          </div>

          {/* AI Response Suggestions */}
          <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">AI Response Suggestions</h3>
            </div>

            <div className="space-y-4">
              {mockEmailDetail.aiResponses.map((response, index) => (
                <div
                  key={response.id}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    selectedResponse === response.id
                      ? "border-blue-500/50 bg-blue-500/10 backdrop-blur-sm"
                      : "border-white/20 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
                  )}
                  onClick={() => setSelectedResponse(response.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-600 dark:text-blue-400">
                        Option {index + 1}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-green-500/30 text-green-600 dark:text-green-400"
                      >
                        {Math.round(response.confidence * 100)}% confidence
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs border-purple-500/30 text-purple-600 dark:text-purple-400 capitalize"
                      >
                        {response.tone}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:glass hover:bg-white/10">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:glass hover:bg-white/10">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:glass hover:bg-white/10">
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-pretty">
                    {response.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Editor */}
          <div className="glass-card p-6 rounded-xl border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Your Response</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="glass border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Preview" : "Edit"}
                </Button>
                <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Enhance with AI
                </Button>
              </div>
            </div>

            <Textarea
              placeholder={
                selectedResponse
                  ? "Selected AI response will appear here. You can edit it before sending."
                  : "Write your response here, or select an AI suggestion above..."
              }
              value={
                selectedResponse
                  ? mockEmailDetail.aiResponses.find((r) => r.id === selectedResponse)?.content || ""
                  : customResponse
              }
              onChange={(e) => setCustomResponse(e.target.value)}
              className="min-h-[200px] glass border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 transition-all duration-200 resize-none"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
                  <Reply className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
                  <ReplyAll className="w-4 h-4 mr-2" />
                  Reply All
                </Button>
                <Button variant="outline" size="sm" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
                  <Forward className="w-4 h-4 mr-2" />
                  Forward
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="glass border-white/20 bg-white/10 backdrop-blur-sm">
                  Save Draft
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
