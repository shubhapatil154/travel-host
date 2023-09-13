import Replicate from 'replicate';

export const fetchLLamaData = async (content) => {
	//const apiKey = roundRobinKeys()();

	const replicate = new Replicate({
		auth: import.meta.env.VITE_LLAMA_API_KEY,
	});

	const output = await replicate.run(
		'replicate/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1',
		{
			input: {
				prompt: content,
			},
		},
	);
	console.log(output, 'llama');
};
