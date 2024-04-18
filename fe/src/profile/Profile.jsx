import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios.service";
import { useEffect, useState } from "react";

const Profile = () => {
  const [data, setProfile] = useState({
    username: "",
    roleName: "",
    faculty: "",
    email: "",
    password: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const changePassword = () => {
    navigate("/change_password");
  };

  return (
    <div>
      <h1 className="headingProfile">My Profile</h1>
      <div className="profile">
        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-grid">
              <span style={{ color: "blue" }}>Name:</span>
              <span>{data.username}</span>
            </div>
            <div className="profile-grid">
              <span style={{ color: "green" }}>Email:</span>
              <span>{data.email}</span>
            </div>
            <div className="profile-grid">
              <span style={{ color: "red" }}>Faculty:</span>
              <span>{data.faculty}</span>
            </div>
            <div className="profile-grid">
              <span style={{ color: "purple" }}>Role:</span>
              <span>{data.role}</span>
            </div>
          </div>
          <div className="profile-buttons">
            <Button type="primary" onClick={changePassword}>
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
