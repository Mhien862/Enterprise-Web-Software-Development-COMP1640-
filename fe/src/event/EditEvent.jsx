import {
  CheckCircleOutlined
} from "@ant-design/icons";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventAPI, updateEvent } from "../services/EventService";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import axiosInstance from "../services/axios.service";

function formatDate(date) {
  // Lấy thông tin ngày, tháng và năm từ đối tượng Date
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Lưu ý: Tháng trong JavaScript đếm từ 0
  var day = ('0' + date.getDate()).slice(-2);

  // Tạo chuỗi định dạng "YYYY-MM-DD"
  var formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}

const EditEvent = () => {
  let location = useLocation();
  const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
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
    try {
      const res = await updateEvent( 
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

  const fetchService = async (id) => {
    const response = await axiosInstance.get(`/eventDetail?eventId=${id}`);
    setData({
      eventname: response.data.eventName,
      fristClosureDate: formatDate(response.data.firstClosureDate),
      finalClosureDate: formatDate(response.data.finalClosureDate),
      academicYear: response.data.academicYear,
      faculty: response.data.faculty,
    })
  };
  useEffect(() => {
    fetchService(id)
  }, [location])
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Edit Event</h1>
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

export default EditEvent;
