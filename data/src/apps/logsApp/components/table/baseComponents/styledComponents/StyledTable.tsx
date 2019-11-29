import styled from "styled-components";

export const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid #a7a7a7;
  border-collapse: collapse;
  border-left-width: 0;

  & .jsonTable {
    border-bottom-width: 0;
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

  & th {
    padding-bottom: 0;
    background: #ececec;
  }

  & td {
    padding-bottom: 0;
    background: #fff;
  }

  & td.odd {
    background: #fbfde5;
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
