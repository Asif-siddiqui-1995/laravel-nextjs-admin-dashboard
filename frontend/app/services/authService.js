import api from "./api";

export const loginUser = async (email, password) => {
    const res = await api.post("/login", {
        email,
        password,
    });

    localStorage.setItem("token", res.data.token);

    return res.data.user;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
