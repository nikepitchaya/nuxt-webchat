let basePath = 'http://localhost:8080'

import axios from "axios"
export default ({ }, inject) => {
    inject('api', {
        // User 
        getMe: (params) => {
            console.log(params)
            return axios.get(`${basePath}/me`, {
                params: params
            })
        },
        guestCreateUser: (params) => {
            return axios.post(`${basePath}/create/user`, {
                params: params
            })
        },
        guestLogin: (params) => {
            return axios.post(`${basePath}/login/user`, {
                params: params
            })
        },
        guestForgetPasswod: (params) => {
            return axios.post(`${basePath}/forget`, {
                params: params
            })
        },
        // Room
        userCreateRoom: (params) => {
            return axios.post(`${basePath}/create/room`, {
                params: params
            })
        },
        userUpdateRoom: (params) => {
            return axios.post(`${basePath}/update/room`, {
                params: params
            })
        },
        userDeleteRoom: (id) => {
            return axios.delete(`${basePath}/delete/room/${id}`)
        },
        userGetMyRoom: (id, params) => {
            // console.log(params)
            return axios.get(`${basePath}/me/room/${id}`, {
                params: params
            })
        },
        userGetOneRoom: (id) => {
            return axios.get(`${basePath}/one/room/${id}`)
        },
        userGetAllRoom: (params) => {
            return axios.get(`${basePath}/all/room`, {
                params: params
            })
        },
    })
}
