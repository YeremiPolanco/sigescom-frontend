import axios from "axios";

const LOGIN_BASE_REST_API_URL = "http://localhost:8080/auth/login";

class LoginService {
    static login(username, password) {
        const requestBody = { username, password };

        return axios.post(LOGIN_BASE_REST_API_URL, requestBody)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }
}

export default LoginService;
