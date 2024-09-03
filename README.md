# API Clients for Node and Browser

*Based on API's from [GitHub QUAK repositories](https://github.com/walikuperek).*

Client example usage:
```javascript copy
// Browser
const client = NewsletterAPIClient(fetch)
await client.subscribers.addNewSubscriber('email@em.com', 'Full Name') // will send confirmation email

// NodeJS
const fetch = require('node-fetch')
const client = NewsletterAPIClient(fetch)
const jwt = await client.auth.login('admin', 'password')
await client.subscribers.sendNewsletter(jwt, 'subject', '🎉 1st newsletter message 🎂')
```

Simple install into your project:
```bash copy
cd /path/to/repository
git submodule add https://github.com/Walikuperek/API-clients.git libs/api-client
git add .gitmodules libs/api-client
git commit -m "Added API clients"
```

## Clients

| Client        | Purpose                                                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| NewsletterAPI | append new subscribers, send Newsletter, etc. ([NewsletterAPI link](https://github.com/Walikuperek/NewsletterAPI/tree/master)) |


**Author**
QUAK Kacper Walczak, [visit website to see more details](https://quak.com.pl)
