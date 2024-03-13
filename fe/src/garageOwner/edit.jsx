import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Card } from 'antd';
import React, { useState } from 'react';

const Edit = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkYTBhNDAzLWRiOWYtNDAyZC1hOGUzLTM1NjZhN2JiMmVjZiIsImVtYWlsIjoibmhvbTJAZ3JyLmxhIiwiZnVsbE5hbWUiOiJOaG9tIDIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTg0NjYzMTQsImV4cCI6MTY5ODUwMjMxNH0.Ikv-2NRILHFKCbrGAiCBK-qpIZFg8QDP-aYX-j9FPp0';
  localStorage.setItem('token', token);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);

    return (
      <Space>
        <Button type="primary" htmlType="button" onClick={handleSubmit}>
          Edit
        </Button>
      </Space>
    );
  };
  const handleSubmit = () => {
    setFormSubmitted(true);
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
      })
      .catch((error) => {
        console.error('Form validation error:', error);
      });
  };
  return (
    <Card>
      <div>
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <Row gutter={[16, 34]}>
            <Col className="gutter-row" span={5}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input
                  style={{
                    width: '80%',
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input
                  style={{
                    width: '80%',
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 34]}>
            <Col className="gutter-row" span={5}>
              <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                <Input
                  style={{
                    width: '80%',
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                  className="select-content"
                  defaultValue="Gender"
                  style={{
                    width: '80%',
                  }}
                  onChange={handleChange}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={5}>
              <Form.Item name="dob" label="DOB" rules={[{ required: true }]}>
                <DatePicker
                  format={dateFormat}
                  style={{
                    width: '80%',
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select
                  className="select-content"
                  defaultValue="Role"
                  style={{
                    width: '80%',
                  }}
                  onChange={handleChange}
                >
                  <Option value="User">User</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select
                  className="select-content"
                  defaultValue="Status"
                  style={{
                    width: '80%',
                  }}
                  onChange={handleChange}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <SubmitButton form={form} />
      </div>
    </Card>
  );
};

export default Edit;
