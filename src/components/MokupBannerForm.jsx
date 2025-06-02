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
import MokupBannerContext from "../context/MokupBannerContex";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const MokupBannerForm = () => {
  const [form] = Form.useForm();
  const { createMokupBanner, mokupBanner } = useContext(MokupBannerContext);
  const [zones, setZones] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState([]);

  const getAllZones = async () => {
    try {
      const res = await axios.get("/mockup-zones");
      setZones(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllZones();
  }, []);

  const handleImageChange = ({ fileList: newImagesFileList }) =>
    setImages(newImagesFileList);

  const checkExistingBanner = (zoneName) => {
    return mokupBanner.some((banner) => banner.mokupzone === zoneName);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    const selectedZone = zones.find((z) => z._id === values.zone);

    if (selectedZone && checkExistingBanner(selectedZone.name)) {
      notification.warning({
        message: "Banner already exists",
        description: `A banner for ${selectedZone.name} already exists. Please choose a different zone.`,
        duration: 3,
      });
      return;
    }

    formData.append("title", values.title || "untitled banner");
    formData.append("priority", values.priority || 1);
    formData.append("status", values.status || "active");
    if (selectedZone) {
      formData.append("mokupzone", selectedZone.name);
      formData.append("projectName", selectedZone.title || null);
    }
    if (images.length > 0) {
      formData.append("image", images[0].originFileObj);
    }

    // Debug log
    console.log("Form Data:", Object.fromEntries(formData));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      await createMokupBanner(formData, config);
      notification.success({
        message: "Banner created successfully",
        duration: 2,
      });
      form.resetFields();
      setImages([]);
    } catch (error) {
      console.error("Submission error:", error.response?.data);
      notification.error({
        message: "Failed to create banner. Please check console for details.",
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: "active",
          priority: 1,
        }}
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
          <Form.Item name="priority" label="Priority" initialValue={1}>
            <Input placeholder="Enter priority" type="number" />
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="active">
            <Select placeholder="Enter status" name="status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          className="col-span-2"
          name="zone"
          label="Zone"
          rules={[{ required: true, message: "Please select a zone!" }]}
        >
          <Select
            name="zone"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select zone"
          >
            {zones.map((zone) => (
              <Select.Option key={zone._id} value={zone._id}>
                {zone.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          className="mb-2 col-span-2"
          label="Upload Images"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            accept="image/*"
            action={null}
            listType="picture-card"
            fileList={images}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
            maxCount={1}
          >
            {images.length >= 1 ? null : uploadButton}
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

export default MokupBannerForm;
