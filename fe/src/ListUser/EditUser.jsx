/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchServices } from "../store/reducers/service";
import axiosInstance from "../services/axios.service";

const EditService = () => {
  let location = useLocation();
  const parts = location.pathname.split("/user-list");
  const [data1 ,setData] = useState([]);
  const id = parts[parts.length - 1];
  const [form] = Form.useForm();
  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);

    return (
      <Space>
        <Button type="primary" block htmlType="button" onClick={handleSubmit}>
          Edit
        </Button>
        <Button type="primary" block htmlType="button" onClick={handleSubmit}>
          Cancel
        </Button>
      </Space>
    );
  };
  const fetchService = async () => {
    const response = await axiosInstance.get(`/user/${id}`);
    console.log(response);
  };
  useEffect(() => {
    fetchService();
  }, [id]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };
  const validateNumber = (rule, value, callback) => {
    if (value === "") {
      callback();
    } else if (isNaN(value)) {
      callback("Please enter a valid number");
    } else {
      callback();
    }
  };

  const dispatch = useDispatch();
  const { manageService } = useSelector((state) => state.service);
  const data = manageService?.items.map((value) => {
    return value;
  });
  console.log(333, data);
  const [params, setParams] = useState({
    page: 1,
    limit: 2,
  });
  useEffect(() => {
    dispatch(fetchServices(params));
  }, []);
  console.log(manageService);
  return (
    <>
      <div>
        <div>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
          >
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  name="name"
                  label="User Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter your name" defaultValue={data} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter the email" },
                  ]}
                >
                  <Input placeholder="Enter email" defaultValue="" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: "Please enter the role" }]}
                >
                  <Input placeholder="Enter role" defaultValue="" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  name="faculty"
                  label="Faculty"
                  rules={[{ required: true, message: "Please enter the role" }]}
                >
                  <Input placeholder="Enter faculty" defaultValue="" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <SubmitButton form={form} />
        </div>
      </div>
    </>
  );
};

export default EditService;
