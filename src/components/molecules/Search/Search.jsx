import { useState } from 'react';

//import { fetchOpenApiData } from '../../../utils/openAIConfiguration';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { CustomTextField } from '../StyledTextField.js/StyledTextField';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import ItineraryTable from '../SearchResults/SearchResults';
import { PlannerForm } from '../PlannerInputForm/PlannerForm';
import { Box, Modal } from '@material-ui/core';
import { fetchPschatOpenApi } from '../../../utils/pschat';

const StyledSearch = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	margin-bottom: 5%;
`;

const Heading = styled.h1`
	text-align: center;
	font-size: 36px;
	margin-bottom: 16px;
	color: rgb(2, 9, 26);

	@media (max-width: 768px) {
		font-size: 30px; // Adjust font size for smaller screens
	}
`;
const Subheading = styled.h2`
	text-align: center;
	font-size: 24px;
	margin-bottom: 16px;
	color: rgb(4, 24, 75);

	@media (max-width: 768px) {
		font-size: 20px; // Adjust font size for smaller screens
	}
`;
const Container = styled.div`
	width: 90%; // Initial width for smaller screens
	margin: 3% auto 0;
	padding: 2%;
	@media (min-width: 600px) {
		width: 50%; // Adjust width for larger screens
	}
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-radius: 50px; /* Add border radius to the container */
	border: none;
	background-color: rgb(255 255 255/20%); /* Light blue background color */
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
const TextInfo = styled.div`
	margin-right: 8px;
	font-size: 16px;
	color: #fff;
`;
const CustomButton = styled(Button)({
	'&.MuiButton-root': {
		height: '50px',
		padding: '10px 20px',
		backgroundColor: 'rgba(71, 2, 92, 0.96)',
		color: '#fff',
		borderRadius: '10px',
		fontSize: '16px',
		cursor: 'pointer',
		'&:focus ,&:hover': {
			outline: 'none',
			boxShadow: '0px 0px 0px 2px rgba(202, 121, 201, 0.7)',
			backgroundColor: 'rgba(143, 81, 194, 0.9)',
		},
		'@media (max-width: 700px)': {
			'&.MuiButton-root': {
				height: '30px',
				padding: '5px 10px',
				borderRadius: '10px',
				fontSize: '15px',
				cursor: 'pointer',
				'&:focus ,&:hover': {
					outline: 'none',
					boxShadow: '0px 0px 0px 2px rgba(202, 121, 201, 0.7)',
					backgroundColor: 'rgba(143, 81, 194, 0.9)',
				},
			},
		},
	},
});
const StyledAdvanceButton = styled.div`
	margin: 40px;
	background-color: #e2c6dd;
	border-radius: 50px;
	padding: 10px;
	box-shadow: 0px 0px 10px #bbaeca;
	transition: all 0.2s ease-in-out;
	@media (max-width: 767px) {
		margin: 5px;
		span {
			padding: 5px;
			font-size: 12px;
		}
	}
`;

const ErrorText = styled.div`
	color: #d32f2f;
	font-size: 16px;
	margin-top: 10px;
	text-align: center;
`;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
export const Search = (onClick) => {
	const maxLength = 20;
	const [searchInput, setSearchInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [itinerary, setItinerary] = useState('');

	const prompt = (searchQuery) =>
		`You are a web page generator AI. Please generate a Json response of a travel itinerary details for ${searchQuery}, do not show more than 10 days  in english it should have the keys itinerary:{ destination, activities:{} },include mimimum 4 activities for each day , strictly do not include any welcome text and conclusion text`;

	const fetchdata = async () => {
		if (!searchInput.trim()) {
			setError('Please enter a place related to travel.');
			return;
		}
		try {
			setLoading(true);
			//const placeList = await fetchOpenApiData(prompt(searchInput));
			const placeList = await fetchPschatOpenApi(prompt(searchInput));
			//const placeList = await fetchLLamaData(prompt(searchInput));

			setItinerary(JSON.parse(placeList));
			setLoading(false);
			setError(null);
		} catch (error) {
			setError('Oops! An error occurred while fetching the data.');
			setLoading(false);
		}
	};

	//const data = generateChatGptPrompt(searchData);
	//step1: create a searchbar  and button
	//step1:Create a button and name is Run
	//step2:on click of button check if input value has any word related to travel
	//step3:If it has values then create a chatgpt prompt to get itinery for the search query
	//step4:create configuration to connect with chatgpt
	//step5: send the prompt to chatgpt through api call
	//step6:make sure that response has only html, so that it can be rendered as it is
	//step7:consume the response.
	//step8:display as html in the screen
	//step9:create a card for displaying the data in structured manner
	//step10:Else show some error message
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const remainingChars = maxLength - searchInput.length;
	const displayRemainingChars = Math.max(0, remainingChars); // Ensure it doesn't go below zero

	return (
		<StyledSearch>
			<Heading>Travel Host</Heading>
			<Subheading>Plan your perfect trip in just a few clicks!</Subheading>

			<Container>
				<CustomTextField
					key="password"
					label="Enter the place(maximum 20 characters)"
					variant="standard"
					autoFocus={true}
					style={{ marginRight: '10px' }}
					maxLength={maxLength}
					value={searchInput}
					onChange={(event) => {
						setSearchInput(event.target.value.slice(0, maxLength));
						setError('');
						setItinerary('');
					}}
				/>
				<TextInfo>{displayRemainingChars}</TextInfo>
				<CustomButton onClick={fetchdata}>Run</CustomButton>
			</Container>
			<StyledAdvanceButton>
				<Button onClick={handleOpen}>Get Advanced Iternary</Button>
			</StyledAdvanceButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<PlannerForm onClose={handleClose} />
				</Box>
			</Modal>

			{loading ? (
				<LoadingIndicator />
			) : error ? (
				<ErrorText>{error}</ErrorText>
			) : itinerary ? (
				<ItineraryTable tableData={itinerary} />
			) : null}
		</StyledSearch>
	);
};
