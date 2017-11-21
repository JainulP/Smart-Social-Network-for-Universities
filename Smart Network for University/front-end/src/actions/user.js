export const LOAD_USER = 'LOAD_USER';
export const SAVE_USER = 'SAVE_USER';
export const LOAD_MEMBERS = 'LOAD_MEMBERS';

export function LoadUser(obj) {
    console.log("User Loaded");
    return {
        type : "LOAD_USER",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function SaveUserInfo(obj) {
    console.log("UserInfo saved");
    return {
        type : "SAVE_USER",
        obj                                // this is same as newItem : newItem in ES6
    }
}

export function LoadMembers(obj) {
    console.log("Members Loaded");
    return {
        type : "LOAD_MEMBERS",
        obj                               // this is same as newItem : newItem in ES6
    }
}