import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const CustomCheckbox = ({ label, checked, onChange, name }) => {
	return (
		<FormControlLabel
			control={<Checkbox checked={checked} onChange={onChange} name={name} color="primary" />}
			label={label}
		/>
	);
};
