import {LOAD_USER} from '../actions/user';
import {SAVE_USER} from '../actions/user';

const initialState = {
        userid: 11,
        firstname: '',
        lastname: '',
        emailid: '',
        password: '',
        departmentid: '',
        type: '',
        deleteflag: '',
};


const user = (state = initialState, action) => { 
    switch (action.type) {
        case LOAD_USER :
                state = {
                    userid: action.obj.userid,
                    firstname: action.obj.firstname,
                    lastname: action.obj.lastname,
                    emailid: action.obj.emailid,
                    password: action.obj.password,
                    departmentid: action.obj.departmentid,
                    type: action.obj.type,
                    deleteflag: action.obj.deleteflag,
            };
            console.log(state);
            return state;

            case SAVE_USER :
                state = {
                    userid: state.userid,
                    firstname: action.obj.firstname,
                    lastname: action.obj.lastname,
                    emailid: action.obj.emailid,
                    password: state.password,
                    departmentid: action.obj.departmentid,
                    type: action.obj.type,
                    deleteflag: action.obj.deleteflag,
            };
            console.log(state);
            return state;
            
        default :
        return state;  
    }
};
    
export default user;