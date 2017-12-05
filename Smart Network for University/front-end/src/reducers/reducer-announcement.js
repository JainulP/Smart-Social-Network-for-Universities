import {LOAD_ANNOUNCEMENT} from '../actions/announcement';

const initialState = { 
    announcements:[]
};


const announcements = (state = initialState, action) => { 
    switch (action.type) {

        case LOAD_ANNOUNCEMENT :
            state = {
                announcements: action.obj.result
            };
            console.log(state);
            return state;

        default :
            return state;

    }
};
    
export default announcements;