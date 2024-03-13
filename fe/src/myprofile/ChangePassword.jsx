import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/changepassword.css';
import { useState } from 'react';
import axiosInstance from '../services/axios.service';

const ChangePassword = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const clickCancel = () => {
    navigate('/profile');
  };

  const token = localStorage.getItem('accessToken');

  const apiUrl = 'auth/change-password';
  const savePassword = () => {
    const requestPassword = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    axiosInstance
      .put(apiUrl, requestPassword, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeInputNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeInputConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <h1 className="headingProfile">Change Password</h1>
      <div className="profilePassword">
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          Now you can crate a new password for account
        </h3>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['password', 'current']}
            label="Current Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onChange={onChangeInputPassword} />
          </Form.Item>
          <Form.Item
            name={['password', 'new']}
            label="New Password"
            rules={[
              {
                type: 'password',
              },
            ]}
          >
            <Input onChange={onChangeInputNewPassword} />
          </Form.Item>
          <Form.Item
            name={['password', 'confirm']}
            label="Confirm Password"
            rules={[
              {
                type: 'password',
              },
            ]}
          >
            <Input onChange={onChangeInputConfirmPassword} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button
              style={{
                marginRight: 20,
              }}
              type="primary"
              htmlType="submit"
              onClick={savePassword}
            >
              Save
            </Button>
            <Button onClick={clickCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
