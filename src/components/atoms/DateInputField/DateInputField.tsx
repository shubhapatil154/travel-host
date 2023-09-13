// import * as React from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { StyledDateInputField } from "./DateInputField.styles";

// export const DateInputField = (props) => {
//   const { datePickerInputLabel, onChange, minDate } = props;
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs());

//   const computedMinDate = React.useMemo(() => {
//     return minDate ? dayjs(minDate) : dayjs();
//   }, [minDate]);

//   const handleChange = (newValue: Dayjs | null) => {
//     setValue(newValue);

//     if (onChange) {
//       onChange(newValue ? newValue.format("MM-DD-YYYY") : "");
//     }
//   };

//   return (
//     <StyledDateInputField>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker"]}>
//           <DatePicker
//             label={datePickerInputLabel}
//             value={value}
//             onChange={handleChange}
//             minDate={computedMinDate}
//             className="inputField"
//           />
//         </DemoContainer>
//       </LocalizationProvider>
//     </StyledDateInputField>
//   );
// };
