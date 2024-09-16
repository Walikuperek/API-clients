import Http from './lib/http';

/**
 * @param fetchFn for browser simply `fetch` | for node `const fetch = require('node-fetch')`
 * @param {string} domain url to the NewsletterAPI service
 * @example Browser
 *  const client = NewsletterAPIClient(fetch)
 *  await client.subscribers.addNewSubscriber('email@em.com', 'Full Name')
 * 
 * @example NodeJS
 *  const fetch = require('node-fetch')
 *  const client = NewsletterAPIClient(fetch)
 *  const jwt = await client.auth.login('admin', 'password')
 *  await client.subscribers.sendNewsletterToAuthorizedSubscribers(jwt, 'subject', '1st newsletter message 🎉🎂')
 */
export default function NewsletterAPIClient(fetchFn, domain) {
    const http = Http(fetchFn);
    return {
        auth: {
            login: async (username, password) => await http.post(domain + '/api/auth/login', {username, password})["token"],
            signup: async (jwt, username, password) => await http.post(domain + '/api/auth/login', {username, password}, {'Authorization': jwt})
        },
        subscribers: {
            authorizeSubscriber: async (token) => await http.get(domain + `/api/subscribers/confirm/${token}`),
            unsubscribeSubscriber: async (token) => await http.get(domain + `/api/subscribers/unsubscribe/${token}`),
            addNewSubscriber: async (email, name) => await http.post(domain + `/api/subscribers/`, {email, name}),
            getAuthorizedSubscribers: async (jwt) => await http.get(domain + `/api/subscribers/`, {}, {'Authorization': jwt}),
            deleteSubscriber: async (jwt, id) => await http.delete(domain + `/api/subscribers/${id}`, {'Authorization': jwt}),
            sendNewsletter: async (jwt, subject, message) =>
                await http.post(domain + `/api/subscribers/send`, {subject, message}, {'Authorization': jwt})
        }
    }
}
