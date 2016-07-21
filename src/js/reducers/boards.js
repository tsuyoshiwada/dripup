import { handleActions } from "redux-actions";
import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  DETAIL_BOARD_REQUEST,
  DETAIL_BOARD_SUCCESS,
  DETAIL_BOARD_FAILURE
} from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  entities: [],
  board: null
};

export default handleActions({
  // Fetch
  [FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [FETCH_BOARDS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload
  }),

  [FETCH_BOARDS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Add
  [ADD_BOARD_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [ADD_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isAdding: false,
    entities: [...state.entities, action.payload]
  }),

  [ADD_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),

  // Update
  [UPDATE_BOARD_REQUEST]: state => ({
    ...state,
    isUpdating: true
  }),

  [UPDATE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isUpdating: false,
    entities: state.entities.map(board =>
      board.id === action.payload.id ? action.payload : board
    )
  }),

  [UPDATE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isUpdating: false,
    error: action.payload
  }),

  // Delete
  [DELETE_BOARD_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [DELETE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isDeleting: false,
    entities: state.entities.filter(board =>
      board.id !== action.payload
    )
  }),

  [DELETE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isDeleting: false,
    error: action.payload
  }),

  // Detail
  [DETAIL_BOARD_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [DETAIL_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    board: action.payload
  }),

  [DETAIL_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  })
}, initialState);
