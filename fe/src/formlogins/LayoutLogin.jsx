import { Card } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios.service";

const LayoutLogin = () => {
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // call API
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get("/profile", {});
        navigate("/");
        setIsHide(false);
      } catch (error) {
        const response = await axiosInstance.post("/logout", {});
        setIsHide(false);
        console.log(error);
      }
    };

    fetchService();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isHide ?
        null :
        <Card>
          <Outlet />
        </Card>
      }
    </div>
  );
};

export default LayoutLogin;
