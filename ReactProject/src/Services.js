import {baseURL} from './utils';

export const getData = (url) => new Promise((res, rej) => {
    fetch(`${baseURL}${url}`).then(res => res.json())
    .then((response) => {
        res(response);
    }).catch((error) => {
        rej(error);
    })
})