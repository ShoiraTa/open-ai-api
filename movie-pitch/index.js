import { process } from '../mv.js'

export default class MoviePitch {
  constructor (){
    this.setupInputContainer = document.getElementById('setup-input-container')
    this.movieBossText = document.getElementById('movie-boss-text')
    this.outputText = document.getElementById('output-text')
    this.outputTitle = document.getElementById('output-title')
    this.url = "https://api.openai.com/v1/completions"
    this.setupTextarea = document.getElementById('setup-textarea') 
    this.user_prompt = this.setupTextarea.value
    this.headers= {   
      'Content-Type': 'application/json',   
      'Authorization':`Bearer ${process.env.OPEN_AI_KEY}` 
    }
  }

  init = () => {
    if (this.user_prompt) {
      this.setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
      this.movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
      this.generateText()
    }
  }
  
  generateText = () => { 
    const body= {
      model: "text-babbage-001",
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
      outline: ${this.user_prompt}
      message: 
      `,
      max_tokens: 60 //default 16 // 100 token 75 words
    }
    this.post(body, this.movieBossText)  
    this.fetchSymposis()
  }
  
  fetchSymposis = () => {
    const body = {
      model: "text-babbage-001",
      prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline
      ###
      outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
      ###
      outline: ${this.user_prompt}
      synopsis: 
      `,
      max_tokens: 400
    }

    this.post(body, this.outputText)
    .then(res => {
      this.setTitle(res);
      // this.setupInputContainer.classlist.add("d-none")
    })
    .catch(err => {
      console.log(err);
    });    
  }
  
  setTitle = (sinopsis) => {
    const body = {
      model: "text-babbage-001",
      prompt: `Generate an engaging, professional and marketable title based on ${sinopsis}`,
      max_tokens: 20,
      temperature: 0.7
    }
    this.post(body, this.outputTitle)
  }

  post = (body, el) => {
    return new Promise((resolve, reject) => {
      axios.post(this.url, body, { headers: this.headers })
        .then(res => {
          el.innerHTML = res.data.choices[0].text;
          resolve(res.data.choices[0].text);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };
  
}

// text-davinci-003
// text-curie-001
// text-babbage-001
// text-ada-001