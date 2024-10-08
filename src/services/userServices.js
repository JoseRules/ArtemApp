import axios from "axios"

const artemAPIURL = 'http://184.73.150.133:8080';

export const registerDoctor = (user) => {
    return axios.post(`${artemAPIURL}/doctors`, user);
}

export const registerPatient = (user) => {
    return axios.post(`${artemAPIURL}/patients`, user);
}

export const loginUser = (user) => {
    return axios.post(`${artemAPIURL}/login`, user);
}

export const getAllDoctors = () => {
    return axios.get(`${artemAPIURL}/doctors`);
}

export const getUserById = (id) => {
    return axios.post(`${artemAPIURL}/getUser`, {userId: id})
}
