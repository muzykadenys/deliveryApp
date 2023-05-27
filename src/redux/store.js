import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import shopListReducer from './shopList/shopList'
import settingsReducer from './settings/settings'
import selectedReducer from './selected/selected'
import historyReducer from './history/history'
import couponsReducer from './coupons/coupons'

const rootReducer = combineReducers({
  shopsList: shopListReducer,
  settings: settingsReducer,
  selected: selectedReducer,
  history: historyReducer,
  coupons: couponsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools())
