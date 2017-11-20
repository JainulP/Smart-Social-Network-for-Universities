import {LOAD_FILES} from '../actions/files';
import{INITIALIZE_STATE} from '../actions/files';

const initialState = { 
    files:[],
};


const directory = (state = initialState, action) => { 
    switch (action.type) {

        case INITIALIZE_STATE :
        state = {
            files: [],
        };
        console.log(state);
        return state;

        case LOAD_FILES :
        state = {
            files: action.obj.result,
        };
        console.log(state);
        return state;


        default :
            return state;

    }
};
    
export default directory;