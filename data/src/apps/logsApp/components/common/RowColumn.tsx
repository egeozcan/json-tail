import styled from "styled-components";

export interface IRowColumnProps {
  selectable?: boolean;
  cursor?: CursorType;
  background?: BackgroundType;
}

export enum CursorType {
  Normal,
  Pointer
}

export enum BackgroundType {
  Dark,
  Light
}

// language=LESS
export const RowColumn = styled.div<IRowColumnProps>`
  & {
    user-select: ${props => (props.selectable ? "none" : "unset")};
    cursor: ${props =>
      props.cursor === CursorType.Pointer ? "pointer" : null};
    background: ${props =>
      props.background === BackgroundType.Dark ? "#eee" : "#fff"};
    padding: 5px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
