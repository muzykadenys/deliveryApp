import {
  ADD_ITEM_TO_BUSCKET,
  CHANGE_iTEM_AMOUNT,
  CLEAR_ITEMS_FROM_BUSKET,
  REMOVE_ITEM_FROM_BASKET,
  SET_FROM_LOC_STORAGE_TO_BUSCKET,
  SET_SHOPINDEX_SELECTED,
  SET_SHOPNAME_SELECTED,
  SET_USER_ORDER_ADDRESS,
  SET_USER_ORDER_DATA,
  SET_USER_ORDER_EMAIL,
  SET_USER_ORDER_NAME,
  SET_USER_ORDER_PHONE,
} from '../reducerConst'

const saveBasketInLocalStorage = (data) => {
  localStorage.setItem('basket', JSON.stringify(data))
}

const initialState = {
  user: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  basket: [],
  busketShopName: '',
  shopName: '',
  shopIndex: null,
}

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ORDER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      }
    case SET_USER_ORDER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      }
    case SET_USER_ORDER_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action.payload,
        },
      }
    case SET_USER_ORDER_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload,
        },
      }
    case SET_USER_ORDER_DATA:
      return {
        ...state,
        user: action.payload,
      }
    case SET_FROM_LOC_STORAGE_TO_BUSCKET:
      return {
        ...state,
        basket: action.payload.basket,
        busketShopName: action.payload.busketShopName,
        shopIndex: action.payload.shopIndex,
        shopName: action.payload.shopName,
      }
    case ADD_ITEM_TO_BUSCKET:
      const addArr = [...state.basket, action.payload]
      saveBasketInLocalStorage({
        basket: addArr,
        busketShopName: state.shopName,
        shopIndex: state.shopIndex,
        shopName: state.shopName,
      })

      return {
        ...state,
        basket: addArr,
        busketShopName: state.shopName,
      }
    case REMOVE_ITEM_FROM_BASKET:
      const newArr = state.basket.filter((el) => el.id !== action.payload)
      saveBasketInLocalStorage({
        basket: newArr,
        busketShopName: '',
        shopIndex: state.shopIndex,
        shopName: state.shopName,
      })
      return {
        ...state,
        basket: newArr,
        busketShopName: '',
      }
    case CHANGE_iTEM_AMOUNT:
      const newAmmountArr = state.basket.map((el) => {
        if (el.id === action.payload.id)
          return { ...el, amount: action.payload.amount }
        return el
      })
      saveBasketInLocalStorage({
        basket: newAmmountArr,
        busketShopName: state.busketShopName,
        shopIndex: state.shopIndex,
        shopName: state.shopName,
      })

      return {
        ...state,
        basket: newAmmountArr,
      }
    case CLEAR_ITEMS_FROM_BUSKET:
      return {
        ...state,
        basket: [],
        busketShopName: '',
      }
    case SET_SHOPNAME_SELECTED:
      return {
        ...state,
        shopName: action.payload,
      }
    case SET_SHOPINDEX_SELECTED:
      return {
        ...state,
        shopIndex: action.payload,
      }
    default:
      return state
  }
}

export default selectedReducer
