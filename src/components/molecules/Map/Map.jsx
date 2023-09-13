// src/components/Map.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '400px',
};

export const Map = ({ place }) => {
	const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 2 });

	// useEffect(() => {
	// 	// Fetch the latitude and longitude of the specified place using Geocoding service
    //     const geocoder = new google.maps.Geocoder();
	// 	geocoder.geocode({ address: place }, (results, status) => {
	// 		if (status === 'OK' && results.length > 0) {
	// 			setMapCenter(results[0].geometry.location);
	// 		}
	// 	});
	// }, [place]);

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={1}>
				{/* Add any additional map components or markers here */}
			</GoogleMap>
		</LoadScript>
	);
};


