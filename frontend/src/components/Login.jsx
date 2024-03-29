import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.scss";
import useAuth from "../hooks/useAuth";

// Svgs
import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

// Components
import Button from "./Button";
import Input from "./Input";
import axios from "../api/axios";
import { errorToast } from "../utility/toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    // Preventing refreshing
    e.preventDefault();

    if (!login) {
      setLoginError(`Login cannot be empty!`);
    }
    if (!password) {
      setPasswordError(`Password cannot be empty!`);
    }
    try {
      const response = await axios.post(
        "/users/login",
        JSON.stringify({ email: login, password }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { role, token } = response.data;
      let to = "";
      if (role === "admin") {
        to = "/admin/users";
      } else if (role === "lecturer") {
        to = "/lecturer";
      } else if (role === "student") {
        to = "/student/articles";
      }

      setAuth({ role, token });
      navigate(to, { replace: true });
    } catch (error) {
      if (!error?.response) {
        errorToast("No server response");
      } else if (error.response?.status === 400) {
        errorToast("Wrong email or password");
      } else {
        errorToast("Login failed");
      }
    }
  };

  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className="auth-blob login" />
      <div className="auth-container">
        <div className="auth-inputs">
          <h2>Sign in </h2>
          <form className="auth-form" onSubmit={onSubmit}>
            <Input
              label="Login"
              labelBg={"#1c1c2c"}
              error={loginError}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              value={login}
            />
            <Input
              type="password"
              label="Password"
              labelBg={"#1c1c2c"}
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Button text="Login in" />
            {/* //TODO: Remove on production */}
            <Button
              text={"Admin"}
              onClick={() => {
                setLogin("admin@admin.com");
                setPassword("admin");
              }}
            />
            <Button
              text={"Lecturer"}
              onClick={() => {
                setLogin("lecturer@lecturer.com");
                setPassword("lecturer");
              }}
            />
            <Button
              text={"Student"}
              onClick={() => {
                setLogin("student@student.com");
                setPassword("student");
              }}
            />
          </form>
        </div>
        <div className="auth-remind">
          <div className="remind-text">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, molestiae.
            </p>
            <Link to="/remind">
              <Button text="Remind password" bgColor={"#1164aa"} />
            </Link>
          </div>
          <img src={LoginPeople} alt="People" />
        </div>
      </div>
    </section>
  );
};

export default Login;
