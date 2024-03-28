/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnersById, updateOwner } from "../store/reducers/owner";
import moment from "moment";

const EditUser = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const { Option } = Select;

  const params = useParams();
  const dispatch = useDispatch();
  const { userByIdData } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(fetchOwnersById(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (userByIdData) {
      form.setFieldsValue({
        fullName: userByIdData.fullName,
        email: userByIdData.email,
        phoneNumber: userByIdData.phoneNumber,
        gender: userByIdData.gender,
        dob: moment(userByIdData.dob),
        role: userByIdData.role,
        status: userByIdData.status,
      });
    }
  }, [userByIdData, form]);

  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);
    console.log(userByIdData);
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
        const formattedValues = {
          ...values,
          dob: values.dob.format("YYYY-MM-DD"),
        };
        dispatch(updateOwner({ id: params.id, data: formattedValues }))
          .unwrap()
          .then((result) => {
            notification.success({
              message: "Success",
              description: "Owner updated successfully!",
            });
            setTimeout(() => {
              window.location.href = "/owner";
            }, 3000);
          })
          .catch((error) => {
            console.error("Error while updating owner:", error);
          });
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  return (
    <>
      <div>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={[16, 34]}>
            <Col className="gutter-row" span={5}>
              <Form.Item
                name="fullName"
                label="Name"
                rules={[{ required: true }]}
              >
                <Input
                  style={{
                    width: "80%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input
                  style={{
                    width: "80%",
                  }}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 34]}>
            <Col className="gutter-row" span={5}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input
                  style={{
                    width: "80%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select
                  className="select-content"
                  defaultValue="Gender"
                  style={{
                    width: "80%",
                  }}
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
                    width: "80%",
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
                    width: "80%",
                  }}
                >
                  <Option value="User">User</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select
                  className="select-content"
                  defaultValue="Status"
                  style={{
                    width: "80%",
                  }}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <SubmitButton form={form} />
        <Link to={"/owner"}>
          <Button>Cancel</Button>
        </Link>
      </div>
    </>
  );
};

export default EditUser;
