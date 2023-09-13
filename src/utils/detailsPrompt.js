const expectedResponse = {
	itinirery: {
		destintaion: 'Manali',
		destinationDetailsdetails: 'manali is cold',
		activities: {
			1: [
				'Visit Hadimba Temple',
				'Explore Vashisht Village',
				'Take a dip at Manikaran Hot Springs',
				'Enjoy river rafting in Beas River',
			],
			2: [
				'Visit Solang Valley for adventurous activities", "Go for a thrilling paragliding experience", "Explore Naggar Castle", "Enjoy a leisurely walk at Mall Road"',
			],
		},
		estimatedBudget: 10000,
		thingsToKeepInMind: ['carry purse', 'carry id card'],
	},
};

// reviews: { authorName: 'Place is good' },
// 		nearbyHotels: 'list of accomodations',

export const travelDetailsPrompt = ({
	destination = 'manali',
	tripDuration = 1,
	numberOfPeople = 1,
	budget = 1500,
	eatingPreference = 'veg',
	mealsIncluded = 'breakfast, dinner, lunch',
}) => {
	let calculateBudget =
		budget <= 1500 * tripDuration * numberOfPeople ? 1500 * tripDuration * numberOfPeople : budget;
	return `You are a web page generator AI. Please generate a Json response of a travel itinerary
     details for ${destination}, only for ${tripDuration || 1} days, only${
		numberOfPeople || 1
	} people, calculate estimated total expenses for all itinerary with maximum budget of Rs.${calculateBudget} and ${eatingPreference} 
     eating preference, ${mealsIncluded} meals included.  
     in english it should be in this format ${JSON.stringify(
				expectedResponse,
			)},include mimimum 8 activities for each day , strictly do not include any welcome text and conclusion text`;
};
