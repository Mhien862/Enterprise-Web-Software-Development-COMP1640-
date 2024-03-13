import { Controller, useForm } from 'react-hook-form';
import { Button, Col, DatePicker, Row, Select, Space } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/updateprofile.css';

// import { useDispatch, useSelector } from 'react-redux';
// import { addProfile, editProfile, getProfile } from '../store/reducers/profile';
// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';

const schema = yup.object().shape({
  userName: yup.string().required('name is valid'),
  email: yup.string().required('email is valid').email('email is invalid'),
  phoneNumber: yup.number().required('phone number is valid'),
});

const UpdateProfile = () => {
  const navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     userName: profile.userName,
  //     phoneNumber: profile.phoneNumber,
  //   },
  // });

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });

  //  hàm save profile: lưu trữ dữ liệu nhập từ ô input và quay lại trang profile và in ra dữ liệu
  const saveProfile = (values) => {
    // if (profile) {
    //   dispatch(editProfile({ ...values, name: profile.userName }));
    // } else {
    //   dispatch(addProfile(values));
    // }
    // reset({
    //   userName: '',
    //   email: '',
    //   phoneNumber: '',
    // });

    console.log(values);
    // navigate('/profile');
  };

  // const dispatch = useDispatch();

  // const { profile } = useSelector((state) => state.profile);

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, []);

  // useEffect(() => {
  //   if (profile) {
  //     reset({
  //       userName: profile.userName,
  //       phoneNumber: profile.phoneNumber,
  //     });
  //   }
  // }, [profile]);

  // date
  const onChange = (date) => {
    console.log(date);
  };

  // ấn cancel quay lại trang profile
  const onCancel = () => {
    navigate('/profile');
  };

  // gender
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <h1 className="headingProfile">My Profile</h1>
      <div className="profile">
        <Row gutter={24}>
          <div>
            <Col className="gutter-row" span={12}>
              <div className="profile-two">
                <form onSubmit={handleSubmit(saveProfile)}>
                  <Row gutter={24}>
                    <Col className="gutter-row" span={12}>
                      <div className="input-updateProfile">
                        <span>Name</span>
                        <Controller
                          name="userName"
                          control={control}
                          render={({ field }) => {
                            return (
                              <div>
                                <input {...field} type="text" placeholder="enter your name" />
                                {errors['userName'] && <p>({errors.userName.message})</p>}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col className="gutter-row" span={12}>
                      <div className="input-updateProfile">
                        <span>Email</span>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => {
                            return (
                              <div>
                                <input {...field} type="email" placeholder="enter your email" />
                                {errors['email'] && <p>({errors.email.message})</p>}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col className="gutter-row" span={12}>
                      <div className="input-date">
                        <span>DOB</span>
                        <Controller
                          name="dob"
                          control={control}
                          render={({ field }) => {
                            return (
                              <div>
                                <Space direction="vertical">
                                  <DatePicker {...field} onChange={onChange} />
                                </Space>
                              </div>
                            );
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col className="gutter-row" span={12}>
                      <div className="input-gender">
                        <span
                          style={{
                            marginRight: 12,
                          }}
                        >
                          Gender
                        </span>
                        <Space wrap>
                          <Select
                            defaultValue="Male"
                            style={{
                              width: 420,
                            }}
                            onChange={handleChange}
                            options={[
                              {
                                value: 'Male',
                                label: 'Male',
                              },
                              {
                                value: 'Female',
                                label: 'Female',
                              },
                            ]}
                          />
                        </Space>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col className="gutter-row" span={12}>
                      <div className="input-updateProfile">
                        <span>Phone Number</span>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          render={({ field }) => {
                            return (
                              <div>
                                <input {...field} type="tel" placeholder="enter your phone" />
                                {errors['phoneNumber'] && <p>({errors.phoneNumber.message})</p>}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="btn-row" gutter={16}>
                    <Col>
                      <button className="btn-update-profile" type="submit">
                        Save
                      </button>
                    </Col>
                    <Col>
                      <Button onClick={onCancel}>Cancel</Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </div>
          <Col className="gutter-row" span={12}></Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdateProfile;
