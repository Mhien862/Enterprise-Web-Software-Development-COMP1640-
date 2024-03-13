import { Breadcrumb, Button, Col, Form, Row } from 'antd';
import '../assets/styles/managementdetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchGarageById } from '../store/reducers/management';

const GarageManagementDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const garageById = useSelector((state) => state.management?.garageById);

  useEffect(() => {
    dispatch(fetchGarageById(params.id));
  }, []);

  //---------------------------
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);
  };

  const clickEditManagement = () => {
    navigate('/managementedit');
  };

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
            title: `${garageById?.name}`,
          },
        ]}
      />
      <div className="garage-create ">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            name: '',
            email: '',
            password: '',
            phone: '',
            gender: 'Gender',
            dob: '',
            role: 'Role',
            garage: '',
          }}
        >
          <Row className="row-manadetail">
            <Col span={8}>
              <Form.Item name="name" label="Name">
                <div>{garageById?.name}</div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <div>{garageById?.email}</div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="Phone Number">
                <div>{garageById?.phoneNumber}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row className="row-manadetail">
            <Col span={8}>
              <Form.Item name="address" label="Address">
                <div>{garageById?.address}</div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="open time" label="Open Time">
                <div>{garageById?.openTime}</div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="close Time" label="Close Time">
                <div>{garageById?.closeTime}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row className="row-manadetail">
            <Col span={8}>
              <Form.Item name="status" label="Status">
                <div>{garageById?.status}</div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <SubmitButton />
        <Row className="row-manadetail">
          <Col>
            <Button
              style={{
                marginRight: 20,
              }}
              onClick={clickEditManagement}
            >
              Edit
            </Button>
          </Col>
          <Col>
            <Button>Delete</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GarageManagementDetail;
