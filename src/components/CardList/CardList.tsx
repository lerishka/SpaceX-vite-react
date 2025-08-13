import Card from "../Card/Card";
import { useEffect, useReducer } from "react";
import { BASE_API } from "../../constants/api";
import type { Launch, Action } from "../../types/types";
import {
  FETCH_SUCCESS,
  FETCH_ERROR,
  SELECT_LAUNCH,
  CLEAR_SELECTION,
} from "../../types/types";
import Modal from "../Modal/Modal";
import LaunchDetails from "../LaunchDetails/LaunchDetails";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import styles from "./CardList.module.scss";

type State = {
  launches: Launch[];
  selectedLaunch: Launch | null;
  loading: boolean;
  error: string | null;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        launches: action.payload,
        error: null,
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
        loading: false,
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
        const response = await fetch(BASE_API);

        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
    <>
      {state.loading && <LoadingMessage />}
      {state.error && <ErrorMessage error={state.error} />}
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
      </div>
    </>
  );
};

export default CardList;
