import Card from "../Card/Card";
import styles from "./CardList.module.scss";
import { useEffect, useReducer } from "react";
import type { Launch } from "../../types/types";
import Modal from "../Modal/Modal";
import LaunchDetails from "../LaunchDetails/LaunchDetails";

const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const SELECT_LAUNCH = "SELECT_LAUNCH";
const CLEAR_SELECTION = "CLEAR_SELECTION";

type State = {
  launches: Launch[];
  selectedLaunch: Launch | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: typeof FETCH_SUCCESS; payload: Launch[] }
  | { type: typeof SELECT_LAUNCH; payload: Launch }
  | { type: typeof CLEAR_SELECTION }
  | { type: typeof FETCH_ERROR; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        launches: action.payload,
      };

    case SELECT_LAUNCH:
      return {
        ...state,
        selectedLaunch: action.payload,
      };

    case CLEAR_SELECTION:
      return {
        ...state,
        selectedLaunch: null,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

const CardList = () => {
  const initialState: State = {
    launches: [],
    selectedLaunch: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch(
          "https://api.spacexdata.com/v3/launches?launch_year=2020"
        );
        const resJson = await response.json();
        console.log(resJson);
        dispatch({
          type: FETCH_SUCCESS,
          payload: resJson,
        });
      } catch (err) {
        dispatch({
          type: FETCH_ERROR,
          payload: err instanceof Error ? err.message : "Unknown error",
        });
      }
    };
    fetchFunc();
  }, []);

  const handleSelect = (launch: Launch) => {
    dispatch({
      type: SELECT_LAUNCH,
      payload: launch,
    });
  };

  const handleCloseSelect = () => {
    dispatch({
      type: CLEAR_SELECTION,
    });
  };

  return (
    <div className={styles.listWrapper}>
      {state.launches.map((launch) => {
        return (
          <Card
            key={launch.mission_name}
            missionPatch={launch.links?.mission_patch_small}
            missionName={launch.mission_name}
            rocketName={launch.rocket?.rocket_name}
            onClick={() => handleSelect(launch)}
          />
        );
      })}
      {state.selectedLaunch && (
        <Modal onClose={handleCloseSelect}>
          <LaunchDetails
            onClose={handleCloseSelect}
            selectedLaunch={state.selectedLaunch}
          />
        </Modal>
      )}
      ;
    </div>
  );
};

export default CardList;
