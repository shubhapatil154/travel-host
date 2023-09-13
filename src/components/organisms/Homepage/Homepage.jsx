import { Search } from '../../molecules/Search/Search';

import styled from 'styled-components';

const StyledHomepage = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
`;

export const Homepage = () => {
	return (
		<StyledHomepage>
			<Search />
		</StyledHomepage>
	);
};
