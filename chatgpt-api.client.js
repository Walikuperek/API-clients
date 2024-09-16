/**
 * Configuration object for ChatGPTClient.
 * Contains all the parameters that can be sent to the OpenAI API.
 * @typedef {Object} ChatGPTConfig
 * @param fetchFn for browser simply `fetch` | for node `const fetch = require("node-fetch")`
 * @property {string} apiKey - API key for authenticating with OpenAI.
 * @property {string} [model="gpt-4"] - The model to use for the completion (default is "gpt-4").
 * @property {string} [apiUrl="https://api.openai.com/v1/chat/completions"] - The API URL for OpenAI.
 * @property {number} [temperature=0.7] - Sampling temperature, higher values make output more random (default is 0.7).
 * @property {number} [maxTokens=150] - The maximum number of tokens to generate in the completion (default is 150).
 * @property {number} [topP=1] - Controls diversity via nucleus sampling (default is 1).
 * @property {number} [n=1] - The number of completions to generate for each prompt (default is 1).
 * @property {string[]} [stop] - Up to 4 sequences where the API will stop generating further tokens.
 * @property {number} [presencePenalty=0] - Penalty for repeating new tokens (default is 0).
 * @property {number} [frequencyPenalty=0] - Penalty for repeating frequent tokens (default is 0).
 * @property {Object.<string, number>} [logitBias] - Modify the likelihood of specific tokens appearing in the completion.
 * @property {string} [user] - A unique identifier representing your end-user.
 */

/**
 * ChatGPTClient class to interact with the OpenAI API.
 */
export default class ChatGPTClient {
    /**
     * Creates an instance of ChatGPTClient.
     * @param {ChatGPTConfig} config - Configuration object for the client.
     */
    constructor(config) {
        this.fetchFn = config.fetchFn;
        this.apiKey = config.apiKey;
        this.model = config.model || "gpt-4";
        this.apiUrl = config.apiUrl || "https://api.openai.com/v1/chat/completions";
        this.temperature = config.temperature || 0.7;
        this.maxTokens = config.maxTokens || 150;
        this.topP = config.topP || 1;
        this.n = config.n || 1;
        this.stop = config.stop;
        this.presencePenalty = config.presencePenalty || 0;
        this.frequencyPenalty = config.frequencyPenalty || 0;
        this.logitBias = config.logitBias;
        this.user = config.user;
    }

    /**
     * Generate a response from ChatGPT based on the prompt.
     * @param {string} prompt - The prompt to send to the OpenAI API.
     * @returns {Promise<string[]>} - Returns a Promise that resolves to an array of responses.
     */
    async gen(prompt) {
        const requestBody = {
            model: this.model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: this.maxTokens,
            temperature: this.temperature,
            top_p: this.topP,
            n: this.n,
            stop: this.stop,
            presence_penalty: this.presencePenalty,
            frequency_penalty: this.frequencyPenalty,
            logit_bias: this.logitBias,
            user: this.user,
        };

        try {
            const response = await this.fetchFn(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices.map(choice => choice.message.content);
        } catch (error) {
            return ["Error generating response"];
        }
    }
}
