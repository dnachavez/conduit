Proof‑of‑Concept Voice‑AI Call Centre (OpenAI + LiveKit + Twilio + Supabase)
1 Overview of the proposed architecture
1.1 Voice channel flow

The phone number for each workspace will be provisioned in Twilio. A Twilio number forwards calls to LiveKit through a SIP trunk. When a customer dials the number, Twilio executes a TwiML Bin that dials your LiveKit SIP endpoint using the credentials of your inbound trunk (this is just a short XML file that contains a <Dial><Sip> element). The LiveKit documentation outlines the steps for inbound calls: you purchase a Twilio phone number, create a TwiML bin that dials your LiveKit SIP endpoint with your SIP credentials, associate the number with that TwiML bin, create an inbound SIP trunk on LiveKit, and set up a dispatch rule that sends each call to a new room and dispatches the agent
docs.livekit.io
. The dispatch rule can create rooms with a prefix (call-XXX) and attach the named agent to the room
docs.livekit.io
.

1.2 LiveKit agents and call control

LiveKit’s Agents framework lets you embed Python or Node.js code as participants in a room. The agent uses a pipeline of STT → LLM → TTS to answer questions. It supports multiple STT providers (OpenAI Whisper, Google, Deepgram, etc.), different LLM models and TTS providers. The agent can be configured with options like pre‑emptive generation to reduce latency
docs.livekit.io
 and can publish real‑time transcriptions to the frontend
docs.livekit.io
.

Agents can transfer control to other agents or tasks. The Agent handoffs guide shows that returning another agent instance from a tool call triggers a handoff, and the chat history records the old_agent_id and new_agent_id
docs.livekit.io
. Custom state (e.g., userdata dataclass) can be stored in the session and is accessible by both agents
docs.livekit.io
. When handing off to another agent, you can pass the chat_ctx to preserve context
docs.livekit.io
. For human hand‑off, LiveKit provides an Agent‑assisted warm transfer workflow: place the caller on hold, create a consultation room, dial the supervisor, summarise the call, then move the supervisor into the original room
docs.livekit.io
docs.livekit.io
. The TransferAgent summarises the conversation by copying messages from the previous chat context
docs.livekit.io
.

1.3 Knowledge retrieval

A major limitation of large language models is that they do not know the latest details about your business. To give the agent access to fresh information, you can build a retrieval‑augmented generation (RAG) pipeline. Supabase provides an open‑source toolkit for AI applications built on Postgres and pgvector. It allows you to store embeddings, create vector indexes and perform semantic, keyword or hybrid search
supabase.com
. Supabase’s examples demonstrate how to embed documents using OpenAI, store them in a pgvector column, and run similarity searches from a Next.js app
supabase.com
. LiveKit’s external data & RAG guide notes that agents can call external data sources to search a private knowledge base for information to accurately answer user queries
docs.livekit.io
. A Python tool function can perform vector search (using Supabase, LangChain or LlamaIndex) and return context; the LLM is instructed to call this tool whenever it needs knowledge base information.

1.4 Transcription and recording

LiveKit supports session recording and transcripts. You can start a room‑composite egress to record audio and store it in an S3 bucket
docs.livekit.io
. Conversation history is available via session.history and can be saved to a file at shutdown
docs.livekit.io
. Real‑time transcriptions are published to the client on the lk.transcription text stream
docs.livekit.io
 and can be forwarded synchronously with the TTS output
docs.livekit.io
. A conversation_item_added event fires whenever an item is added to the chat history
docs.livekit.io
, allowing your backend to update the UI.

