import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios.service";
    // import { fetchServicesById } from "../store/reducers/service";
    import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Option } from "rc-select";
    
    const Event = () => {
      const columns = [
        {
          title: "Event Name",
          dataIndex: "eventName",
          key: "eventName",
        },
        {
          title: "Frist Closure Date",
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
            <div
              style={{
                textTransform: "lowercase",
              }}
            >
              {data}
            </div>
          ),
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (_, param2) => (
            <div>
              <Link to={`/detailservice/${param2.id}`}>
                <EyeOutlined />
              </Link>
              <Button
                type="link"
                onClick={() => {
                  navigate(`/event/edit/${param2?._id}`);
                }}
              >
                <EditOutlined
                  style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                />
              </Button>
              <Link to={`/event`}>
                <DeleteOutlined onClick={() => deleteService(param2._id)} />
              </Link>
            </div>
          ),
        },
      ];
    
      const [query, setQuery] = useState({
        page: 1,
        limit: 5,
        name: "",
        email: "",
        status: "",
      });
    
      const navigate = useNavigate();
      const [owners, setService] = useState([]);
      const [pagination, setPagination] = useState({});
      const [type, setType] = useState("Name");
      const [value, setValue] = useState("");
    
      const fetchService = async () => {
        const response = await axiosInstance.get("/event", {
          params: query,
        });
        console.log(response);
    
        setService(response.data.events);
      };
    
      const onTableChange = (values) => {
        setQuery({ ...query, page: values });
      };
    
      const handleTypeChange = (value) => {
        setType(value);
      };
    
      const onInputChange = (event) => {
        const value = event.target.value;
        setValue(value);
      };
    
      const onSearch = () => {
        if (type === "Name") {
          setQuery({ ...query, name: value });
        } else {
          setQuery({ ...query, email: value });
        }
      };
    
      const toCreateService = () => {
        navigate("/createevent");
      };
    
      useEffect(() => {
        // call API
        fetchService();
      }, [query]);
    
      //-------------------------
      let idNew = null;
      const data = owners;
      if (data && data.length > 0) {
        idNew = data[0]._id;
      }
      // //xoa
      const token = localStorage.getItem("accessToken") ?? "";
    
      const apiURL = `event-list/?eventId=${idNew}`;
    
      const deleteService = async (id) => {
        const apiURL = `event-list/?eventId=${id}`;
        await axiosInstance
          .delete(apiURL, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log(result);
            notification.open({
              message: "Delete Success",
              icon: (
                <CheckCircleOutlined
                  style={{
                    color: "#00ff66",
                  }}
                />
              ),
            });
          })
          .catch((error) => {
            console.log(error);
            notification.open({
              message: error.response,
              icon: (
                <WarningOutlined
                  style={{
                    color: "#e91010",
                  }}
                />
              ),
            });
          });
    
        onTableChange();
      };
    
      return (
        <div
          className="profile"
          style={{
            marginTop: 30,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          <div>
            <Row gutter={24}>
              <Col className="gutter-row" span={6}>
                <h2>List Event</h2>
              </Col>
              <Col className="gutter-row" span={15}></Col>
              <Col className="gutter-row" span={3}>
                <Button onClick={toCreateService}>Create Account</Button>
              </Col>
            </Row>
          </div>
    
          {/* --------------------------- */}
          <div
            style={{
              marginBottom: 20,
            }}
          >
            <Row gutter={24}>
              <Col className="gutter-row" span={8}>
                <Space.Compact
                  style={{
                    position: "relative",
                  }}
                  block
                >
                  <Select
                    defaultValue={type}
                    allowClear
                    onChange={handleTypeChange}
                  >
                    <Option value="Name">event Name</Option>
                    <Option value="Email">Email</Option>
                  </Select>
                  <Search
                    onChange={onInputChange}
                    value={value}
                    allowClear
                    onSearch={onSearch}
                    style={{
                      width: "100%",
                    }}
                  />
                </Space.Compact>
              </Col>
              <Col span={10}></Col>
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
      );
    };
    
    export default Event;
    