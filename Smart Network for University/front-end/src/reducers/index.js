import {combineReducers} from 'redux';
import MyRequestsReducer from './reducer-myrequests';

const allReducers = combineReducers({
    //insert reducer name here to combine
    myrequests: MyRequestsReducer
});

export default allReducers;