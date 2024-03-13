import { Button, Col, Row, Select, Space, Table, notification } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchGarageById } from '../store/reducers/management';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axios.service';

const GarageManagementAll = () => {
  //--------------------------------------
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name Courses',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Trainer ',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        <div
          style={{
            textTransform: 'lowercase',
          }}
        >
          {value}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, param2) => (
        <div>
          <Link to={`/managementdetail/${param2.id}`}>
            <EyeOutlined />
          </Link>
          <EditOutlined
            style={{
              paddingLeft: 12,
              paddingRight: 12,
            }}
            onClick={() => toEditManagement()}
          />
          <DeleteOutlined onClick={deleteManagement} />
        </div>
      ),
    },
  ];

  //  chuyển trang
  const toAddGarage = () => {
    navigate('/managementcreate');
  };

  const toEditManagement = () => {
    navigate('/managementedit');
  };

  //------------------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [garages, setGarages] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('name');
  const [value, setValue] = useState('');

  //---------------------------
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    name: '',
    email: '',
    status: '',
  });

  //-------------------------

  const fetchGarage = async () => {
    const result = await axiosInstance.get('/garages', {
      params: query,
    });

    dispatch(fetchGarageById(result));
    setGarages(result.data.data.items);
    setPagination(result.data.data.pagination);
  };

  // call API
  useEffect(() => {
    fetchGarage();
  }, [query]);

  // tìm kiếm
  const onSearch = () => {
    if (type === 'Name') {
      setQuery({ ...query, name: value });
    } else {
      setQuery({ ...query, email: value });
    }
  };

  const onInputChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const onTableChange = (values) => {
    setQuery({ ...query, page: values.current });
  };

  let idNew = null;
  const data = garages;
  if (data && data.length > 0) {
    idNew = data[0].id;
  }
  //xoa
  const token = localStorage.getItem('accessToken') ?? '';

  const apiURL = `garages/${idNew}`;

  const deleteManagement = () => {
    axiosInstance
      .delete(apiURL, {
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
        notification.open({
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className="profile">
      <div>
        <Row gutter={24}>
          <Col className="gutter-row" span={3}>
            <h2>All Courses </h2>
          </Col>
          <Col className="gutter-row" span={18}></Col>
          <Col className="gutter-row" span={3}>
            <Button onClick={toAddGarage}>Add Courses</Button>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={8}>
            <Space.Compact
              style={{
                position: 'relative',
              }}
              block
            >
              <Select defaultValue={type} allowClear onChange={handleTypeChange}>
                <Option value="Name">Name</Option>
                <Option value="email">Code</Option>
              </Select>
              <Search
                onChange={onInputChange}
                value={value}
                allowClear
                onSearch={onSearch}
                style={{
                  width: '100%',
                }}
              />
            </Space.Compact>
          </Col>
          <Col span={10}></Col>
        </Row>
      </div>

      {/* ------------------------------------------- */}
      <div>
        <Table
          rowKey="id"
          dataSource={garages}
          columns={columns}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
          }}
          onChange={onTableChange}
        />
      </div>
      {/* --------------------------------------------*/}
    </div>
  );
};

export default GarageManagementAll;
