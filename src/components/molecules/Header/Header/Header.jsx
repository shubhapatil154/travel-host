//create a header using react, material ui,, styled components
//add logo at left
//add two links at right. 1. Home 2. My Trips
//Links should have white color
//Mytrips should indicate number of trips in Link.
//Get the number from local storage, key tripsPlanned array.
//When the number of trips is 0, indicate to the user in some way, and it should not make any additional action on click
//On click of Home it should redirect to url.
//Onclick of My trips it should show Modal.
//Modal should contain list of trips in card
//each card should have Destination name, image.
//On click , it should navigate to travels/place
//In modal, based on the number of trips , show the details
//Create delete trips planned in modal.
//keep the button at top right.
//Give some title to the modal
//Style the header of modal
//No padding , no margin, background color, to differentiate between the content and header
//Make the modal responsive.


import TravelHost from '../../../../assets/TravelHost.png';

import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Card } from '@material-ui/core';
import styled from 'styled-components';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../../../../utils/getFromLocalStorage';
import Base64Image from '../Image/BaseImage';
import heroImage from '../../../../assets/city.jpg';
import beachImage from '../../../../assets/delhi-city.jpg';
import mountainsImage from '../../../../assets/city-lights.jpg';
import natureImage from '../../../../assets/nature.jpg';

const StyledAppbar = styled(AppBar)`
	background: #ddc0e7 !important;
	padding: 10px;
	@media (max-width: 767px) {
		width: 105vw !important;
	}
`;

const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalContainer = styled(Card)`
	position: absolute;
	width: 90%;
	max-width: 600px;
	margin: 20px auto;
	border: 1px solid #ccc;
	background-color: #fff;
`;

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ddc0e7;
	padding: 10px;
`;

const ModalTitle = styled(Typography)`
	font-weight: bold;
	margin: 0;
	padding: 0;
`;

const ClearButton = styled(Button)`
	&& {
		margin-top: 16px;
	}
`;

const Logo = styled.img`
	border: 1px solid black;
	border-radius: 50%;
	width: 70px;
	height: 70px;
`;

const Links = styled.div`
	display: flex;
	gap: 20px;
	margin-left: auto;
`;

const ModalContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	outline: none;
	border-radius: 4px;
	padding: 20px;
`;

const DestinationCard = styled(Card)`
	width: 200px;
	margin: 10px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	background-color: #ccc4ce;
`;

const DestinationImage = styled.img`
	max-width: 100%;
	height: auto;
`;

const NoTripsText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 18px;
	color: #888;
`;

export const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const parsedTrips = getFromLocalStorage('tripsPlanned');
	const tripData = parsedTrips || [];
	const numTrips = parsedTrips?.length || 0;
	const [noofTrip, setNoOfTrip] = useState(0);
	useEffect(() => {
		setNoOfTrip(parsedTrips?.length || 0);
	}, [parsedTrips]);
	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleDestinationClick = (destination) => {
		navigate(`/travel/${destination.toLowerCase()}`, { replace: true });
		handleModalClose();
	};

	const handleClearTrips = () => {
		localStorage.removeItem('tripsPlanned');
		localStorage.removeItem('userPreferences');
		handleModalClose();
	};

	const imageUrls = [heroImage, beachImage, mountainsImage, natureImage];

	return (
		<>
			<StyledAppbar position="static">
				<Toolbar>
					<Link to={'/'}>
						<Logo src={TravelHost} alt="TravelHost" />
					</Link>
					<Links>
						<Button href="/">Home</Button>
						<Button onClick={handleModalOpen}> My Trips ({noofTrip})</Button>
					</Links>
				</Toolbar>
			</StyledAppbar>
			{/* Modal */}
			<StyledModal open={isModalOpen} onClose={handleModalClose}>
				<ModalContainer>
					<ModalHeader>
						<ModalTitle variant="h5">Planned Trips</ModalTitle>
						{noofTrip > 0 && (
							<ClearButton onClick={handleClearTrips} color="inherit" edge="end">
								Clear All Trips
							</ClearButton>
						)}
					</ModalHeader>
					<ModalContent>
						{noofTrip === 0 ? (
							<NoTripsText>No trips planned.</NoTripsText>
						) : (
							tripData?.map((trip, index) => {
								const tripDetails = Object?.values(trip)[0];
								return (
									<DestinationCard
										key={index}
										onClick={() => handleDestinationClick(tripDetails?.itinerary?.destination)}
									>
										<Base64Image url={imageUrls[index]} isStatic={true} isCard={true} />
										<Typography variant="h6">{tripDetails?.itinerary?.destination}</Typography>
									</DestinationCard>
								);
							})
						)}
					</ModalContent>
				</ModalContainer>
			</StyledModal>
		</>
	);
};
