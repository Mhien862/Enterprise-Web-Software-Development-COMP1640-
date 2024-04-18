import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Radio,
  Checkbox,
  notification,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  SmileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [eventId, setEventId] = useState("");
  const navigate = useNavigate();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("Title", values.Title);
    formData.append("Content", values.Content);
    formData.append("Faculty", values.faculty);
    formData.append("isSelected", isSelected);
    formData.append("eventId", eventId);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:1000/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        navigate("/listcontribute");
        notification.open({
          message: "Post Successfully",
          icon: <CheckCircleOutlined style={{ color: "#00ff66" }} />,
        });
      } else {
        console.error("Failed to post");
      }
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <Form
          name="postForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <h1>Create Post</h1>
          <Form.Item name="faculty" label="Faculty">
            <Radio.Group onChange={onChange} defaultValue="IT">
              <Radio.Button value="IT">IT</Radio.Button>
              <Radio.Button value="Business">Business</Radio.Button>
              <Radio.Button value="Design">Design</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="eventId"
            label="Event ID"
            rules={[{ required: true, message: "Please input the event ID!" }]}
          >
            <Input
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Dragger">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger {...props} name="files">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item label="Check if selected">
            <Checkbox
              checked={isSelected}
              onChange={(e) => setIsSelected(e.target.checked)}
            >
              Is Selected
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PostForm;
