import { combineReducers } from 'redux';
import regImputsVal from './regImputsValues';
import { routerReducer } from 'react-router-redux';
import ProfileInfo  from './profileReducers/prof'

export default combineReducers({
    routing: routerReducer,
    regImputsVal,
    ProfileInfo
})