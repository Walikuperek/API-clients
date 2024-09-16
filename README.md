# API Clients for Node and Browser

*Based on API's from [GitHub QUAK repositories](https://github.com/walikuperek).*

Client examples usage:
```javascript copy
import { api } from "./libs/api-client";
import fetch from "node-fetch"; // for NodeJS only

const newsletterAPI = api.newsletter(fetch, "localhost:3000") // or your prod Newsletter service url
const textToTextAI = new api.textToTextAI({ // chatgpt
  fetchFn: fetch,
  apiKey: "your-openai-api-key",
  n: 2 // 2 responses, 1 default
});

(async () => {
    // ChatGPT API
    const title = "Red Pillow 50cm x 50cm"
    const [description, description2] = await textToTextAI.gen(`Generate product description for an action based on this title: ${title}`)

    // NewsletterAPI
    await newsletterAPI.subscribers.addNewSubscriber("email@em.com", "Full Name") // will send confirmation email
    const jwt = await newsletterAPI.auth.login("username", "password")
    await newsletterAPI.subscribers.sendNewsletter(jwt, "subject", "1st newsletter message 🎉🎂")
})();
```

Simple install into your project:
```bash copy
cd /path/to/repository
git submodule add https://github.com/Walikuperek/API-clients.git libs/api-client
git add .gitmodules libs/api-client
git commit -m "Added API clients"
```

## Clients

| Client         | Purpose                                                                                                                        |
|----------------|--------------------------------------------------------------------------------------------------------------------------------|
| ChatGPT API    | generate response from prompt                                                                                                  |
| Newsletter API | append new subscribers, send Newsletter, etc. ([NewsletterAPI link](https://github.com/Walikuperek/NewsletterAPI/tree/master)) |


**Author**
QUAK Kacper Walczak, [visit website to see more details](https://quak.com.pl)