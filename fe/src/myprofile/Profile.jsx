import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../store/reducers/profile';
import '../assets/styles/profile.css';

const Profile = () => {
  const navigate = useNavigate();

  // truyền dữ liệu qua trang update profile và hiện dữ liệu vào các ô input
  const updateProfile = () => {
    navigate('/updateprofile');
  };

  // tới trang change password
  const changePass = () => {
    navigate('/changepassword');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const { profile } = useSelector((state) => state.profile);

  if (!profile) return;

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
                      <p>{profile.fullName}</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Email</span>
                      <p className="api-return">{profile.email}</p>
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
                      <p className="api-return">{profile.phoneNumber}</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>DOB</span>
                      <p className="api-return">{profile.dob}</p>
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
                      <p className="api-return">{profile.gender}</p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Role</span>
                      <p className="api-return">{profile.role}</p>
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
              <Button onClick={updateProfile}>Update Profile</Button>
            </Col>
            <Col>
              <Button onClick={changePass}>Change Password</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;
