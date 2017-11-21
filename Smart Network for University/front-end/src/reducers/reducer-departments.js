import {LOAD_USER_DEPARTMENTS} from '../actions/files';

const initialState = {
    departments:[],
};


const departments = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_USER_DEPARTMENTS :
            state = {
                departments: action.obj.departments,
            };
            console.log(state);
            return state;


        default :
            return state;

    }
};

export default departments;