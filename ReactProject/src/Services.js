import { baseURL } from './utils';

export const getData = (url) => new Promise((res, rej) => {
    fetch(`${baseURL}${url}`).then(res => res.json())
        .then((response) => {
            res(response);
        }).catch((error) => {
            rej(error);
        })
})

export const postData = (url, paramObj) => new Promise((res, rej) => {
    fetch(`${baseURL}${url}`, {
        method: 'post',
        body: JSON.stringify(paramObj),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(function (response) {
        res(response);
    }).catch((error) => {
        rej(error);
    })
})

export const deleteData = (url) => new Promise((res, rej) => {
    fetch(`${baseURL}${url}`, {
        method: 'delete'
    }).then(res => res.json()).then(function (response) {
        res(response);
    }).catch((error) => {
        rej(error);
    })
})