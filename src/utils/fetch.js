import axios from 'axios';
export const getRequest = async (url,params) => {
	return await axios.get(url,params);
};
