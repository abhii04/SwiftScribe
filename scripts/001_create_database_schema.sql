-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'agent' CHECK (role IN ('admin', 'agent', 'manager')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email accounts table for connected email services
CREATE TABLE IF NOT EXISTS public.email_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_address TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('gmail', 'outlook')),
  access_token TEXT,
  refresh_token TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emails table for storing processed emails
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_account_id UUID NOT NULL REFERENCES public.email_accounts(id) ON DELETE CASCADE,
  message_id TEXT NOT NULL,
  thread_id TEXT,
  subject TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_name TEXT,
  recipient_email TEXT NOT NULL,
  body_text TEXT,
  body_html TEXT,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'technical', 'billing', 'sales', 'complaint')),
  sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded', 'archived')),
  ai_summary TEXT,
  extracted_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create responses table for AI-generated and human responses
CREATE TABLE IF NOT EXISTS public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id UUID NOT NULL REFERENCES public.emails(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_ai_generated BOOLEAN DEFAULT true,
  is_sent BOOLEAN DEFAULT false,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Create knowledge base table for RAG system
CREATE TABLE IF NOT EXISTS public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  embedding VECTOR(1536), -- For OpenAI embeddings
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table for tracking metrics
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  emails_processed INTEGER DEFAULT 0,
  responses_generated INTEGER DEFAULT 0,
  responses_sent INTEGER DEFAULT 0,
  avg_response_time INTERVAL,
  avg_confidence_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for email_accounts
CREATE POLICY "Users can view their own email accounts" ON public.email_accounts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own email accounts" ON public.email_accounts
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for emails (users can see emails from their connected accounts)
CREATE POLICY "Users can view emails from their accounts" ON public.emails
  FOR SELECT USING (
    email_account_id IN (
      SELECT id FROM public.email_accounts WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "Users can update emails from their accounts" ON public.emails
  FOR UPDATE USING (
    email_account_id IN (
      SELECT id FROM public.email_accounts WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for responses
CREATE POLICY "Users can view responses for their emails" ON public.responses
  FOR SELECT USING (
    email_id IN (
      SELECT e.id FROM public.emails e
      JOIN public.email_accounts ea ON e.email_account_id = ea.id
      WHERE ea.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can manage responses for their emails" ON public.responses
  FOR ALL USING (
    email_id IN (
      SELECT e.id FROM public.emails e
      JOIN public.email_accounts ea ON e.email_account_id = ea.id
      WHERE ea.user_id = auth.uid()
    )
  );

-- Create RLS policies for knowledge_base
CREATE POLICY "Users can view active knowledge base entries" ON public.knowledge_base
  FOR SELECT USING (is_active = true);
CREATE POLICY "Users can manage knowledge base entries they created" ON public.knowledge_base
  FOR ALL USING (auth.uid() = created_by);

-- Create RLS policies for analytics (all authenticated users can view)
CREATE POLICY "Authenticated users can view analytics" ON public.analytics
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_emails_status ON public.emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_priority ON public.emails(priority);
CREATE INDEX IF NOT EXISTS idx_emails_received_at ON public.emails(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_responses_email_id ON public.responses(email_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON public.knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON public.analytics(date DESC);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
