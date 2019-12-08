import styled from "styled-components";

export const StyledSubTableContainer = styled.div`
  border-left: 1px solid #a7a7a7;

  &:hover {
    border-left-color: #615f5f;

    > tr,
    > td {
      background: yellow;
    }
  }
`;
