import React, { useEffect, useState } from "react";
import { Button, Card, Image, List, Tooltip } from "antd";
import axiosInstance from "../services/axios.service";
import {
  CommentOutlined,
  LikeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:1000/contribution"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/contribute");
  };

  const handleLike = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].liked = !newData[index].liked;
      return newData;
    });
  };

  const handleComment = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].commented = !newData[index].commented;
      return newData;
    });
  };

  const handleDelete = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const renderCards = () => {
    return data.map((item, index) => (
      <Card key={item._id} title={item.faculty}>
        {/* Username */}
        <p>USERNAME: {item.username}</p>

        {/* Files */}
        <List
          itemLayout="horizontal"
          dataSource={item.files}
          renderItem={(file) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  file.mimetype.startsWith("image/") ? (
                    <Image
                      src={`http://localhost:1000/contribution-img/${file.filename}`} // Replace with image URL provider
                      width={200}
                    />
                  ) : null
                }
                title={file.originalname}
              />
              <Tooltip title={item.liked ? "Unlike" : "Like"}>
                <Button
                  icon={<LikeOutlined />}
                  type={item.liked ? "primary" : "default"}
                  onClick={() => handleLike(index)}
                >
                  {item.liked ? "Liked" : "Like"}
                </Button>
              </Tooltip>
              <Tooltip title={item.commented ? "Hide comment" : "Comment"}>
                <Button
                  icon={<CommentOutlined />}
                  type={item.commented ? "primary" : "default"}
                  onClick={() => handleComment(index)}
                >
                  {item.commented ? "Commented" : "Comment"}
                </Button>
              </Tooltip>
              {item.commented && (
                <Comment content={<p>Your comment content here...</p>} />
              )}
              <Tooltip title="Delete">
                <Button
                  icon={<DeleteOutlined />}
                  type="danger"
                  onClick={() => handleDelete(index)}
                />
              </Tooltip>
            </List.Item>
          )}
        />
      </Card>
    ));
  };

  return (
    <div>
      <Button onClick={handleCreate} type="primary" block>
        New Post
      </Button>
      {renderCards()}
    </div>
  );
};

export default App;
