import { combineReducers } from 'redux'
import modalReducer from './modalReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer,
  auth: authReducer
})

export default rootReducer
