/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { Breadcrumb, Button, Card, Col, Row, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchServicesById } from '../store/reducers/service';
import { useDispatch, useSelector } from 'react-redux';

const DetailService = () => {
  const dispatch = useDispatch();
  const serviceByIdData = useSelector((state) => state.service?.serviceByIdData);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchServicesById(params.id));
  }, []);

  const handleEdit = () => {
    navigate(`/editowner/${params.id}`);
  };

  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <Breadcrumb
        style={{
          fontSize: 22,
          marginLeft: 40,
        }}
        separator=">"
        items={[
          {
            title: 'All garages',
          },
          {
            title: `${serviceByIdData?.name}`,
          },
        ]}
      />
      <div className="profile">
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Card title="Infomation" bordered={false}>
              <Row gutter={[16, 24]}>
                <Col span={12}>
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{serviceByIdData?.name}</div>
                </Col>
                <Col span={12}>
                  <div className="detail-label">Description:</div>
                  <div className="detail-value">{serviceByIdData?.description}</div>
                </Col>
              </Row>
              <Row gutter={[16, 24]}>
                <Col span={12}>
                  <div className="detail-label">Max price:</div>
                  <div className="detail-value">{serviceByIdData?.maxPrice}</div>
                </Col>
                <Col span={12}>
                  <div className="detail-label">Min price:</div>
                  <div className="detail-value">{serviceByIdData?.minPrice}</div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Space style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleEdit}>
            Edit
          </Button>

          <Button type="danger">Delete</Button>
        </Space>
      </div>
    </div>
  );
};

export default DetailService;
