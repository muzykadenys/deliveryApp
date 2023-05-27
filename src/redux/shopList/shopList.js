import { FETCH_SHOPLIST_ERROR, FETCH_SHOPLIST_SUCCESS } from '../reducerConst'

const initialState = {
  loading: true,
  data: [],
  error: '',
}

const shopListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
      }
    case FETCH_SHOPLIST_ERROR:
      return {
        ...state,
        loading: true,
        data: [],
        error: action.error,
      }
    default:
      return state
  }
}

export default shopListReducer
