import { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Update the URL with your actual API endpoint
    axios.get("/contribution").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <Card
          key={item._id}
          title={item.faculty}
          description={
            <ul>
              {item.files.map((file) => (
                <li key={file}>
                  {/* Assuming 'file' contains a downloadable URL */}
                  <a href={file} target="_blank" rel="noreferrer">
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          }
        />
      ))}
    </div>
  );
};

export default App;
