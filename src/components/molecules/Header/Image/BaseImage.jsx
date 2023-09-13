import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Base64Image = ({ url = '', isStatic, isCard = false, width, height }) => {
	const StyledImage = styled.div`
		margin: 5px;
	`;

	const data = !isStatic ? 'data:image/png;base64,' + url : url;
	return isCard ? (
		<>
			<StyledImage>
				<img src={data} alt="Image" height={'200px'} />
			</StyledImage>
			<Typography variant="body2" color="textSecondary">
				View you trip...
			</Typography>
		</>
	) : (
		<StyledImage>
			<img src={data} alt="Image" width={width} height={height} />
		</StyledImage>
	);
};

export default Base64Image;
