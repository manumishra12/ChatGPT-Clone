const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({apiKey: "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"});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const openai = new OpenAIApi(configuration);

    try {
        const res = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presense_penalty: 0,
        });

        return res.data.choices[0].text;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            // Retry after a certain period or implement a backoff strategy
            const retryAfter = parseInt(error.response.headers['retry-after'], 10) || 10; // Default to 10 seconds
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return sendMsgToOpenAI(message); // Retry the request
        } else {
            console.error('Error communicating with OpenAI:', error);
            throw error;
        }
    }
}


// export async function sendMsgToOpenAI(message){
//     const res = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: message,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presense_penalty: 0
//     });
//     return res.data.choices[0].text;
// }

