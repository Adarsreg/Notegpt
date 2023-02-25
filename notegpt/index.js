//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

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-KUslTr2H6OL3dJDxAnLQbEui",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function Callapi() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "what is your name? how were you invented?",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text)
}
Callapi()