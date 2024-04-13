import React, { useEffect, useState } from "react";
import { Button, Card, Image, List, Tooltip } from "antd";
import axiosInstance from "../services/axios.service";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const fetchData = async () => {
    const response = await axiosInstance.get(`/event-by-id?eventId=${id}`);
    const eventData = response.data.event;

    const contributionDetails = await Promise.all(
      eventData.contributions.map(async (contributionId) => {
        const contributionResponse = await axiosInstance.get(
          `/upload?contributionId=${contributionId}`
        );
        return contributionResponse.data.contribution;
      })
    );

    setData({ ...eventData, contributionsDetails }); // Combine event and contribution details
    console.log(data);
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
    if (data && data.length > 0) {
      return data.contributions.map((contributionId, index) => {
        // Access contribution details if fetched
        const contributionDetail = data.contributionsDetails?.[index];

        return (
          <Card key={contributionId} title={data.faculty}>
            {/* Username */}
            <p>USERNAME: {data.username}</p>

            {/* Files */}
            <List
              itemLayout="horizontal"
              dataSource={[contributionDetail]} // Assuming single file per contribution
              renderItem={(file) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      file?.mimetype?.startsWith("image/") ? (
                        <Image
                          src={`http://localhost:1000/contribution-img/${file?.filename}`} // Replace with image URL provider
                          width={200}
                        />
                      ) : null
                    }
                    title={file?.originalname || "Contribution File"} // Display filename if details fetched
                  />
                  <Tooltip title={data.liked ? "Unlike" : "Like"}>
                    <Button
                      icon={<LikeOutlined />}
                      type={data.liked ? "primary" : "default"}
                      onClick={() => handleLike(index)}
                    >
                      {data.liked ? "Liked" : "Like"}
                    </Button>
                  </Tooltip>
                  <Tooltip title={data.commented ? "Hide comment" : "Comment"}>
                    <Button
                      icon={<CommentOutlined />}
                      type={data.commented ? "primary" : "default"}
                      onClick={() => handleComment(index)}
                    >
                      {data.commented ? "Commented" : "Comment"}
                    </Button>
                  </Tooltip>
                  {data.commented && (
                    <Comment content={<p>Your comment content here...</p>} />
                  )}
                </List.Item>
              )}
            />
          </Card>
        );
      });
    }
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
