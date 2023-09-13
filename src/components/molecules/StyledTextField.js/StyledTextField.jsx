import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

const CustomTextFieldStyled = styled(TextField)({
  width: "100%",
  fontSize: "25px", // Increase font size for the label
  "@media (min-width: 600px)": {
    "& .MuiInputBase-input": {
      fontSize: "20px", // Increase font size for the input text
      display: "flex",
      //alignItems: 'center', // Align the text vertically to the center
    },
    "& label.MuiInputLabel-root": {
      color: "#333" /* Label color consistent */,
      fontSize: "20px" /* Increase label font size */,
    },
  },
  "@media (max-width: 567px)": {
    "& .MuiInputBase-input": {
      fontSize: "10px", // Increase font size for the input text
      display: "flex",
      //alignItems: 'center', // Align the text vertically to the center
    },
    "& label.MuiInputLabel-root": {
      color: "#333" /* Label color consistent */,
      fontSize: "10px" /* Increase label font size */,
    },
  },
  "& .MuiInput-underline:before": {
    borderBottom: "none", // Remove the bottom border
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none", // Remove the bottom border when the field is focused
  },
  "&:hover .MuiInput-underline:before": {
    borderBottom: "none", // Remove the bottom border on hover
  },
  "&.Mui-focused:hover .MuiInput-underline:before": {
    borderBottom: "none", // Remove the bottom border on hover when the field is focused
  },
  "& label.MuiInputLabel-root": {
    color: "#333" /* Label color consistent */,
  },
});
const CustomTextField = (props) => {
  return <CustomTextFieldStyled {...props} />;
};

export { CustomTextField };
