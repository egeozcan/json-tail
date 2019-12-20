import styled from "styled-components";

export enum ExpandChild {
  First,
  Last
}

export interface IRowContainerProps {
  expandedChild?: ExpandChild;
}

// language=LESS
export const RowContainer = styled.div<IRowContainerProps>`
  & {
    display: flex;
    margin-bottom: 10px;
  }

  & > * {
    flex: 0;
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
      flex: ${props => (props.expandedChild === ExpandChild.Last ? 1 : 0)};
    }

    &:first-child {
      flex: ${props => (props.expandedChild === ExpandChild.First ? 1 : 0)};
    }
  }
`;
