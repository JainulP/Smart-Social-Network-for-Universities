import {combineReducers} from 'redux';
import MyRequestsReducer from './reducer-myrequests';
import FilesReducer from './reducer-directory';
import SharedReducer from './reducer-shared';
import DepartmentsReducer from './reducer-departments';

const allReducers = combineReducers({
    //insert reducer name here to combine
    departments: DepartmentsReducer,
    directory: FilesReducer,
    shared: SharedReducer,
    myrequests: MyRequestsReducer
});

export default allReducers;