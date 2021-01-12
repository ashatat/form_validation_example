import { useState, useEffect } from "react";
import firebase from "firebase";

import signupSchema from "./schema";

import "./style.css";

const initErrors = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  bio: "",
};

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState(initErrors);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = async (data) => {
    try {
      await signupSchema.validate(data, { abortEarly: false });

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

  useEffect(() => {
    const data = { username, email, password, confirmPassword, bio };
    if (submitted) {
      validateForm(data);
    }
  }, [username, email, password, confirmPassword, bio, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = { username, email, password, confirmPassword, bio };
    await validateForm(data);
    try {
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      data.user.updateProfile({ displayName: username });
      console.log(data.user.providerData[0]);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // console.log({ errorCode, errorMessage });
    }
  };

  const settersObj = {
    username: setUsername,
    email: setEmail,
    password: setPassword,
    confirmPassword: setConfirmPassword,
    bio: setBio,
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    settersObj[name](value);
  };

  return (
    <form autoComplete="none" onSubmit={handleSubmit}>
      <h1 className="title">Register form</h1>
      <label
        htmlFor="username"
        className={`label ${errors.username && "error"}`}
      >
        Username
        <input
          type="text"
          name="username"
          id="username"
          className={`field ${errors.username && "error"}`}
          onChange={handleChange}
          value={username}
          placeholder="Enter your username"
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </label>
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
      <label
        htmlFor="confirmPassword"
        className={`label ${errors.confirmPassword && "error"}`}
      >
        Confirm password
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className={`field ${errors.confirmPassword && "error"}`}
          placeholder="Re-Enter your password"
          value={confirmPassword}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </label>
      <label
        htmlFor="bio"
        className={`label textarea ${errors.bio && "error"}`}
      >
        Bio
        <textarea
          onChange={handleChange}
          type="text"
          name="bio"
          id="bio"
          rows="8"
          className={`field textarea ${errors.bio && "error"}`}
          placeholder="Enter your bio"
          value={bio}
        />
        {errors.bio && <div className="error">{errors.bio}</div>}
      </label>
      <button type="submit">Register now</button>
    </form>
  );
}

export default Signup;
