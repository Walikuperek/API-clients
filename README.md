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
await client.subscribers.sendNewsletterToAuthorizedSubscribers(jwt, 'subject', '1st newsletter message 🎉🎂')
```

Simple install into your project:
```bash copy
cd /path/to/repository
git submodule add https://github.com/Walikuperek/API-clients.git libs/api-client
git add .gitmodules libs/api-client
git commit -m "Added API clients"
```

## Clients

- **[NewsletterAPI](https://github.com/Walikuperek/NewsletterAPI/tree/master)** - append new subscribers, send Newsletter, etc.

<br />
<hr />

**In case you will struggle with Submodules:**

> How to clone repo with submodules?
> ```bash
> git clone --recurse-submodules https://github.com/user/repo-with-submodules.git
> ```
>
> Or, you already cloned without `--recurse-submodules`:
>
> ```bash
> git submodule init
> git submodule update
> ```
>
> How to update submodule
> ```
> cd path/to/submodule
> git pull origin main
> cd path/to/repository
> git add path/to/submodule
> git commit -m "Submodule updated"
> ```

**Author**
QUAK Kacper Walczak, [visit website to see more details](https://quak.com.pl)