export const LOAD_MESSAGES = 'LOAD_MESSAGES';

export function LoadMessages(obj) {
    console.log("Announcement Loading");
    return {
        type : "LOAD_MESSAGES",
        obj                               // this is same as newItem : newItem in ES6
    }
}