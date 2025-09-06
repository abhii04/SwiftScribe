import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="glass-card shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center glass shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                We've sent you a confirmation link
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {
                  "We've sent a confirmation email to your inbox. Please click the link in the email to activate your account and start using the AI Communication Assistant."
                }
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {"Didn't receive the email? Check your spam folder or "}
                <Link
                  href="/auth/sign-up"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                >
                  try signing up again
                </Link>
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full glass border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
              >
                <Link href="/auth/login">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
