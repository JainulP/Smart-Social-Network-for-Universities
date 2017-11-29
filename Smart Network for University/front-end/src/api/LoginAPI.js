//const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://ec2-54-241-187-181.us-west-1.compute.amazonaws.com:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });