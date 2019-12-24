import styled from "styled-components";

export enum ExpandChild {
  First,
  Last
}

export interface IRowContainerProps {
  expandedChild?: ExpandChild;
  vertical?: boolean;
}

// language=LESS
export const RowContainer = styled.div<IRowContainerProps>`
  & {
    display: flex;
    margin-bottom: 10px;
    flex-direction: ${props => (props.vertical ? "column" : "row")};
  }

  & > * {
    flex: 0;
    margin-right: ${props => (props.vertical ? "0" : "5px")};
    margin-bottom: ${props => (props.vertical ? "5px" : "0")};

    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
      flex: ${props => (props.expandedChild === ExpandChild.Last ? 1 : 0)};
    }

    &:first-child {
      flex: ${props => (props.expandedChild === ExpandChild.First ? 1 : 0)};
    }
  }
`;
