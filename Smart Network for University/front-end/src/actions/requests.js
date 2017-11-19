export const LOAD_MYREQUESTS = 'LOAD_MYREQUESTS';

export function LoadMyRequests(obj) {
    console.log("MyRequests Loadind");
    return {
        type : "LOAD_MYREQUESTS",
        obj                               // this is same as newItem : newItem in ES6
    }
}
