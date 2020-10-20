import { combineReducers } from 'redux'
import modalReducer from './modalReducer'
import authReducer from './authReducer'
import courseReducer from './courseReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer,
  auth: authReducer,
  course: courseReducer
})

export default rootReducer
