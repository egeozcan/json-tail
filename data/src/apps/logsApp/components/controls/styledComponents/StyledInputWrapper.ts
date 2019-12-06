import styled from "styled-components";

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;

  & > * {
    flex: 1;
    margin: 0 4px 4px 0;
    box-sizing: border-box;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 20px;
    padding: 5px;
    height: 30px;
  }

  input[type="button"],
  input[type="submit"] {
    width: 160px;
    max-width: 150px;
  }
`;