2 Evaluation of the proposed stack
Layer	Tools & reasoning	Considerations
Frontend (Next.js + TypeScript)	Good choice for multi‑tenant SaaS. Next.js supports server actions, incremental static regeneration and streaming. It can communicate with your Python backend via REST/WebSocket and with LiveKit via the LiveKit React SDK.	Consider using the Supabase client library for authentication and data access, and the LiveKit React components for room connection and transcription display.
Backend (Python)	LiveKit’s Python SDK is first‑class. It allows you to build agents that call OpenAI’s APIs, handle hand‑offs, summarise calls, and integrate with your RAG pipeline. Python has strong libraries for data ingestion and vector search (LlamaIndex, LangChain, supabase-py).	Running in a container requires environment variables for LiveKit, Twilio and OpenAI keys
docs.livekit.io
. Use asyncio to handle LiveKit events without blocking.
Database (Supabase / Postgres)	Supabase offers a hosted Postgres with built‑in pgvector and authentication. It simplifies multi‑tenant design (row‑level security) and has good JS and Python clients. You can create vector indexes and run similarity searches directly in Postgres
supabase.com
.	Embedding large documents can be slow; pre‑process and chunk them offline (e.g., with a GitHub Action or server script)
supabase.com
. Use row‑level security policies to separate workspaces.
Call gateway (Twilio + LiveKit)	The plan to use Twilio solely as the gateway is sound. The Twilio integration is well documented: you purchase a number, create a TwiML bin to dial your LiveKit SIP endpoint, then create an inbound trunk and dispatch rule
docs.livekit.io
. Outbound calls or transfers require an outbound trunk and call‑transfer enabled on Twilio
docs.livekit.io
.	Twilio charges for voice minutes and SIP trunking; budget accordingly. If call transfers to PSTN numbers are required, you must enable SIP REFER and PSTN transfer on the Twilio trunk
docs.livekit.io
.
Real‑time communication (LiveKit + LiveKit Agents)	LiveKit rooms provide low‑latency audio with WebRTC. Using LiveKit Agents means the AI agent joins the same room as the customer and can be interrupted naturally. Session recording, real‑time transcription and warm‑transfer APIs are available.	Running your own LiveKit server requires bandwidth and compute. Alternatively, use LiveKit Cloud to offload infrastructure. Configure STT, LLM and TTS providers (e.g., OpenAI Whisper, GPT‑4o and TTS) with environment variables and adjust voice activity detection (VAD) to avoid clipping.

Overall, the stack is feasible and aligns with best practices from LiveKit’s documentation. Twilio → LiveKit → Agent integration is well supported, and Supabase is a good choice for storing embeddings and transcripts. The biggest challenges will be building a reliable ingestion pipeline for the knowledge base and handling concurrency when multiple calls occur.

3 Recommended implementation plan (90 % PoC within a day)
3.1 Setup infrastructure and telephony

Create Supabase project and schema.

Design tables for workspaces (id, name, twilio_phone_number, sip_credentials,…), users and memberships (user ↔ workspace mapping), knowledge_documents (workspace_id, source_url, content, embeddings vector), transcripts (call_id, speaker, text, timestamp, sentiment, intent, workspace_id), and calls (id, workspace_id, room_name, start_time, end_time, human_assignee).

Enable pgvector and create vector indexes. Use row‑level security policies to ensure each workspace sees only its own data.

Provision Twilio resources per workspace. Purchase or assign a Twilio phone number. Create a TwiML bin that dials your LiveKit SIP endpoint:

<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Sip username="YOUR_SIP_USERNAME" password="YOUR_SIP_PASSWORD">sip:+${workspace_number}@{livekit_sip_endpoint}</Sip>
  </Dial>
</Response>


In the Twilio console, point the phone number’s “A call comes in” handler to this TwiML bin
docs.livekit.io
. Use the LiveKit CLI to create an inbound trunk for the number and a dispatch rule that sends each call to a new room and dispatches your agent
docs.livekit.io
. If you plan to make outbound calls or warm transfers, also create an outbound trunk and enable call transfer on the Twilio side
docs.livekit.io
.

Spin up LiveKit and LiveKit Agents. Use LiveKit Cloud or run a self‑hosted LiveKit server. Create an agent server (Python) using LiveKit’s voice AI quickstart. Configure STT (OpenAI Whisper or Deepgram), LLM (GPT‑4o) and TTS (OpenAI voice). Provide the necessary API keys via environment variables
docs.livekit.io
.

Test telephony flow. Start your agent with a simple “echo” or greeting script. Call the Twilio number and verify that the call is forwarded to LiveKit and the agent responds. Use the session.history property to print transcripts.

3.2 Build the knowledge‑base ingestion and retrieval pipeline

Document ingestion script. Write a Python script that accepts a URL (company help‑center, uploaded PDF, etc.), downloads and extracts the text. Use requests + BeautifulSoup for HTML pages and pdfminer/pypdf for PDF or Word documents. Chunk the text into ~500‑word sections.

Generate embeddings. Use OpenAI’s embeddings API (e.g., text-embedding-ada-002) to embed each chunk. Store each chunk with its metadata (workspace_id, title, url, chunk_id, token count) and embedding vector into the knowledge_documents table via Supabase. Consider using Supabase’s headless vector search GitHub Action
 or LlamaIndex to automate ingestion for web content
supabase.com
. For a one‑day PoC, manual ingestion of a few key documents is sufficient.

Query function. Implement a function query_knowledge_base(question, workspace_id) that:

