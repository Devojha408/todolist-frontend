import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {
  Input
} from "reactstrap";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        (response) => {
          console.log("Log in successfully", response);
            navigate("/todos");
            window.location.reload();
            alert("Login Success!");
        },
        (error) => {
          alert("Invalid Email or password!");
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className="form-group">
          <label>User Name</label>
          <Input type="email" name="email" id="exampleEmail" placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input type="password" name="password" id="examplePassword" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="text-center">
          <button className="btn btn-warning btn-block" type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;