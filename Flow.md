
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
