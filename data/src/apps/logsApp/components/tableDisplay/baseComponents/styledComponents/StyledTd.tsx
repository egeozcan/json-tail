import styled from "styled-components";

export const StyledTd = styled.td`
  border-bottom: 1px dashed #a7a7a7;
  text-align: left;
  padding: 3px;
  font-weight: normal;
  padding-bottom: 0;
  background: #fff;

  &.odd {
    background: #fbfde5;
  }

  &.simpleRow {
    width: 100%;
    padding-left: 10px !important;
  }
`;
