import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select, Space, Table, notification } from "antd";
import axiosInstance from "../services/axios.service";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

const Event = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    name: "",
  });

  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get("/event", {
        params: query,
      });
      setEvents(response.data.events);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const onTableChange = (values) => {
    setQuery({ ...query, page: values.current }); // Cập nhật trang trong query
  };

  useEffect(() => {
    fetchEvents();
  }, [query]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/event/${id}`);
      notification.open({
        message: "Delete Success",
        icon: <CheckCircleOutlined style={{ color: "#00ff66" }} />,
      });
      // Sau khi xóa thành công, gọi lại fetchEvents để cập nhật danh sách sự kiện
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      notification.open({
        message: "Delete Failed",
        icon: <WarningOutlined style={{ color: "#e91010" }} />,
      });
    }
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "First Closure Date",
      dataIndex: "firstClosureDate",
      key: "firstClosureDate",
    },
    {
      title: "Final Closure Date",
      dataIndex: "finalClosureDate",
      key: "finalClosureDate",
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      key: "academicYear",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      render: (data) => (
        <div style={{ textTransform: "lowercase" }}>{data}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Link to={`/event/detail/${record._id}`}>
            <EyeOutlined />
          </Link>
          <Button
            type="link"
            onClick={() => navigate(`/user/edit/${record._id}`)}
          >
            <EditOutlined style={{ paddingLeft: 12, paddingRight: 12 }} />
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="profile" style={{ marginTop: 30, padding: "0 40px" }}>
      <div>
        <Row gutter={24} justify="space-between" align="middle">
          <Col span={6}>
            <h2>List Event</h2>
          </Col>
          <Col span={12}>
            <Space>
              <Select
                defaultValue="Name"
                onChange={(value) => setQuery({ ...query, name: value })}
              >
                <Select.Option value="Name">User Name</Select.Option>
                <Select.Option value="Email">Email</Select.Option>
              </Select>
              <Search
                placeholder="Search"
                onChange={(e) =>
                  setQuery({ ...query, keyword: e.target.value })
                }
                style={{ width: 200 }}
              />
            </Space>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={() => navigate("/createuser")}>
              Create Event
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        dataSource={events}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
        rowKey="_id"
      />
    </div>
  );
};

export default Event;