Generates an embedding for the user’s question.

Executes a SELECT ... ORDER BY embedding <-> question_embedding LIMIT k query on knowledge_documents using Supabase to find the most relevant chunks.

Returns the concatenated text as context.

Optionally logs the search to transcripts.

Register a tool in the agent. Define a @function_tool (Python) or llm.tool (Node) in your agent that calls query_knowledge_base(). In your agent’s system prompt, instruct the model: “If you need to answer based on the company’s knowledge base, call the search_docs tool with the user’s question.” This ensures the agent automatically retrieves relevant information during the conversation. LiveKit’s external data guide notes that agents may connect to external data to search a private knowledge base for information
docs.livekit.io
.

3.3 Implement the agent and call flow logic

Agent session. Use AgentSession with STT/LLM/TTS nodes and enable preemptive_generation=True to reduce latency
docs.livekit.io
. Enable transcriptions to publish lk.transcription events
docs.livekit.io
.

Conversation logic. Extend the Agent class. Provide instructions such as “You are the virtual receptionist for {workspace_name}. Use the knowledge base when needed. Ask clarifying questions. If the user requests something you cannot handle or expresses frustration, call the handoff tool.”

Human hand‑off. When the LLM determines that a human should take over, call a tool that does the following:

Mark call as escalated in the calls table (set human_assignee to the selected agent). You can choose an idle human agent by checking presence (e.g., via a status column or WebSocket channel).

Generate a summary. Copy the conversation history and summarise key points, as shown in LiveKit’s warm‑transfer workflow: the summary should include the customer’s intent, sentiment, knowledge entries used, and any promised actions
docs.livekit.io
. Use session.history.copy() to build the summary
docs.livekit.io
.

Notify the human. Send a real‑time notification to the human agent’s browser (Next.js) with a “Join Call” button and the call summary. The human agent joins the same LiveKit room via WebRTC; no additional Twilio bridging is needed.

Mute AI agent. When the human joins, pause the AI agent or leave the room. Optionally, keep the agent in the background to suggest responses to the human (co‑pilot mode). Use a separate chat or side‑panel to display AI suggestions.

Session recording and transcript storage. Start an audio‑only egress using api.RoomCompositeEgressRequest to record the call and save it to S3 or Supabase storage
docs.livekit.io
. On session.on_shutdown, write session.history.to_dict() to your transcripts table
docs.livekit.io
.

Front‑end integration.

Use the LiveKit React hooks to connect to the room and display real‑time transcripts.

Use Supabase’s authentication to manage users.

Provide pages to create workspaces, assign phone numbers, upload documents, and view call logs and transcripts.

Implement a real‑time dashboard for supervisors to see active calls and join when a hand‑off is requested.

3.4 Optional improvements

Sentiment/intent detection: Use a light‑weight classification model (OpenAI functions or AWS Comprehend) to detect customer sentiment and intent. This can help decide when to hand off. Store these fields in the transcripts table.

Low‑latency STT: Evaluate STT providers; LiveKit supports Deepgram, Google, Whisper, etc. Choose one based on cost and accuracy. The STT provider should support word‑level timestamps if you want aligned transcripts
docs.livekit.io
.

Call metrics and analytics: Use LiveKit’s events and logs to compute average handle times, hold times, and resolution rates. Supabase’s row‑level policies allow you to build per‑workspace dashboards.

Deployment: For a PoC you can run everything on a single EC2 instance or using LiveKit Cloud. For production, containerise the agent server and deploy on a platform that scales (Kubernetes or LiveKit Cloud). LiveKit suggests 4 cores and 8 GB RAM per agent server for 10–25 concurrent jobs
docs.livekit.io
.

4 Summary

The proposed approach—using Twilio to gateway calls into LiveKit, running a voice‑AI agent via LiveKit Agents, storing knowledge in Supabase and handling hand‑offs to human agents—aligns well with LiveKit’s capabilities. Twilio inbound trunks can forward calls into LiveKit rooms
docs.livekit.io
. LiveKit’s agent framework allows the AI to answer calls using STT/LLM/TTS and to transfer control or summon a human when necessary
docs.livekit.io
. Supabase’s pgvector extension provides a simple vector store for retrieval‑augmented generation
supabase.com
. Session recordings and transcripts are supported out of the box
docs.livekit.io
. By following the implementation plan outlined above—focusing first on telephony integration, then knowledge ingestion, then agent logic and hand‑off—you should be able to deliver a compelling proof‑of‑concept within a day while laying the groundwork for a scalable production system.