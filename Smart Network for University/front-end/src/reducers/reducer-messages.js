import {LOAD_MESSAGES} from '../actions/loadMessages';

const initialState = { 
    messages:[]
};


const messages = (state = initialState, action) => { 
    switch (action.type) {

        case LOAD_MESSAGES :
            state = {
                messages: action.obj.result
            };
            console.log(state);
            return state;

        default :
            return state;

    }
};
    
export default messages;