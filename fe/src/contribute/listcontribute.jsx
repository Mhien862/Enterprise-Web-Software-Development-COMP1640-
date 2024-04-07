import React, { useEffect, useState } from "react";
import { Card, Image, List } from "antd";
import axios from "axios";
import axiosInstance from "../services/axios.service";

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

  const renderCards = () => {
    return data.map((item) => (
      <Card key={item._id} title={item.faculty}>
        {/* Username */}
        <p>Username: {item.username}</p>

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
            </List.Item>
          )}
        />
      </Card>
    ));
  };

  return <div>{renderCards()}</div>;
};

export default App;
