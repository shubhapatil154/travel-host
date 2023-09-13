// const travelPrompt = (destination) => `manali `;
// const culturePrompt = (destination) => `udupi`;
// const natureprompt = (destination) => `bangalore`;
// const foodprompt = (destination) => `delhi`;
// const musicprompt = (destination) => `chennai`;
//expedia, mdjrny-v4 style

const travelPrompt = (destination) =>
	`hero image for ${destination} travel on expedia, mdjrny-v4 style `;
const culturePrompt = (destination) => `culture of ${destination} on expedia, mdjrny-v4 style`;
const natureprompt = (destination) => `nature of ${destination} on expedia, mdjrny-v4 style`;
const foodprompt = (destination) => `food of ${destination} on expedia, mdjrny-v4 style`;
const musicprompt = (destination) => `music of ${destination} on expedia, mdjrny-v4 style`;
export const getImageprompts = (destination) => {
	return [
		travelPrompt(destination),
		culturePrompt(destination),
		natureprompt(destination),
		foodprompt(destination),
		musicprompt(destination),
	];
};
