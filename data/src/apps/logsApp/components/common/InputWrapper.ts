import styled from "styled-components";

// language=LESS
export const InputWrapper = styled.div`
  &,
  & > form {
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
  }

  & > *,
  & > form > * {
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

  input,
  select,
  span {
    margin-bottom: 20px;
    padding: 5px;
    height: 30px;
  }

  span {
    flex: 0;
    white-space: nowrap;
  }

  input[type="button"],
  input[type="submit"] {
    max-width: 150px;
  }
`;
