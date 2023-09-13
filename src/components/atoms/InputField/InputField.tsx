import React from "react";
import TextField from "@material-ui/core/TextField";
import { StyledInputField } from "./InputField.styles";

export const InputField = (props) => {
  const { inputLabel, type, onChange } = props;

  // Event handler for value changes
  const handleChange = (event) => {
    // Get the value from the event
    const value = event.target.value;

    // Call the parent's onChange prop and pass the value
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <StyledInputField>
      <TextField
        type={type}
        id="outlined-basic"
        autoFocus={true}
        label={inputLabel}
        variant="standard"
        className="inputField"
        onChange={handleChange} // Attach the event handler to the TextField
      />
    </StyledInputField>
  );
};
