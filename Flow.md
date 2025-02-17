
# **Core Concept: How does this work**
The AI stores, organizes, and retrieves user memories based on semantic meaning, not just keywords.

## 🔹 What happens when a user saves a memory?

- The text/audio/image gets extracted from a webpage, chat, or voice note.
- A vector embedding is generated to represent the meaning of the content.
- The vector is stored in a database (Pinecone) for fast retrieval.
- The original content is stored in PostgreSQL for structured search.
## 🔹 What happens when a user asks a question?
- The query is converted into an embedding (vector representation).
- The system searches for similar embeddings in the database.
- The top results are sent to GPT-4 for summarization.
- The AI returns a concise, personalized response based on stored memories.
---------------------------
# 🔹 Step-by-Step Data Flow

## 📌 Saving a Memory
- 1️⃣ User triggers save (e.g., clicking a browser extension button, taking a voice note, or highlighting text).
- 2️⃣ The text/audio is processed:

- Text is sent directly.
- Audio is transcribed with Whisper.
- Images (if supported) are captioned using a vision model.
- 3️⃣ The memory is vectorized (converted into an embedding) using OpenAI’s embedding model.
- 4️⃣ The vector is stored in Pinecone, along with the original data in PostgreSQL.
✅ This ensures that the AI understands and retrieves memories based on meaning, not just exact words.

## 📌 Retrieving a Memory (When User Asks a Question)
1️⃣ The user submits a query like:

"What was that AI paper I read last week?"
"Summarize my notes about investing."
- 2️⃣ The query is vectorized using the same embedding model.
- 3️⃣ A semantic search is performed in Pinecone to find the most relevant stored memories.
- 4️⃣ The top matches are retrieved and sent to GPT-4 for summarization.
- 5️⃣ The system returns a human-like response, providing context and a direct answer.
✅ This allows the AI to recall past information in a way that feels intuitive and useful.

## 📌 Keeping Memory Organized
- Each memory is tagged with metadata (e.g., timestamp, category, source).
- The system automatically clusters similar memories (e.g., all finance-related memories together).
- A timeline view allows users to browse their past knowledge chronologically.
