import axios from 'axios';

//Images might be shown since there is limit of 125 images for free version using this API
export const textToImage = async (prompt) => {
	let url = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image';
	const body = {
		width: 512,
		height: 512,
		steps: 10,
		seed: 0,
		cfg_scale: 7,
		samples: 1,
		style_preset: 'enhance',
		text_prompts: [
			{
				text: prompt,
				weight: 1,
			},
		],
	};
	let options = {
		method: 'POST',
		url: url,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_AI_IMAGE_KEY}`,
		},
		data: body,
	};

	const baseResponse = await axios(options);

	return baseResponse?.data?.artifacts?.[0]?.base64;
};
