import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function useEmails(activeView: string) {
  const [emails, setEmails] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchEmails() {
      try {
        setIsLoading(true)
        const { data: userData } = await supabase.auth.getUser()
        if (!userData.user) {
          throw new Error("Not authenticated")
        }

        let query = supabase
          .from("emails")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("timestamp", { ascending: false })

        if (activeView === "starred") {
          query = query.eq("is_starred", true)
        } else if (activeView === "archived") {
          query = query.eq("status", "archived")
        } else if (activeView !== "inbox") {
            // Wait, does activeView map to category?
            // "inbox" means all non-archived. Let's just fetch all non-archived for inbox view for now
            if (activeView === "inbox") {
               query = query.neq("status", "archived");
            }
        }
        
        const { data, error } = await query

        if (error) throw error
        setEmails(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmails()
  }, [activeView, supabase])

  const addEmail = async (emailData: any) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("emails")
      .insert([{ 
        ...emailData, 
        user_id: userData.user.id,
        timestamp: new Date().toISOString()
      }])
      .select()

    if (error) throw error
    if (data && data.length > 0) {
      // Opt to only push if it matches the active view?
      // For now just add if it's inbox
      if (activeView === "inbox") {
         setEmails(prev => [data[0], ...prev])
      }
    }
  }

  return { emails, isLoading, error, setEmails, addEmail }
}

export function useEmail(id: string) {
  const [email, setEmail] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchEmail() {
      if (!id) return;
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("emails")
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        setEmail(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmail()
  }, [id, supabase])

  return { email, isLoading, error, setEmail }
}

export function useArticles() {
  const [articles, setArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true)
        const { data: userData } = await supabase.auth.getUser()
        if (!userData.user) throw new Error("Not authenticated")

        const { data, error } = await supabase
          .from("knowledge_articles")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setArticles(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [supabase])

  const addArticle = async (article: any) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error("Not authenticated")
        
    const { data, error } = await supabase
        .from("knowledge_articles")
        .insert([{ ...article, user_id: userData.user.id }])
        .select()
        
    if (error) throw error;
    if (data) {
        setArticles(prev => [data[0], ...prev])
    }
  }

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from("knowledge_articles").delete().eq("id", id)
    if (error) throw error;
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const updateArticle = async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from("knowledge_articles")
      .update(updates)
      .eq("id", id)
      .select()
    if (error) throw error;
    if (data && data.length > 0) {
      setArticles(prev => prev.map(a => a.id === id ? data[0] : a))
    }
  }

  return { articles, isLoading, error, addArticle, deleteArticle, updateArticle }
}

export function useSettings() {
  const [settings, setSettings] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: userData } = await supabase.auth.getUser()
        if (!userData.user) return

        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", userData.user.id)
          .single()

        if (error && error.code !== "PGRST116") throw error // Ignore "not found"
        
        if (data) {
            setSettings(data)
        } else {
             // Default settings
             setSettings({
                 display_name: userData.user.user_metadata?.full_name || '',
                 email_notifications: true,
                 theme: 'system',
                 ai_auto_summary: true
             })
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [supabase])

  const saveSettings = async (newSettings: any) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) throw new Error("Not authenticated")
    const { error } = await supabase.from("user_settings").upsert({
        user_id: userData.user.id,
        ...newSettings
    })
    if (error) throw error
    setSettings(newSettings)
  }

  return { settings, isLoading, saveSettings }
}
