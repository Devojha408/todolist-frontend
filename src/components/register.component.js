import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";

const Signup = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(firstName, lastName, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          console.log("Sign up successfully", response);
          navigate("/todos");
          window.location.reload();
          alert("Login Success!");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div className="form-group">
          <label>First Name</label>
          <Input type="text" name="fname" id="fname" placeholder="Enter First Name" onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <Input type="text" name="lname" id="lname" placeholder="Enter Last Name" onChange={(e) => setLname(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <Input type="email" name="email" id="exampleEmail" placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input type="password" name="password" id="examplePassword" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="text-center">
        <button className="btn btn-warning btn-block" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;