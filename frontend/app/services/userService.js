import axios from "axios";

const API = "http://127.0.0.1:8000/api";

const getToken = () => {
    return localStorage.getItem("token");
};

export const getUsers = () => {
    return axios.get(`${API}/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const createUser = (data) => {
    return axios.post(`${API}/users`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const updateUser = (id, data) => {
    return axios.put(`${API}/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const deleteUserApi = (id) => {
    return axios.delete(`${API}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const logoutUser = () => {
    const token = localStorage.getItem("token");

    return axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
