import React from "react";
import { styled } from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const StyledCard = styled(Card)`
  width: 80%;
  @media (max-width: 767px) {
    width: 90%;
  }
  margin: 0 auto;
  margin-top: 40px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f2f9 !important;
  overflow: hidden;
`;

const DayCard = styled(Card)`
  width: 50vw;
  margin-top: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #e6ccee !important;
  @media (max-width: 767px) {
    width: 80vw;
  }
`;

const ItineraryTable = ({ tableData }) => {
  const { destination, activities } = tableData?.itinerary || {};
  const activityEntries = activities ? Object.entries(activities) : [];

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {destination}
        </Typography>
        {activityEntries.map(([day, activityList], index) => (
          <DayCard key={day}>
            <Typography variant="h6" gutterBottom>
              {day}
            </Typography>
            {activityList.map((activity, index) => (
              <ListItemText primary={activity} />
            ))}
          </DayCard>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default ItineraryTable;
