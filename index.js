import { process } from './mv.js'

const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')
const outputText = document.getElementById('output-text')

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`

    generateText(setupTextarea.value)
    fetchSymposis(setupTextarea.value)
  }
})

const apiKey = process.env.OPEN_AI_KEY
const url = "https://api.openai.com/v1/completions"
const headers= {   
  'Content-Type': 'application/json',   
  'Authorization':`Bearer ${apiKey}` 
}

const generateText = (outline) => { 
  const body= {
    model: "text-davinci-003",
    prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: Two dogs fall in love and move to Hawaii to learn to surf.
    message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
    ###
    outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
    message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
    ###
    outline: A group of corrupt lawyers try to send an innocent woman to jail.
    message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
    ###
    outline: ${outline}
    message: 
    `,
    max_tokens: 60 //default 16 // 100 token 75 words
  }

  axios.post(url, body, {headers})
  .then(res => {
    movieBossText.innerText = res.data.choices[0].text
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

const fetchSymposis = (outline) => {
  const body = {
    model: "text-davinci-003",
    prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline
    ###
    outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
    ###
    outline: ${outline}
    synopsis: 
    `,
    max_tokens: 400
  }

  axios.post(url, body, {headers})
  .then(res => { 
    outputText.innerHTML = res.data.choices[0].text;
    setupInputContainer.classList.add("d-none");
  })
  .catch(err => { console.log(err) })
}

// with FETCH

// fetch(url, {
//    method: "POST",
//    headers: {
//      'Content-Type': 'application/json',
//      'Authorization':`Bearer ${apiKey}`
//    },
//    body: JSON.stringify({
//      'model': "",
//      'prompt': "Sound sympathic in 5 words or less",
//    })
//  }).then(response => response.json()).then(data => movieBossText.innerText = data.choices[0].text)


// text-davinci-003
// text-curie-001
// text-babbage-001
// text-ada-001