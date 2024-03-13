import { Card, Col, Row, Button, Space, Breadcrumb } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOwnersById } from '../store/reducers/owner';
// import { fetchOwners, fetchOwnersById } from '../store/reducers/owner';

const GarageDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // const [garageName, setGarageName] = useState([]);

  const ownerByIdData = useSelector((state) => state.owner?.ownerByIdData);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchOwnersById(params.id));
  }, []);

  const handleEdit = () => {
    navigate(`/editowner/${params.id}`);
  };

  console.log(66, ownerByIdData);

  // const garageName = ownerByIdData.garages;
  // console.log(ownerByIdData.fullName);
  // // setGarageName(ownerByIdData.garages);
  // // console.log(garageName);
  // // garageName === [] ? garageName : null;
  // console.log(77, garageName);


  const handleDelete = () => {
    navigate('/owner');
  };

  return (

    <div className="profile">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card title="Infomation" bordered={false}>
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="detail-label">Name:</div>
                <div className="detail-value">{ownerByIdData?.fullName}</div>
              </Col>
              <Col span={12}>
                <div className="detail-label">Email:</div>
                <div className="detail-value">{ownerByIdData?.email}</div>
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="detail-label">Dob:</div>
                <div className="detail-value">{ownerByIdData?.dob}</div>
              </Col>
              <Col span={12}>
                <div className="detail-label">Phone Number:</div>
                <div className="detail-value">{ownerByIdData?.phoneNumber}</div>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="detail-label">Gender:</div>
                <div className="detail-value">{ownerByIdData?.gender}</div>
              </Col>
              <Col span={12}>
                <div className="detail-label">Role:</div>
                <div className="detail-value">{ownerByIdData?.role}</div>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={12}>
                <div className="detail-label">Status:</div>
                <div className="detail-value">{ownerByIdData?.status}</div>
              </Col>
              <Col span={12}>
                <div className="detail-label">Garages:</div>
                {/* <div className="detail-value">{ownerByIdData.garages.length > 0 ? 1 : null}</div> */}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Space style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>

        <Button type="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Space>

    </div>
  );
};

export default GarageDetails;
