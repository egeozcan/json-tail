import styled from "styled-components";

export const StyledTable = styled.table`
  border-spacing: 0;
  border: 1px dashed #a7a7a7;
  border-collapse: collapse;
  border-left-width: 0;
  flex: 1;

  & .jsonTable {
    border-bottom-width: 0;
    width: 100%;
  }

  &,
  .jsonTable tbody,
  .jsonTable tr,
  .jsonTable th,
  .jsonTable td {
    margin: 0;
    padding: 0;
    vertical-align: text-top;
  }

  th,
  td {
    padding-bottom: 3px;
  }

  & tr:last-child > th,
  & tr:last-child > td {
    border-bottom: none;
  }

  & .jsonTable > tbody > tr > th:first-child,
  & .jsonTable > tbody > tr > td:first-child {
    padding-left: 15px;
  }
`;
