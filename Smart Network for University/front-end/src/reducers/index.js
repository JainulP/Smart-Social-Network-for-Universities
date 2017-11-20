import {combineReducers} from 'redux';
import MyRequestsReducer from './reducer-myrequests';
import FilesReducer from './reducer-directory';
import SharedReducer from './reducer-shared';
import DepartmentsReducer from './reducer-departments';
import AssignedReqReducer from './reducer-reqassigned';

const allReducers = combineReducers({
    //insert reducer name here to combine
    departments: DepartmentsReducer,
    directory: FilesReducer,
    shared: SharedReducer,
    myrequests: MyRequestsReducer,
    assignedrequests: AssignedReqReducer
});

export default allReducers;