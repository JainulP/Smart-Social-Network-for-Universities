const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const receiveMessages = (payload) =>
    fetch(`${api}/messages/receiveMessages`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("This is error");
        return error;
    });

    export const sendMessages = (payload) =>
    fetch(`${api}/messages/sendMessages`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("This is error");
        return error;
    });

    export const getUsersLists = (payload) =>
    fetch(`${api}/user/getUsersList`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log(error);
        return error;
    });

     export const getUser = (payload) =>
    fetch(`${api}/messages/getUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log(error);
        return error;
    });



    export const getMessages = (payload) =>
    fetch(`${api}/messages/getMessages`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log(error);
        return error;
    });

export const writeMessages = (payload) =>
    fetch(`${api}/messages/writeMessages`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
        console.log(error);
        return error;
    });

