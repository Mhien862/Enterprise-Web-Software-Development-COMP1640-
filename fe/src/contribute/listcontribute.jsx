import React, { useEffect, useState } from "react";
import { Card, Image } from "antd";
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
    if (Array.isArray(data)) {
      return data.map((item) => {
        return (
          <Card
            key={item._id}
            title={item.username}
            description={
              <ul>
                {item.files.map((file) => (
                  <li key={file}>
                    <Image
                      src={file}
                      alt={item.faculty + " Image"}
                      width={200}
                    />
                  </li>
                ))}
              </ul>
            }
          />
        );
      });
    } else {
      return <div>No data available</div>;
    }
  };

  return <div>{renderCards()}</div>;
};

export default App;
