import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledLoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #8a2ea5;
  font-size: 20px;
`;

export const LoadingIndicator = () => {
  return (
    <StyledLoadingIndicator>
      <CircularProgress style={{ color: "#8a2ea5" }} />
    </StyledLoadingIndicator>
  );
};
