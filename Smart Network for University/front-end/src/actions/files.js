export const LOAD_FILES = 'LOAD_FILES';
export const INITIALIZE_STATE = 'INITIALIZE_STATE';
export const LOAD_SHARED = 'LOAD_SHARED';
export const INITIALIZE_SHARED = 'INITIALIZE_SHARED';
export const UPDATE_SHARED = 'UPDATE_SHARED';
export const LOAD_USER_DEPARTMENTS = 'LOAD_USER_DEPARTMENTS';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_USERONLY_DEPARTMENTS = 'LOAD_USERONLY_DEPARTMENTS';


export function InitializeState(obj) {
    console.log("User Loaded");
    return {
        type : "INITIALIZE_STATE",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function LoadFiles(obj) {
    console.log("Files loaded");
    return {
        type : "LOAD_FILES",
        obj                                // this is same as newItem : newItem in ES6
    }
}

export function LoadShared(obj) {
    console.log("Shared files Loaded");
    return {
        type : "LOAD_SHARED",
        obj                                // this is same as newItem : newItem in ES6
    }
}

export function InitializeShared(obj) {
    console.log("Shared files Initialized");
    return {
        type : "INITIALIZE_SHARED",
        obj                                // this is same as newItem : newItem in ES6
    }
}

export function UpdateShared(obj) {
    console.log("file being shared updated");
    return {
        type : "UPDATE_SHARED",
        obj                                // this is same as newItem : newItem in ES6
    }
}


export function LoadUserDepartments(obj) {
    console.log("departments Loaded");
    return {
        type : "LOAD_USER_DEPARTMENTS",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function LoadUserOnlyDepartments(obj) {
    console.log("departments Loaded");
    return {
        type : "LOAD_USERONLY_DEPARTMENTS",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function LoadDepartments(obj) {
    console.log("departments Loaded");
    return {
        type : "LOAD_DEPARTMENTS",
        obj                               // this is same as newItem : newItem in ES6
    }
}