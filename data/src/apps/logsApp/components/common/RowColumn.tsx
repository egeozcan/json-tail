import styled from "styled-components";

export interface IRowColumnProps {
  selectable: boolean;
  cursor: CursorType;
}

export enum CursorType {
  Normal,
  Pointer
}

// language=LESS
export const RowColumn = styled.div<IRowColumnProps>`
  & {
    user-select: ${props => (props.selectable ? "unset" : "none")};
    cursor: ${props =>
      props.cursor === CursorType.Pointer ? "pointer" : null};
    background: #eee;
    padding: 5px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
