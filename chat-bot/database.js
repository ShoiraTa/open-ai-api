import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

export default class Database {
  constructor(){
    this.appSettings= {
      databaseURL: "https://open-ai-test-chat-default-rtdb.europe-west1.firebasedatabase.app",
    }
    this.app = initializeApp(this.appSettings)
    this.database = getDatabase(this.app)
    this.conversationDb = ref(this.database)
    this.conversationArr = []
  }

  pushConversation = (value) => {
    push(this.conversationDb, value)
  }

  getConversation = async () => {
    try {
      const snapshot = await get(this.conversationDb);
      if (snapshot.exists()) {
        this.conversationArr = Object.values(snapshot.val());
        console.log(this.conversationArr);
        this.conversationArr.unshift({
          role: 'system',
          content: "you are an assistant that gives short answers"
        });
      } else {
        console.log("No data available");
      }
      return this.conversationArr;
    } catch (error) {
      console.log("Error retrieving conversation:", error);
      return null;
    }
  };
}
