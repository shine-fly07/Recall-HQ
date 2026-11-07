# Recall-HQ
RecallHQ is an AI-powered organizational memory platform that captures knowledge from conversations, decisions, workflows, and experiences. Powered by Hindsight, it learns continuously, recalls relevant context when needed, preserves privacy, and transforms fragmented information into actionable intelligence that makes teams smarter over time.

## Backend

This repository includes a standalone FastAPI backend. It uses a single
cross-domain Hindsight memory bank and Groq's `qwen/qwen3-32b` model; no frontend
is required.

### Run locally

1. Use Python 3.10 or newer and install the dependencies:

   ```powershell
   python -m pip install -r requirements.txt
   ```

2. Copy `.env.example` to `.env` and set `GROQ_API_KEY` and
   `HINDSIGHT_API_KEY`. `HINDSIGHT_API_URL` is optional and defaults to
   `https://api.hindsight.vectorize.io`.
3. Start the server:

   ```powershell
   uvicorn main:app --reload
   ```

The API is available at `http://127.0.0.1:8000`; interactive API documentation
is at `/docs`. CORS allows all origins for local development.

### Endpoints

- `GET /health` — basic service status.
- `POST /api/memory/log` — retain arbitrary content. JSON fields: `content`
  (required), `tags` (optional), and `user_alias` (optional; not retained).
- `POST /api/chat` — retrieve relevant cross-domain memories, generate a
  privacy-conscious answer, and retain the sanitized interaction. JSON fields:
  `user_message` (required) and `session_id` (optional).

Common direct identifiers (email addresses, phone numbers, and SSNs) and
explicitly introduced personal names are redacted before data is sent to
Hindsight or Groq. Name detection is heuristic; avoid submitting data that must
be fully anonymized without reviewing the resulting scrubbed content.
