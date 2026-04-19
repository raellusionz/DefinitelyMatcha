import axiosClient from "../api/axiosClient";

const authService = {
    loginUser: async (login, password) => {
        const response = await axiosClient.post('/auth/login', {
            login: login,
            password: password
        });
        return response;
    }
};

export default authService;