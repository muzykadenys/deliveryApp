import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import shopListReducer from './shopList/shopList'
import settingsReducer from './settings/settings'
import selectedReducer from './selected/selected'
import historyReducer from './history/history'

const rootReducer = combineReducers({
  shopsList: shopListReducer,
  settings: settingsReducer,
  selected: selectedReducer,
  history: historyReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
