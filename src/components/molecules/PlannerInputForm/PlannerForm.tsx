import React, { useState } from "react";
import { InputField } from "../../atoms/InputField/InputField";
// import { DateInputField } from "../../atoms/DateInputField/DateInputField";
import { StyledPlannerForm } from "./PlannerForm.styles";
import { Dropdown } from "../../atoms/Dropdown/Dropdown";
import { CustomCheckbox } from "../../atoms/Checkbox/Checkbox";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

export const PlannerForm = ({ onClose }) => {
  const navigate = useNavigate();
  // create sample data for dropdown options in the format {value: "", label: ""}
  const options = [
    { value: "No Preference" },
    { value: "Vegetarian" },
    { value: "Vegan" },
    { value: "Non Vegetarian" },
  ];

  const cityOptions = [
    { value: "bangalore" },
    { value: "delhi" },
    { value: "gurgaon" },
    { value: "hyderabad" },
  ];

  const [formData, setFormData] = useState({
    destination: "",
    tripDuration: 1,
    numberOfPeople: 1,
    budget: 1500,
    eatingPreference: "",
    mealsIncluded: {
      breakfast: false,
      lunch: false,
      dinner: false,
    },
  });

  // Event handler to update the form data object
  const handleFormChange = (fieldName, value) => {
    if (
      fieldName === "breakfast" ||
      fieldName === "lunch" ||
      fieldName === "dinner"
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        mealsIncluded: {
          ...prevFormData.mealsIncluded,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value,
      }));
    }
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleFormChange(name, checked);
  };

  // Function to handle form submission and create the prompt
  const handleSubmit = () => {
    // Extract the meal preferences from formData and join them into a single string
    const {
      destination,
      tripDuration,
      numberOfPeople,
      budget,
      eatingPreference,
      mealsIncluded,
    } = formData;
    const mealPreferences = Object.entries(formData.mealsIncluded)
      .filter((entry) => entry[1])
      .map((entry) => entry[0])
      .join(", ");
    const responseObj = {
      destination,
      tripDuration,
      numberOfPeople,
      budget: budget || 1500,
      eatingPreference,
      mealsIncluded: mealPreferences,
    };
    if (destination) {
      localStorage.setItem("userPreferences", JSON.stringify(responseObj));
      navigate(`/travel/${destination}`, {
        state: { ...responseObj, isNewTrip: true },
      });
    }
  };

  return (
    <>
      <StyledPlannerForm role="form">
        <div className="modal-header">
          <div className="closeButton" onClick={onClose}>
            x
          </div>
          <div className="mainHeader">Customize Your Itinerary</div>
        </div>
        <Dropdown
          options={cityOptions}
          dropdownLabel="Where do you want to go?"
          onChange={(value) => handleFormChange("destination", value)}
        />
        <InputField
          inputLabel="How many days will your trip be?"
          type="number"
          onChange={(value) =>
            handleFormChange("tripDuration", parseInt(value) || 1)
          }
        />
        <InputField
          inputLabel="How many people are going?"
          type="number"
          onChange={(value) =>
            handleFormChange("numberOfPeople", parseInt(value) || 1)
          }
        />
        <InputField
          inputLabel="What is your budget?"
          type="number"
          onChange={(value) => handleFormChange("budget", parseInt(value) || 0)}
        />
        <Dropdown
          options={options}
          dropdownLabel="Any eating preferences?"
          onChange={(value) => handleFormChange("eatingPreference", value)}
        />
        <div className="mealsIncluded">
          <span className="mealsIncludedLabel">
            Which meals you want us to include?
          </span>

          <CustomCheckbox
            label="Breakfast"
            name="breakfast"
            checked={formData.mealsIncluded.breakfast}
            onChange={handleCheckboxChange}
          />
          <CustomCheckbox
            label="Lunch"
            name="lunch"
            checked={formData.mealsIncluded.lunch}
            onChange={handleCheckboxChange}
          />
          <CustomCheckbox
            label="Dinner"
            name="dinner"
            checked={formData.mealsIncluded.dinner}
            onChange={handleCheckboxChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="submitButton"
        >
          Submit
        </Button>
      </StyledPlannerForm>
    </>
  );
};
