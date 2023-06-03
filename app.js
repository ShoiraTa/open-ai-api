import MoviePitch from './movie-pitch/index.js'
import ChatBot from './chat-bot/chat-bot.js'

const buttonsContainer = document.getElementById("buttons-container")

document.getElementById("send-movie-btn").addEventListener("click", () => {
  const moviePitch = new MoviePitch()
  moviePitch.init()
})

document.getElementById('show-movie-pitch').addEventListener("click", () => {
  document.getElementById('movie-pitch-body').classList.remove("d-none")
  buttonsContainer.classList.add("d-none")
})

document.getElementById('show-chat-bot').addEventListener("click", () => {
  document.getElementById('chat-bot-body').classList.remove("d-none")
  buttonsContainer.classList.add("d-none")
})