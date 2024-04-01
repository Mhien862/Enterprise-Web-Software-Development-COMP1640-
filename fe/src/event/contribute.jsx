import { useState } from "react";
import { Form, Input, Button, Upload, Radio } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Here you can make an API call to post the data to the social network
      // Replace the following with your actual API call
      console.log("Posting data:", values);
      // Example API call using fetch
      const response = await fetch("http://localhost:1000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("Posted successfully");
        // You can do something after successful post, like showing a success message
      } else {
        console.error("Failed to post");
        // Handle error here
      }
    } catch (error) {
      console.error("Error posting:", error);
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="postForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="Title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="Content"
        rules={[{ required: true, message: "Please input your content!" }]}
      >
        <TextArea rows={4} placeholder="Content" />
      </Form.Item>

      <Form.Item name="Faculty" label="Faculty">
        <Radio.Group onChange={onChange} defaultValue="IT">
          <Radio.Button value="IT">IT</Radio.Button>
          <Radio.Button value="Business">Business</Radio.Button>
          <Radio.Button value="Design">Design</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload Text and Picture"
      >
        <Upload name="logo" action="/upload" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
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

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
