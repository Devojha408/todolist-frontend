import axios from "axios";
const API_URL = "http://localhost:9090/";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.Token) {
          console.log("Login successfully", response);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("todo");
    window.reload();
  }
  register(firstName, lastName, email, password) {
    return axios.post(API_URL + "auth/signup", {
      firstName,
      lastName,
      email,
      password
    }).then(response => {
      if (response.data.Token) {
        console.log("Login successfully", response);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();