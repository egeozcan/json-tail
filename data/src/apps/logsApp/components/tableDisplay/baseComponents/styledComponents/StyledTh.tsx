import styled from "styled-components";

export const StyledTh = styled.th`
  border-bottom: 1px dashed #a7a7a7;
  text-align: left;
  padding: 3px;
  font-weight: bold;
  padding-bottom: 0;
  background: #ececec;

  &.simpleRow {
    white-space: nowrap;
    padding-right: 15px !important;
  }
`;
