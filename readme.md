This repository is created in educational purposes. 
I'm using vanila JS and html to learn and test openAIApi

[Documentation](https://platform.openai.com/docs)

# Nice to know

### The OpenAI API provides several other methods in addition to the createCompletion method. Some of the commonly used methods are:

1. openai.createCompletion: Generates text completions based on a prompt.
2. openai.createChatCompletion: Generates interactive chat-based completions, where you provide a series of messages as input.
3. openai.createClassification: Performs text classification by assigning labels to a given text.
4. openai.createDavinciCode: Translates a Python code snippet into a natural language description.
5. openai.createAnswer: Generates answers to a given question based on a provided context.
6. openai.createSummarization: Generates a summary of a long document.
7. openai.createTranslation: Translates text from one language to another.

### Model endpoints
ENDPOINT	MODEL NAME
/v1/chat/completions	gpt-4, gpt-4-0314, gpt-4-32k, gpt-4-32k-0314, gpt-3.5-turbo, gpt-3.5-turbo-0301
/v1/completions	text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001
/v1/edits	text-davinci-edit-001, code-davinci-edit-001
/v1/audio/transcriptions	whisper-1
/v1/audio/translations	whisper-1
/v1/fine-tunes	davinci, curie, babbage, ada
/v1/embeddings	text-embedding-ada-002, text-search-ada-doc-001
/v1/moderations	text-moderation-stable, text-moderation-latest

### Models
text-davinci-003
text-curie-001
text-babbage-001
text-ada-001

### Presence penalty

The presence penalty is a parameter used to adjust the level of repetitiveness in the generated text. 
Higher value like will result in the model be repeating similar phrases less, while a lower value like make the model to generate repetitive or redundant content.
default 0
numbers from -2 to 2

