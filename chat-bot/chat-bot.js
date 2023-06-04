import { process } from '../mv.js'
import Database from './database.js'

export default  class ChatBot {
  constructor(){
    this.url = "https://api.openai.com/v1/chat/completions"
    this.chatbotConversation = document.getElementById('chatbot-conversation')
    this.userInput = document.getElementById('user-input')
    this.userInputValue = this.userInput.value
    this.headers= {   
      'Content-Type': 'application/json',   
      'Authorization':`Bearer ${process.env.OPEN_AI_KEY}` 
    }
    this.database = new Database
    this.conversationArr = []
    this.newSpeechBubble = document.createElement('div')
  }

  init = () => {
    this.database.pushConversation({role:"user", content: this.userInputValue})
    this.createSpeechBubble("human", this.userInput.value)
    this.userInput.value = ''
    this.getConversation()
  }

  getConversation = () => {
    this.database.getConversation().then((conversation) => {
      this.conversationArr = conversation 
      this.ask_question()
    }).catch((error) => {
      console.log("Error retrieving conversation:", error);
    });
  }

  ask_question = () => {
    const body = {
      model:"gpt-3.5-turbo",
      messages: this.conversationArr,
      presence_penalty: 1
    }
    console.log(body)
    axios.post(this.url, body, { headers: this.headers })
    .then(res => { 
      this.database.pushConversation(res.data.choices[0].message)
      this.createSpeechBubble("ai", res.data.choices[0].message.content)
    })
    .catch(err => { console.log(err);})
  }

  createSpeechBubble (type, text){
    const newSpeechBubble = document.createElement('div')
    if (type == "ai"){
      newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
      this.aiOutput(text, newSpeechBubble)
    }
    else {
      newSpeechBubble.classList.add('speech', 'speech-human')
      newSpeechBubble.textContent = this.userInput.value
      this.chatbotConversation.scrollTop = this.chatbotConversation.scrollHeight
    }
    this.chatbotConversation.appendChild(newSpeechBubble)
  }

  aiOutput(text, speechBubble) {
    let i = 0

    const interval = setInterval(() => {
      speechBubble.textContent += text.slice(i-1, i)
      if (text.length === i) {
          clearInterval(interval)
          speechBubble.classList.remove('blinking-cursor')
      }
      i++
      this.chatbotConversation.scrollTop = this.chatbotConversation.scrollHeight
    }, 50)
  }
}
