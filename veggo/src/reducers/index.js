import vegetablesReducer from './vegetables';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    vegetables: vegetablesReducer
})

export default allReducers;