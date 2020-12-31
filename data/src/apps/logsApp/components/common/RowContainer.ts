import styled from "styled-components";

export interface IRowContainerProps {
  vertical?: boolean;
  expandChild?: number;
}

// language=LESS
export const RowContainer = styled.div<IRowContainerProps>`
  & {
    display: flex;
    margin-bottom: 10px;
    flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  }

  & > * {
    margin-right: ${(props) => (props.vertical ? "0" : "5px")};
    margin-bottom: ${(props) => (props.vertical ? "5px" : "0")};

    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }

    &:nth-child(${(props) => props.expandChild ?? 0}) {
      flex: 1;
    }
  }
`;
