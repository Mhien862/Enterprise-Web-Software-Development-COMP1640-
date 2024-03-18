import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { notification } from "antd";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    roleName: "",
    facultyName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1000/register";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      notification.open({
        message: "Create Success",
      });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Role"
              name="roleName"
              onChange={handleChange}
              value={data.roleName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Faculty"
              name="facultyName"
              onChange={handleChange}
              value={data.facultyNameName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
