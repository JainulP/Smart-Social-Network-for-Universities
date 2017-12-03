export const LOAD_ANNOUNCEMENT = 'LOAD_ANNOUNCEMENT';

export function LoadAnnouncement(obj) {
    console.log("Announcement Loading");
    return {
        type : "LOAD_ANNOUNCEMENT",
        obj                               // this is same as newItem : newItem in ES6
    }
}