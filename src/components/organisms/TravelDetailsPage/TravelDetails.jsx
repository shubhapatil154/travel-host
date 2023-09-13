//In travelDetails page, check from where it is landed, if its a new trip plan,
//Affter fetching the component, check in local storage, if it has place as key in tripsPlanned array.
//If yes, replace with new value.
//else, create a new value inside tripsPlanned array. With place as key
//if it is coming from my trips planned action, do not make api call, show from local storage
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { travelDetailsPrompt } from '../../../utils/detailsPrompt';
import styled from 'styled-components';
import { Typography, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { getRequest } from '../../../utils/fetch';
import Weather from '../../molecules/Weather/Weather';
import { useLocation } from 'react-router-dom';
import Base64Image from '../../molecules/Header/Image/BaseImage';
import { getFromLocalStorage } from '../../../utils/getFromLocalStorage';
import { getImageprompts } from '../../../utils/imagePrompt';
import { textToImage } from '../../../utils/texttoImage';
import { SkeletonComponent } from '../../molecules/Skeleton/Skeleton';
//import { fetchOpenApiData } from '../../../utils/openAIConfiguration';
import CityImage from '../../../assets/city.jpg';
import CitySecondImage from '../../../assets/city-lights.jpg';
import DelhiImage from '../../../assets/delhi-city.jpg';
import bangaloreImage from '../../../assets/street-city.jpg';
import { getRandomArbitrary } from '../../../utils/helper';
import { fetchPschatOpenApi } from '../../../utils/pschat';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	color: black;
`;

const Card = styled(Paper)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 10px 20px;
	width: 50vw;
	text-align: center;
	justify-content: center;
	padding-top: 2%;
	padding-bottom: 2%;
	background-color: #f8eefb !important; /* Light blue background */
	@media (max-width: 600px) {
		flex-direction: column;
		width: 100vw;
		margin: 10px auto;
	}
`;

const ActivityList = styled(List)`
	max-width: 600px;
	margin-bottom: 20px;
	text-align: center;
	justify-content: center;
	@media (max-width: 600px) {
		/* Adjust styles for screens with a maximum width of 600px */
		max-width: 300px; /* Reduce the maximum width of the activity list */
		margin: 0 auto; /* Center the activity list horizontally */
	}
`;

const Destination = styled(Typography)`
	margin-bottom: 10px;
	font-size: 24px;
	text-align: center;
	font-weight: bold;
	@media (max-width: 600px) {
		/* Adjust styles for screens with a maximum width of 600px */
		font-size: 18px;
	}
`;

const DestinationDetails = styled(Typography)`
	margin-bottom: 20px;
	font-size: 16px;
	text-align: center;
`;

const DayHeading = styled(Typography)`
	margin-bottom: 10px;
	font-size: 20px;
`;

const EstimatedBudget = styled(Typography)`
	margin-bottom: 20px;
	font-size: 30px;
`;

const ErrorText = styled.div`
	color: #d32f2f;
	font-size: 16px;
	margin-top: 10px;
	text-align: center;
`;

const ThingsToKeepInMind = styled(List)`
	max-width: 500px;
`;

const StyledListItem = styled(ListItem)`
	&& {
		padding: 5px 0;
	}
`;

const StyledContainer = styled.div`
	display: grid;
	margin-bottom: 5%;
	@media (max-width: 560px) {
		grid-template-columns: 1fr; /* Switch to one column on smaller screens */
	}
	grid-template-columns: 1.3fr 1fr;

	.travelImages {
		display: grid;
		@media (max-width: 560px) {
			grid-template-columns: 1fr; /* Switch to one column on smaller screens */
		}
		grid-template-columns: repeat(2, 1fr); /* Creates two equally sized columns */
		gap: 20px; /* Adjust the gap between images as needed */
	}

	.imageRow {
		display: flex;
		margin-top: 10px;
	}
`;
const imageUrls = [CityImage, DelhiImage, bangaloreImage, CitySecondImage];
const RenderImages = ({ width, height, imageList, weatherData }) => {
	return (
		<div style={{ marginTop: '30px' }}>
			<Base64Image
				url={imageUrls[getRandomArbitrary(0, 4)]}
				isStatic={true}
				width={'95%'}
				height={'50%'}
				className="imageItempwea"
			/>
			<div className="travelImages">
				{imageList?.map((url, index) => {
					return (
						<Base64Image
							key={index}
							url={url}
							width={width}
							height={height}
							className="imageItem"
						/>
					);
				})}
			</div>
		</div>
	);
};

const getDayTitle = (day) => {
	return `Day:${day + 1}`;
};
const ItineraryDetails = ({ itineraryDetails, weatherData }) => {
	const itinerary = itineraryDetails?.itinerary || {};
	// (itineraryDetails ? JSON?.parse(itineraryDetails)?.itinerary : {});
	const activitiesWithDay = itinerary?.activities ? Object.entries(itinerary?.activities) : [];

	return (
		<Container>
			<Card>
				<Destination variant="h4">{itinerary?.destination}</Destination>
				<DestinationDetails>{itinerary?.destinationDetails}</DestinationDetails>
			</Card>

			{activitiesWithDay.map(([day, activities], index) => (
				<Card key={day}>
					<DayHeading variant="h4">{getDayTitle(index)}</DayHeading>
					<ActivityList component="ul">
						{activities.map((activity, index) => (
							<StyledListItem key={index} style={{ textAlign: 'center' }}>
								<ListItemText primary={activity} />
							</StyledListItem>
						))}
					</ActivityList>
				</Card>
			))}

			<Card>
				<EstimatedBudget variant="h5">
					Estimated Budget: Rs.{itinerary?.estimatedBudget}
				</EstimatedBudget>
			</Card>
			<Card>
				<DayHeading variant="h5">Things to Keep in Mind</DayHeading>
				<ThingsToKeepInMind component="ul">
					{itinerary?.thingsToKeepInMind?.map((item, index) => (
						<StyledListItem key={index} style={{ textAlign: 'center' }}>
							<ListItemText primary={item} />
						</StyledListItem>
					))}
				</ThingsToKeepInMind>
			</Card>
			<Weather weatherData={weatherData} className="imageItem" />
		</Container>
	);
};

export const TravelDetails = () => {
	const location = useLocation();
	const { destination } = useParams();
	const [imageList, setImageList] = useState([]);
	const [isTravelLoading, setIsTravelLoading] = useState(true);
	const [weatherData, setWeatherData] = useState(null);
	const [travelData, setTravelData] = useState('');
	const [error, setError] = useState('');
	// Fetch user details based on the userId

	const fetchWeatherData = async () => {
		try {
			if (destination) {
				const response = await getRequest(API_URL, {
					params: {
						q: destination,
						appid: import.meta.env.VITE_WEATHER_API_KEY,
						units: 'metric',
					},
				});

				setWeatherData(response.data);
			}
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};
	const fetchTravelDetails = async () => {
		//const tripsFromLocalStorage = localStorage.getItem('tripsPlanned');
		setIsTravelLoading(true);
		setError('');
		const parsedTrips = getFromLocalStorage('tripsPlanned') || [];
		try {
			if (destination) {
				if (location?.state?.isNewTrip && location?.state?.destination === destination) {
					const updatedTrips = parsedTrips.filter(
						(trip) => Object?.keys(trip)?.[0] !== destination,
					);
					const details = await fetchPschatOpenApi(travelDetailsPrompt(location.state));

					setTravelData(JSON.parse(details));
					updatedTrips.push({ [destination]: JSON.parse(details) });
					localStorage.setItem('tripsPlanned', JSON.stringify(updatedTrips));
				} else {
					const trip = parsedTrips?.filter((trip) => Object?.keys(trip)?.[0] === destination);
					if (trip?.length > 0) {
						setTravelData(trip[0]?.[destination]);
					} else {
						// Handle case when the place is not found in local storage (optional)
						console.warn(`Trip data for $ not found in local storage.`);
					}
				}
			}
		} catch (error) {
			setError(error.message);
			console.error('Error fetching user details:', error);
		} finally {
			setIsTravelLoading(false);
		}
	};

	const fetchImageList = async () => {
		let promiseArray = [];
		const imagePrompts = getImageprompts(destination);
		for (const prompt of imagePrompts) {
			promiseArray.push(textToImage(prompt));
		}
		Promise.all(promiseArray)
			.then((images) => {
				setImageList(images);
			})
			.catch((error) => console.log(error.message));
	};

	useEffect(() => {
		// Mock API call to fetch user details
		fetchTravelDetails();
		fetchWeatherData();
		fetchImageList();
		return () => {
			setImageList([]);
			setTravelData([]);
			setWeatherData('');
		};
	}, [destination]);

	return (
		<StyledContainer>
			<div style={{ minWidth: '50vw', minHeight: '40vh' }}>
				{isTravelLoading ? <SkeletonComponent /> : null}
				{error ? <ErrorText>{error}</ErrorText> : null}
				{travelData && !isTravelLoading ? (
					<ItineraryDetails
						key={destination}
						itineraryDetails={travelData}
						weatherData={weatherData}
					/>
				) : null}
			</div>
			{!isTravelLoading ? <RenderImages imageList={imageList} width={320} height={320} /> : null}
			{isTravelLoading ? <SkeletonComponent /> : null}
		</StyledContainer>
	);
};
