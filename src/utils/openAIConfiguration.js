//Make openAI Configuration
//Make api call.
//api call should be taken from roundrobin function
//return the response
import { Configuration, OpenAIApi } from 'openai';

export const fetchOpenApiData = async (content) => {
	//const apiKey = roundRobinKeys()();
	const openai = new OpenAIApi(
		new Configuration({
			apiKey: import.meta.env.VITE_OPENAIAPI_KEY,
		}),
	);
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: content }],
		//max_tokens: 10,
	});
	return response?.data?.choices[0]?.message?.content;
};
