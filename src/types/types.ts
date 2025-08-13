export type Launch = {
  mission_name: string;
  rocket?: {
    rocket_name?: string;
  };
  links?: {
    mission_patch?: string;
    mission_patch_small?: string;
  };
  details?: string;
};

export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";
export const SELECT_LAUNCH = "SELECT_LAUNCH";
export const CLEAR_SELECTION = "CLEAR_SELECTION";

export type Action =
  | { type: typeof FETCH_SUCCESS; payload: Launch[] }
  | { type: typeof SELECT_LAUNCH; payload: Launch }
  | { type: typeof CLEAR_SELECTION }
  | { type: typeof FETCH_ERROR; payload: string };
