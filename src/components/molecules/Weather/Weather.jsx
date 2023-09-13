import { Card, CardContent, Typography, Box, Grid } from '@material-ui/core';
import { styled } from 'styled-components';

const WeatherCard = styled(Card)({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const WeatherIcon = styled('img')({
	width: 60,
});

const Weather = ({ weatherData }) => {
	return (
		<Box mt={4} style={{ width: '90%' }}>
			{weatherData && (
				<WeatherCard>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							{weatherData?.name}
						</Typography>
						<WeatherIcon
							src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
							alt="Weather Icon"
						/>
						<Typography variant="body1" gutterBottom>
							{weatherData.weather[0].description}
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant="body1" gutterBottom>
									Temperature: {Math.round(weatherData.main.temp)}°C
								</Typography>
								<Typography variant="body1" gutterBottom>
									Min Temp: {Math.round(weatherData.main.temp_min)}°C
								</Typography>
								<Typography variant="body1" gutterBottom>
									Max Temp: {Math.round(weatherData.main.temp_max)}°C
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="body1" gutterBottom>
									Humidity: {weatherData.main.humidity}%
								</Typography>
								<Typography variant="body1" gutterBottom>
									Pressure: {weatherData.main.pressure} hPa
								</Typography>
								<Typography variant="body1" gutterBottom>
									Wind Speed: {weatherData.wind.speed} m/s
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography variant="body1" gutterBottom>
									Last Update: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</WeatherCard>
			)}
		</Box>
	);
};

export default Weather;
