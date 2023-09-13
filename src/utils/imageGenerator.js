import { getRequest } from './fetch';
import { getRandomArbitrary } from './helper';

export const imagegenerator = async (queryString) => {
	let imageUrl = '';
	const response = await getRequest(
		`https://pixabay.com/api/?key=38499356-6ae92a0be700a68becd9b1655&q=${encodeURIComponent(
			queryString,
		)}&per_page=30'`,
	);
	if (response?.data?.total > 0) {
		let random_Number = getRandomArbitrary(0, response?.data?.hits.length || 3);
		imageUrl = response?.data?.hits[random_Number]?.largeImageURL;
	}
	return imageUrl;
};
