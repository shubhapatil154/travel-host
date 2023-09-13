import axios from 'axios';
export const fetchPschatOpenApi = async (prompt) => {
	let body = {
		message: prompt,
		options: { model: 'gpt35turbo' },
	};
	let options = {
		method: 'POST',
		url: 'https://api.psnext.info/api/chat',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_PS_CHAT_API_KEY}`,
		},
		data: body,
	};

	const response = await axios(options);
	return response?.data?.data?.messages?.[2]?.content;
};
