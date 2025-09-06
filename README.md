# ✨ SwiftScribe – AI-Powered Communication Assistant

**SwiftScribe** is an end-to-end AI assistant that intelligently manages customer support emails.  
It **fetches, filters, prioritizes, analyzes, and responds** to queries while presenting everything on a **clean, interactive dashboard** for human-in-the-loop review.

---

## 🚀 Features

### 📥 Email Retrieval & Filtering
- Connect Gmail/Outlook via OAuth.
- Automatically fetch new emails containing **Support**, **Query**, **Request**, or **Help**.
- Store sender, subject, body, and timestamp securely in Supabase.

### 🎯 Categorization & Prioritization
- **Sentiment analysis** (via Gemini): Positive, Neutral, Negative.
- **Priority detection**: Urgent vs Not Urgent (keywords like *immediately*, *critical*, *cannot access*).
- Urgent messages float to the top via a **priority queue**.

### 🔍 Information Extraction
- Pulls contact details: phone numbers, alternate emails.
- Detects customer intent, requirements, and product mentions.
- Extracts order IDs and metadata useful for routing.
- Confidence scoring with highlights for quick agent validation.

### 🤖 AI-Generated Draft Replies
- Drafted using **Gemini API**.
- **RAG integration** with Supabase Vector to reference internal knowledge base.
- Replies are:
  - Context-aware and professional.
  - Empathetic if frustration is detected.
  - Specific, referencing products/orders.
  - Actionable: 1–3 clear steps or resolution path.
- Urgent tickets are drafted first.

### 📊 Dashboard & Analytics
- **Inbox View**
  - Sort by urgency, filter by sentiment/priority/date.
  - Status badges: pending, drafted, sent.
- **Email Detail View**
  - Shows raw email, extracted info, and suggested reply.
  - Reply editor with “Send” button → sends via Gmail/Outlook.
- **Analytics**
  - KPIs: total emails (24h), resolved, pending, average response time.
  - Charts: sentiment distribution, urgent vs non-urgent mix, SLA breaches, trend over time.

---

## 🏗 Architecture

- **Supabase**
  - Auth (Google/Microsoft).
  - Postgres + pgvector (email storage + knowledge base embeddings).
  - Storage (attachments, raw email HTML, KB docs).
  - Edge Functions (email sync, reply sending, scheduled jobs).
- **Gemini API**
  - Sentiment classification.
  - Structured information extraction.
  - RAG-based reply drafting.

**Flow:**
1. Fetch & filter support emails.  
2. Store in Supabase → process with Edge Functions.  
3. Run Gemini pipeline: sentiment → priority → entity extraction → draft reply.  
4. Serve results to dashboard → agent reviews → edits → sends.  
5. Store replies, update analytics, and improve knowledge base.

---

## 🔐 Security & Privacy
- OAuth-based secure access to email providers.
- Tokens stored securely in Supabase (encrypted).
- Row-Level Security for user-specific data.
- No sensitive data logged; optional PII redaction for compliance.

---

## 🧪 Demo Flow
1. Connect Gmail/Outlook.  
2. SwiftScribe fetches incoming support queries.  
3. Dashboard shows prioritized inbox.  
4. Agent opens an urgent ticket → sees extracted info + AI draft reply.  
5. Agent edits reply → clicks **Send**.  
6. Dashboard + analytics update in real-time.  

---

## 🗺 Roadmap
- Multi-language support with auto-translation.  
- SLA-based escalation workflows.  
- Integration with CRMs (Zendesk, Salesforce).  
- CSAT tracking + feedback loops.  
- Fine-tuned domain-specific classifiers.  

---

## 📄 License
MIT License (or your choice).  

---

SwiftScribe empowers teams to **reply faster, smarter, and more empathetically** — transforming customer support efficiency and satisfaction.
