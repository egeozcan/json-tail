import styled from "styled-components";

export const StyledTr = styled.tr`
  border-left: 2px solid #a7a7a7;

  &:hover {
    border-left-color: #615f5f;

    > tr,
    > td {
      background: yellow;
    }
  }
`;
