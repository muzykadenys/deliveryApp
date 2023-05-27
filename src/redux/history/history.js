import { SET_HISTORY_ERROR, SET_HISTORY_SUCCESS } from '../reducerConst'

const initialState = {
  loading: true,
  data: [],
  error: '',
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
      }
    case SET_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
      }
    default:
      return { ...state }
  }
}

export default historyReducer
