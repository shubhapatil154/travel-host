import styled from "styled-components";

export const StyledPlannerForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .closeButton {
    color: rgb(42, 42, 109);
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    right: 40px;
    top: 20px;
    font-family: cursive;
  }

  .mainHeader {
    font-size: 40px;
    color: rgb(42, 42, 109);
    margin: 20px;
    font-weight: 700;
  }

  .submitButton {
    margin: 20px;
    background-color: #554749;
    color: white;
    width: 200px;
    height: 50px;
    border-radius: 50px;
  }

  .mealsIncluded {
    width: 40vw;
    display: flex;
    align-items: center;
    color: #1c1c1c;
    justify-content: space-between;
    .mealsIncludedLabel {
      margin-right: 40px;
    }
  }
`;
