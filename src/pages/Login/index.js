import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

import loginSchema from "./schema";
import { AuthContext } from "../../auth";

import "./style.css";

const initErrors = {
  password: "",
  email: "",
};

function Login() {
  const { setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initErrors);

  const history = useHistory();
  console.log({ history });
  const validateForm = async (data) => {
    try {
      await loginSchema.validate(data, { abortEarly: false });

      setErrors(initErrors);
      return data;
    } catch (err) {
      // console.dir(err.inner); // path: message
      const newErrors = err.inner.reduce((acc, curr) => {
        console.log(curr);
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await validateForm(data);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      const pushTo = history.location.state ? history.location.state.from : "/";
      history.push(pushTo);
      // console.log(a.user.providerData[0]);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // console.log({ errorCode, errorMessage });
    }
  };

  const settersObj = {
    email: setEmail,
    password: setPassword,
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    settersObj[name](value);
  };

  return (
    <form autoComplete="none" onSubmit={handleSubmit}>
      <h1 className="title">Login form</h1>
      <label htmlFor="email" className={`label${errors.email && " error"}`}>
        Email
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          className={`field ${errors.email && "error"}`}
          placeholder="Enter your email"
          value={email}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>
      <label
        htmlFor="password"
        className={`label ${errors.password && "error"}`}
      >
        Password
        <input
          onChange={handleChange}
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          className={`field ${errors.password && "error"}`}
          value={password}
          placeholder="Enter your password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </label>

      <button type="submit">Login now</button>
    </form>
  );
}

export default Login;
