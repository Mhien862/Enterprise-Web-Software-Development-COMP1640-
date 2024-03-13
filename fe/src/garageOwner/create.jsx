import { Button, Col, Form, Input, Row, Select, Space, notification, Alert, DatePicker, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../services/axios.service';
import { useNavigate } from 'react-router-dom';
import { createNewOwner } from '../store/reducers/owner';

const { Option } = Select;
const Create = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: 0,
    gender: 'Gender',
    dob: '',
    role: 'Role',
    garage: [],
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    form
      .validateFields()
      .then(() => {
        setIsFormValid(true);
        setShowAlert(false);
      })
      .catch(() => {
        setIsFormValid(false);
        setShowAlert(true);
      });
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id !== '') return JSON.stringify(garages.filter((garage) => garage.id === id));
    setIsSubmited(true);
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          dob: values.dob,
          role: values.role,
          gerageIds: garages.filter((garage) => garage.id === id),
        };

        dispatch(createNewOwner(formattedValues))
          .unwrap()
          .then((result) => {
            setShowAlert(false);
            setIsSubmited(false);

            setTimeout(() => {
              notification.success({
                message: 'Successfull',
                description: 'The service has been created successfully !',
                placement: 'topLeft',
              });
            }, 500);
          })
          .catch((error) => {
            console.error('Lỗi khi tạo dịch vụ', error);
            setShowAlert(true);
          });
      })
      .catch((error) => {
        setShowAlert(true);
        console.error('Lỗi khi xác thực biểu mẫu', error);
      });
  };

  const navigate = useNavigate();

  // const allGarages = ['Garage 1', 'Garage 2', 'Garage 3', 'Garage 4', 'Garage 5'];

  const clickCancel = () => {
    navigate('/owner');
  };

  // useEffect(() => {
  //   dispatch(AddfetchOwners(values));
  // }, [values]);

  const [garages, setGarages] = useState([]);
  const [id, setId] = useState('');
  const getManagement = async () => {
    const response = await axiosInstance.get('garages');
    setGarages(response.data.data.items);
  };

  // call API
  useEffect(() => {
    getManagement();
  }, []);

  const handleChange = (value) => {
    setId(value);
  };

  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <Breadcrumb
        style={{
          marginLeft: 40,
          fontSize: 22,
        }}
        separator=">"
        items={[
          {
            title: 'All Owner',
          },
          {
            title: 'Add a new owner',
          },
        ]}
      />
      <div
        className="profile"
        style={{
          marginTop: 32,
        }}
      >
        {showAlert && isSubmited && (
          <Alert
            message="Error"
            description="Please fill form."
            type="error"
            showIcon
            closable
            onClose={() => setShowAlert(false)}
          />
        )}
        <div>
          <div>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item name="fullName" label="Name" rules={[{ required: true }]}>
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                  >
                    <Select placeholder="select your gender">
                      <Option value="MALE">MALE</Option>
                      <Option value="FEMALE"> FEMALE</Option>
                      <Option value="OTHER"> OTHER</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item name="dob" label="DOB" rules={[{ required: true }]}>
                    <DatePicker
                      style={{
                        width: '80%',
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select Role!' }]}>
                    <Select placeholder="select your gender">
                      <Option value="ADMIN">ADMIN</Option>
                      <Option value="USER">USER</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Space>
                  <Form.Item
                    name="gerageIds"
                    label="gerageIds"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                  >
                    <Select value={id} placeholder="Please select" onChange={handleChange}>
                      {garages.map((garage) => (
                        <option key={garage.id} value={garage.id}>
                          {/* {id !== '' ? JSON.stringify(garages.filter((garage) => garage.id === id)) : null} */}
                          {/* {id !== '' ? garage.name : null} */}
                          {garage.name}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Row>
            </Form>

            <Space>
              <Button type="primary" htmlType="button" onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={clickCancel}>Cancel</Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
