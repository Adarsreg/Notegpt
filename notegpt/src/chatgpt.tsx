import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: "API_KEY_HERE",

});


const openai = new OpenAIApi(config)

export default openai;