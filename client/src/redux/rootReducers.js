import {combineReducers} from 'redux'
import modalReducer from './modal/modalReducer'

const rootReducers = combineReducers({
    modal : modalReducer
})

export default rootReducers