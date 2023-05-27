import { GET_COUPONS_ERROR, GET_COUPONS_SUCCESS } from '../reducerConst'

const initialState = {
  loading: true,
  data: [],
  error: '',
}

const couponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
      }
    case GET_COUPONS_ERROR:
      return {
        ...state,
        loading: true,
        data: [],
        error: action.error,
      }
    default:
      return { ...state }
  }
}

export default couponsReducer
