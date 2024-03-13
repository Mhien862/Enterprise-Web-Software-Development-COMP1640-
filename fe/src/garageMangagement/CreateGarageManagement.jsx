import { Button, Col, Row, Breadcrumb, Space, TimePicker, Form, Input, Checkbox } from 'antd';
import '../assets/styles/creategarage.css';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGarage, fetchGarageById } from '../store/reducers/management';
import axiosInstance from '../services/axios.service';

const CreateGarageManagement = ({ value }) => {
  const navigate = useNavigate();

  const clickCancel = () => {
    navigate('/managementall');
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [form] = Form.useForm();

  const format = 'HH:mm';

  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);

    return (
      <Space>
        <Button type="primary" htmlType="button" onClick={handleSubmit}>
          Save
        </Button>
      </Space>
    );
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setFormSubmitted(true);
    form
      .validateFields()
      .then((values) => {
        // console.log('Form values:', values.closeTime.toString());
        values.closeTime = values.closeTime.toString();
        values.openTime = values.openTime.toString();
        // console.log('Form values:', values);
        dispatch(createGarage(values));
      })
      .catch((error) => {
        console.log('Form validation error:', error);
      });
  };

  const [dataService, setDataService] = useState();

  const fetchService = async () => {
    const result = await axiosInstance.get('/services');

    dispatch(fetchGarageById(result));
    setDataService(result.data.data.items);
  };

  console.log(dataService, '11');

  // call API
  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div className="garage-create-management">
      <Breadcrumb
        style={{
          fontSize: 22,
        }}
        separator=">"
        items={[
          {
            title: 'All garages',
          },
          {
            title: 'Add a new garage',
          },
        ]}
      />
      <div className="garage-create">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            openTime: '',
            closeTime: '',
            description: '',
            policy: '',
            serviceIds: [''],
          }}
        >
          <Row className="row-management">
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="name" label="Name">
                  <Input placeholder="Enter your name" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="email" label="Email">
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="phoneNumber" label="Phone Number">
                  <Input placeholder="Enter your phone" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="row-management">
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="address" label="Address">
                  <Input placeholder="Enter your address" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Form.Item name="openTime" label="Open Time">
                  <TimePicker
                    className="time-management"
                    allowClear
                    defaultValue={dayjs('9:00', format)}
                    format={format}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <Form.Item name="closeTime" label="Close Time">
                  <TimePicker
                    className="time-management"
                    allowClear
                    defaultValue={dayjs('23:00', format)}
                    format={format}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="row-management">
            <Col span={8}>
              <div
                style={{
                  width: '90%',
                }}
              >
                <Form.Item name="serviceIds" label="Services">
                  <Input placeholder="Enter your services " />
                  <Checkbox.Group>
                    <div>
                      <Checkbox>service</Checkbox>
                    </div>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="row-management">
            <Col span={12}>
              <div className="des-management">
                <Form.Item name="description" label="Description">
                  <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="Description" />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className="des-management">
                <Form.Item name="policy" label="Policy">
                  <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="Policy" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
        <Row className="row-management">
          <Col>
            <SubmitButton form={form} />
          </Col>
          <Col>
            <Button
              style={{
                marginLeft: 20,
              }}
              onClick={clickCancel}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateGarageManagement;
