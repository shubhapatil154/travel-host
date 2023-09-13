import * as React from 'react';
import { Box} from '@material-ui/core';
import {Skeleton} from '@mui/material';
export const SkeletonComponent = () => {
	return (
		<Box sx={{ margin:"20px" }}>
			<Skeleton height={'300px'}/>
			<Skeleton animation="wave" height={'300px'} />
			<Skeleton animation={false} height={'300px'} />
		</Box>
	);
};
