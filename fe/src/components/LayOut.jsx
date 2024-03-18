import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GroupOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../assets/styles/headerlayout.css";

const { Header, Sider } = Layout;

const LayOut = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // tới trang profile
  const toProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    // localStorage.removeItem('accessToken') ?? '';
    // window.location.href = '/login';
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: 740,
        width: "100%",
      }}
    >
      <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div
          style={{
            color: "black",
            backgroundColor: "white",
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 28,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <p>Menu</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <IdcardOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/">User</Link>,
            },
            {
              key: "3",
              icon: <GroupOutlined />,
              label: <Link to="/user">About us </Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="dropdown">
            <img
              src="src/assets/witch-155291_640.webp"
              alt=""
              className="img"
            />
            <p className="nameAdmin">Admin</p>
            <div className="dropAdmin">
              <ul>
                <li onClick={toProfile}>Profile</li>
                <li onClick={handleLogout} className="logout-profile">
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default LayOut;
