import { Button, Col, Row } from "antd";
import "./../assets/styles/profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const changePassword = () => {
    navigate("/changepassword");
  };
  return (
    <div>
      <h1 className="headingProfile">My Profile</h1>
      <div className="profile">
        <div className="profile-one">
          <Row>
            <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Name</span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Email</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Phone Number</span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>DOB</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Gender</span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Role</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="buttonProfile">
          <Row
            gutter={16}
            style={{
              paddingLeft: 16,
            }}
          >
            <Col>
              <Button onClick={changePassword}>Change Password</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;
