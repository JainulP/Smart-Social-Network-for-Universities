export const LOAD_MYREQUESTS = 'LOAD_MYREQUESTS';
export const LOAD_ASSIGNED = 'LOAD_ASSIGNED';

export function LoadMyRequests(obj) {
    console.log("MyRequests Loadind");
    return {
        type : "LOAD_MYREQUESTS",
        obj                               // this is same as newItem : newItem in ES6
    }
}


export function LoadAssignedRequests(obj) {
    console.log("Assigned Requests Loadind");
    return {
        type : "LOAD_ASSIGNED",
        obj                               // this is same as newItem : newItem in ES6
    }
}