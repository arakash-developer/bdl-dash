import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Progress,
  Select,
  Upload,
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import MokupBannerContext from "../context/MokupBannerContex";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const MokupBannerEdit = ({ recentWork, onCancel, visible }) => {
  const { updateRecentWorkBanner, loading } = useContext(MokupBannerContext);
  const [form] = Form.useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState([]);
  const [zones, setZones] = useState([]);

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

  useEffect(() => {
    if (recentWork) {
      form.setFieldsValue({
        title: recentWork.title,
        priority: recentWork.priority,
        status: recentWork.status,
        zone: recentWork.mokupzone,
      });

      // Set existing image
      if (recentWork.image) {
        setImage([
          {
            uid: "-1",
            name: "Current Image",
            status: "done",
            url: `${import.meta.env.VITE_URL}${recentWork.image}`,
          },
        ]);
      }
    }
  }, [recentWork, form]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title || "untitled banner");
    formData.append("priority", values.priority || 1);
    formData.append("status", values.status || "active");
    formData.append("mokupzone", values.zone);

    if (image.length > 0 && image[0].originFileObj) {
      formData.append("image", image[0].originFileObj);
    }

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      await updateRecentWorkBanner(recentWork._id, formData, config);
      notification.success({
        message: "Banner updated successfully",
        duration: 2,
      });
      onCancel();
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed to update banner",
        description: error.response?.data?.message || error.message,
        duration: 2,
      });
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <Modal
      title="Edit Mockup Banner"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Input type="number" placeholder="Enter priority" />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="zone" label="Zone" rules={[{ required: true }]}>
          <Select placeholder="Select zone">
            {zones.map((zone) => (
              <Select.Option key={zone._id} value={zone.name}>
                {zone.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Banner Image">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={image}
            onChange={({ fileList }) => setImage(fileList)}
            beforeUpload={() => false}
            maxCount={1}
          >
            {image.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {uploadProgress > 0 && (
          <Progress
            percent={uploadProgress}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        )}

        <Button type="primary" htmlType="submit" loading={loading}>
          Update Banner
        </Button>
      </Form>
    </Modal>
  );
};

export default MokupBannerEdit;

MokupBannerEdit.propTypes = {
  recentWork: PropTypes.object,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};
