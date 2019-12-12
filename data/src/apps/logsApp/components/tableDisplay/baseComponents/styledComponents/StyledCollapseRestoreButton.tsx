import styled from "styled-components";

// language=LESS
export const StyledCollapseRestoreButton = styled.span`
  & {
    float: left;
    display: block;
    background: #fff;
    border: 1px solid #535252;
    color: #535252;
    padding: 3px;
    font-size: 11px;
    margin-right: 3px;
    cursor: pointer;
    user-select: none;
  }

  & + * {
    width: calc(100% - 22px) !important;
  }
`;
