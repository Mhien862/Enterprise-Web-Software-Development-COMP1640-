import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Select, Table, Card, Col, Row, Space, notification, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios.service';

import { Link, useNavigate } from 'react-router-dom';
import { Option } from 'rc-select';
import Search from 'antd/es/input/Search';

const Owner = () => {
  const columns = [
    {
      title: '#',

      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
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
          <Link to={`/detailowner/${param2.id}`}>
            <EyeOutlined />
          </Link>

          <EditOutlined
            style={{
              paddingLeft: 12,
              paddingRight: 12,
            }}
          />
          <DeleteOutlined onClick={deleteOwner} />
        </div>
      ),
    },
  ];
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    name: '',
    email: '',
    status: '',
  });

  const [owners, setOwners] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('name');
  const [value, setValue] = useState('');

  const fetchOwners = async () => {
    const response = await axiosInstance.get('/users', {
      params: query,
    });
    setOwners(response.data.data.items);
    setPagination(response.data.data.pagination);
  };

  const onTableChange = (values) => {
    setQuery({ ...query, page: values.current });
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const onInputChange = (event) => {
    const value = event.target.value;

    setValue(value);
  };

  const onSearch = () => {
    if (type === 'name') {
      setQuery({ ...query, name: value });
    } else {
      setQuery({ ...query, email: value });
    }
  };

  useEffect(() => {
    // call API
    fetchOwners();
  }, [query]);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/createowner');
  };

  let idNew = null;
  const data = owners;
  if (data && data.length > 0) {
    idNew = data[0].id;
  }

  const token = localStorage.getItem('accessToken') ?? '';

  const apiURL = `services/${idNew}`;
  const deleteOwner = () => {
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

    onTableChange();
  };
  return (
    <div>
      <div className="profile">
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <Row>
            <Col span={3}>
              <h2>List User</h2>
            </Col>
            <Col span={18}></Col>
            <Col span={3}>
              <Button onClick={handleAdd}>Create Account</Button>
            </Col>
          </Row>
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
                  <Option value="Email">Email</Option>
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
            <Col span={13}></Col>
          </Row>
        </div>

        <Table
          rowKey="id"
          dataSource={owners}
          columns={columns}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
          }}
          onChange={onTableChange}
        />
      </div>
    </div>
  );
};

export default Owner;
