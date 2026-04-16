# SwiftScribe — AI-Powered Customer Support Automation Platform

SwiftScribe is an end-to-end system that automates customer support workflows by ingesting, analyzing, prioritizing, and responding to emails using large language models and retrieval-augmented generation (RAG).

It is designed to reduce response latency, improve response quality, and scale support operations while maintaining human oversight.

---

## Overview

SwiftScribe processes incoming support emails and converts unstructured communication into structured, actionable data. It classifies sentiment, detects urgency, extracts key information, and generates context-aware replies grounded in an internal knowledge base.

A human-in-the-loop dashboard allows agents to review, edit, and send responses with full visibility into model reasoning and extracted signals.

---

## Core Capabilities

### Email Ingestion

- OAuth-based integration with Gmail and Outlook  
- Automated filtering of support-related emails using keyword and semantic matching  
- Persistent storage in Supabase (Postgres) with structured schema  

---

### Classification and Prioritization

- Sentiment classification using Gemini (positive, neutral, negative)  
- Priority detection using heuristic + model-based signals  
- Urgent emails ranked via a priority queue to ensure SLA adherence  

---

### Information Extraction

- Structured extraction from unstructured email text:
  - Contact details (email, phone)
  - Order IDs and product references
  - Customer intent and issue classification  
- Confidence scoring with traceable spans for validation  

---

### AI Response Generation (RAG)

- Draft replies generated using Gemini API  
- Retrieval-Augmented Generation with Supabase pgvector  
- Responses are:
  - Context-aware and grounded in internal documentation  
  - Tone-adaptive based on sentiment  
  - Actionable with clear next steps  

---

### Human-in-the-Loop Interface

- Inbox with sorting, filtering, and prioritization controls  
- Detailed email view with:
  - Raw message
  - Extracted entities
  - Model-generated draft  
- Editable response editor with one-click send via provider APIs  

---

### Analytics

- Real-time metrics:
  - Total emails processed (24h window)
  - Pending vs resolved
  - Average response time  

- Operational insights:
  - Sentiment distribution
  - Urgent vs non-urgent ratio
  - SLA breaches and trends over time  

---

## System Architecture

### Stack

- **Frontend**: React / Next.js  
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions)  
- **LLM Layer**: Gemini API  
- **Vector Search**: Supabase pgvector  

---

### Processing Pipeline

1. Fetch incoming emails via provider APIs  
2. Filter and persist structured data in Postgres  
3. Trigger processing via Edge Functions  
4. Run LLM pipeline:
   - Sentiment classification  
   - Priority detection  
   - Entity extraction  
   - RAG-based response generation  
5. Serve results to dashboard  
6. Human review and approval  
7. Send response via provider API  
8. Persist outcomes for analytics and continuous improvement  

---

## Security and Privacy

- OAuth-based secure authentication for email providers  
- Encrypted token storage in Supabase  
- Row-Level Security (RLS) for tenant isolation  
- Optional PII redaction layer for compliance use cases  

---

## Design Principles

- Human-in-the-loop by default  
- Deterministic + LLM hybrid pipelines  
- Traceability and debuggability of model outputs  
- Priority-first processing for real-world SLA constraints  
- Modular architecture for extensibility  

---

## Roadmap

- Multi-language support with automatic translation  
- SLA-based escalation workflows  
- CRM integrations (Zendesk, Salesforce)  
- Feedback loops and CSAT tracking  
- Domain-specific fine-tuning for improved extraction and generation  

---

## Why This Matters

Customer support systems are bottlenecked by manual triage and inconsistent responses. SwiftScribe replaces this with a structured, AI-first pipeline that maintains quality while significantly improving speed and scalability.

This project demonstrates production-oriented thinking across backend systems, applied machine learning, and human-centered interface design.
