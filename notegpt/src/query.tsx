import openai from "./chatgpt";
const query = async (title: string): Promise<string> => {

    const resp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "write me a very short and brief note on " + title + ":",
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then((resp) => resp.data.choices[0].text);



    return resp || "";

};

export default query;

