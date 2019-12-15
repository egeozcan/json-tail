import { IChangeLevelAction } from "../interfaces/IAppAction";
import { AppActionTypes } from "../enums/AppActionTypes";

export const changeLevel = (level: number): IChangeLevelAction => {
  return {
    type: AppActionTypes.ChangeMaxLevel,
    data: {
      level
    }
  };
};
