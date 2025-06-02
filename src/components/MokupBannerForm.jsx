import {
  Button,
  Form,
  Input,
  Progress,
  Select,
  Upload,
  notification,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { MockupZoneContext } from "../context/MockupZoneContex";
import { MokupBannerContext } from "../context/MokupBannerContext";

const MokupBannerForm = () => {
  const { createMokupBanner, loading } = useContext(MokupBannerContext);
  const { mockupZones, getAllMockupZone } = useContext(MockupZoneContext);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    console.log("Fetching mockup zones...");
    getAllMockupZone();
  }, []);

  // Debug log to check mockupZones data
  console.log("Current mockupZones:", mockupZones);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("status", values.status);
    formData.append("priority", values.priority);
    formData.append("mokupzone", values.mokupzone);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createMokupBanner(formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      notification.success({
        message: "Banner created successfully!",
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || "Error creating banner",
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
      form.resetFields();
      setImageFile(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Mokup Banner</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="mokupzone"
          label="Mockup Zone"
          rules={[{ required: true, message: "Please select a mockup zone" }]}
        >
          <Select placeholder="Select Mockup Zone">
            {Array.isArray(mockupZones) &&
              mockupZones.map((zone) => (
                <Select.Option key={zone._id} value={zone._id}>
                  {zone.zoneName || zone.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Banner Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
            maxCount={1}
            fileList={imageFile ? [imageFile] : []}
          >
            <Button>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          initialValue="active"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please enter priority" }]}
        >
          <Input type="number" min={1} placeholder="Enter priority" />
        </Form.Item>

        {uploadProgress > 0 && (
          <Progress
            className="mb-4"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={uploadProgress}
            size={["100%", 20]}
          />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MokupBannerForm;
