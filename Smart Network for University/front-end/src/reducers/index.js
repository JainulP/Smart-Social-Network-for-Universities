import {combineReducers} from 'redux';
import MyRequestsReducer from './reducer-myrequests';
import FilesReducer from './reducer-directory';
import SharedReducer from './reducer-shared';
import DepartmentsReducer from './reducer-departments';
import AssignedReqReducer from './reducer-reqassigned';
import userdetailReducer from './reducer-user';
import memberReducer from './reducer-depmembers';
import announcementReducer from './reducer-announcement';
import messageReducer from './reducer-messages';

const allReducers = combineReducers({
    //insert reducer name here to combine
    departments: DepartmentsReducer,
    directory: FilesReducer,
    shared: SharedReducer,
    myrequests: MyRequestsReducer,
    assignedrequests: AssignedReqReducer,
    userdetail: userdetailReducer,
    members: memberReducer,
    announcements: announcementReducer,
    messages: messageReducer,
});

export default allReducers;