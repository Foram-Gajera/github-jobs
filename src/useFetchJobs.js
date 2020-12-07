import { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  jobs: [],
  loading: false,
  error: false,
};

//to resolve CORS err : https://cors-anywhere.herokuapp.com
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

//actions
const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR",
  UPDATE_HAS_NEXT_PAGE: "UPDATE_HAS_NEXT_PAGE",
};

//reducer function
const reducerFun = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        jobs: action.payload.jobs,
        loading: false,
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };
    case "HELLO":
      return {};
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source(); //to store the reference of the request
    dispatch({
      type: ACTIONS.MAKE_REQUEST,
    });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { ...params, markdown: true, page: page },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    const cancelToken2 = axios.CancelToken.source(); //to store the reference of the request
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { ...params, markdown: true, page: page + 1 },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    //this return is run whenever (params & page) changes -- it is for cleanup purpose
    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  //   dispatch({
  //     type: "HELLO",
  //     payload: { x: 3 },
  //   });

  return state;
};

export default useFetchJobs;
