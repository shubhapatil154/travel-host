import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { StyledDropdown } from "./Dropdown.styles";

export const Dropdown = (props) => {
  const { options, dropdownLabel, onChange } = props;

  // State to hold the selected value
  const [selectedValue, setSelectedValue] = useState("");

  // Event handler for dropdown value changes
  const handleChange = (event) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);

    // Call the parent's onChange prop and pass the selected value
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <StyledDropdown>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{dropdownLabel}</InputLabel>
        <Select
          className="inputField"
          labelId="dropdown-label"
          id="dropdown-select"
          value={selectedValue}
          label={dropdownLabel}
          onChange={handleChange} // Attach the event handler to the Select
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledDropdown>
  );
};
