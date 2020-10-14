import { combineReducers } from 'redux'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer
})

export default rootReducer
