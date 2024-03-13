import { Button, Col, Row, Breadcrumb, TimePicker, Form, Input } from 'antd';
import '../assets/styles/creategarage.css';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

const EditManagement = () => {
  const navigate = useNavigate();

  const clickCancel = () => {
    navigate('/managementall');
  };

  const options = [];
  for (let i = 0; i < 24; i++) {
    options.push({
      label: i.toString(24) + i,
      value: i.toString(24) + i,
    });
  }

  const format = 'HH:mm';

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
            title: 'Gara 1',
          },
        ]}
      />
      <div className="garage-create">
        <Form name="validateOnly" layout="vertical" autoComplete="off">
          <Row className="row-management">
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input placeholder="Enter your name" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                  <Input placeholder="Enter your phone" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="row-management">
            <Col span={8}>
              <div className="input-createManagement">
                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                  <Input placeholder="Enter your address" />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <span className="name-span">Open time</span>
                <br />
                <TimePicker className="time-management" defaultValue={dayjs('12:08', format)} format={format} />
              </div>
            </Col>
            <Col span={8}>
              <div>
                <span className="name-span">Close time</span>
                <br />
                <TimePicker className="time-management" defaultValue={dayjs('12:08', format)} format={format} />
              </div>
            </Col>
          </Row>
          <Row className="row-management">
            <Col span={12}>
              <div className="des-management">
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                  <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="Description" />
                </Form.Item>
              </div>
            </Col>
            <Col span={12}>
              <div className="des-management">
                <Form.Item name="policy" label="Policy" rules={[{ required: true }]}>
                  <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="Policy" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
        <Row className="row-management">
          <Col>
            <Button
              style={{
                marginRight: 20,
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button onClick={clickCancel}>Cancel</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditManagement;
