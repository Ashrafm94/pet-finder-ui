
import {combineReducers} from 'redux';
import petsReducer from './pets';

const allReducers = combineReducers({
    petsReducer
});

export default allReducers;