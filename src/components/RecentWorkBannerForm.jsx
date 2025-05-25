import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  notification,
  Progress,
  Select,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import RecentWorksBannerContext from "../context/RecentWorkBannerContext";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const RecentWorkBannerForm = () => {
  const [form] = Form.useForm();
  const { createRecentWorkBanner } = useContext(RecentWorksBannerContext);
  const [series, setSeries] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // State for progress
  const [images, setImages] = useState([]);
  const [recentWorkBanner, setRecentWorkBanner] = useState();

  const getAllSerise = async () => {
    try {
      const res = await axios.get("/recent-works");
      setSeries(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllSerise();
  }, []);

  const handleImageChange = ({ fileList: newImagesFileList }) =>
    setImages(newImagesFileList);
  const handleVideoChange = ({ fileList: newVideoFileList }) =>
    setVideos(newVideoFileList);
  const handleThumbnailChange = ({ fileList: newThumbnailFileList }) =>
    setThumbnail(newThumbnailFileList);

  const onFinish = async (values) => {
    const formData = new FormData();

    if (values.title) formData.append("title", values.title);
    if (values.priority) formData.append("priority", values.priority);
    if (values.status) formData.append("status", values.status);
    if (recentWorkBanner) formData.append("recentWork", recentWorkBanner);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("image", image.originFileObj);
      });
    }

    // Set up the config to track the progress
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted); // Update the progress
      },
    };

    // Submit the form data to the server
    try {
      await createRecentWorkBanner(formData, config);
    } catch (error) {
      console.error(error.message);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
      form.resetFields();
      setImages([]);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <Form.Item
            className="mb-2"
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
        </div>
        {/* Title */}

        <div className="col-span-2">
          {/* prioroty */}
          <Form.Item name="priority" label="priority">
            <Input placeholder="Enter priority" type="number" />
          </Form.Item>

          <Form.Item name="status" label="status">
            <Select placeholder="Enter status" name="status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item className="col-span-2" name="series" label="Series">
          <Select
            // mode="multiple"
            name="series"
            allowClear
            style={{
              width: "100%",
            }}
            className="col-span-2"
            placeholder="Please select"
            onChange={(value) => setRecentWorkBanner(value)}
          >
            {series.map((item) => (
              <Select.Option
                style={{ display: "flex", alignItems: "center" }}
                key={item._id}
                value={item._id}
              >
                <span className="inline-block">{item?.title}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          className="mb-2 col-span-2"
          label="Upload Images"
          name="image"
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            accept="image/*"
            action={null}
            listType="picture-card"
            fileList={images}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
            // multiple // Allow multiple image uploads
          >
            {images.length >= 40 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {uploadProgress > 0 && (
          <Progress
            className="col-span-2"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percentPosition={{
              align: "end",
              type: "inner",
            }}
            percent={uploadProgress}
            size={["100%", 20]}
          />
        )}

        {/* Submit Button */}
        <div className="col-span-2 mt-3">
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RecentWorkBannerForm;
