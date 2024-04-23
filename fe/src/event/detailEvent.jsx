import React, { useEffect, useState } from "react";
import { Button, Card, Image, List, Tooltip } from "antd";
import axiosInstance from "../services/axios.service";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/event-by-id?eventId=${id}`);
      const eventData = response.data.event;

      const contributionDetails = await Promise.allSettled(
        eventData.contributions.map(async (contributionId) => {
          const contributionResponse = await axiosInstance.get(
            `/upload/${contributionId}`
          );
          return contributionResponse.data.contribution;
        })
      );
      console.log(contributionDetails)
      setData(contributionDetails); // Combine event and contribution details
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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

  const renderCards = () => {
    console.log(data)
    if (data && data.length > 0) {
      return data.filter(data => data.status !== "rejected").map((item, index) => (
        <Card key={item.value._id} style={{ marginBottom: 20 }}>
          {/* Username */}
          <p>USERNAME: {item.value.username}</p>

          {/* Files */}
          <List
            itemLayout="horizontal"
            dataSource={item.value.files}
            renderItem={(file) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    file.mimetype.startsWith("image/") ? (
                      <Image
                        src={file.path}
                        // src={`http://localhost:1000/contribution-img/${file.filename}`} // Replace with image URL provider
                        width={200}
                      />
                    ) : file.mimetype === "application/msword" ? (
                      <Image
                        src="path_to_doc_icon" // Provide path to a doc icon image
                        width={200}
                        alt="doc"
                      />
                    ) : null
                  }
                  title={file.originalname}
                />
                <Tooltip title={item.value.liked ? "Unlike" : "Like"}>
                  <Button
                    icon={<LikeOutlined />}
                    type={item.value.liked ? "primary" : "default"}
                    onClick={() => handleLike(index)}
                  >
                    {item.value.liked ? "Liked" : "Like"}
                  </Button>
                </Tooltip>
                <Tooltip title={item.value.commented ? "Hide comment" : "Comment"}>
                  <Button
                    icon={<CommentOutlined />}
                    type={item.value.commented ? "primary" : "default"}
                    onClick={() => handleComment(index)}
                  >
                    {item.value.commented ? "Commented" : "Comment"}
                  </Button>
                </Tooltip>
                {item.value.commented && (
                  <Comment content={<p>Your comment content here...</p>} />
                )}
              </List.Item>
            )}
          />
        </Card>
      ));
    } else {
      return <p>No data available</p>;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button
        block
        onClick={handleCreate}
        type="primary"
        style={{ marginBottom: 20 }}
      >
        New Post
      </Button>
      {renderCards()}
    </div>
  );
};

export default App;
