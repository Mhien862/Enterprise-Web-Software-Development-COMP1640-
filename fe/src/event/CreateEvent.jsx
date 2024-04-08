import {
  CheckCircleOutlined
} from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventAPI } from "../services/EventService";
import styles from "./styles.module.css";

const CreateEvent = () => {
  const [data, setData] = useState({
    eventname: "",
    fristClosureDate: "",
    finalClosureDate: "",
    academicYear: "",
    faculty: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...data,
    }
    console.log("newData", newData);
    try {
      const res = await eventAPI(
        newData
      );
      navigate("/event");
      notification.open({
        message: "Create Success",
        icon: (
          <CheckCircleOutlined
            style={{
              color: "#00ff66",
            }}
          />
        ),
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
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Event</h1>
            <input
              type="text"
              placeholder="EventName"
              name="eventname"
              onChange={handleChange}
              value={data.eventname}
              required
              className={styles.input}
            />
            <input
              type="date"
              placeholder="FinalClosureDate"
              name="finalClosureDate"
              onChange={handleChange}
              value={data.finalClosureDate}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="faculty"
              name="faculty"
              onChange={handleChange}
              value={data.faculty}
              required
              className={styles.input}
            />
            <input
              type="date"
              placeholder="FristClosureDate"
              name="fristClosureDate"
              onChange={handleChange}
              value={data.fristClosureDate}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="AcademicYear"
              name="academicYear"
              onChange={handleChange}
              value={data.academicYear}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
