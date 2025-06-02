import { Button, Form, Input, Modal, Select, Upload, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { MockupZoneContext } from "../context/MockupZoneContex";
import { MokupBannerContext } from "../context/MokupBannerContext";

const MokupBannerEdit = ({ banner, visible, onCancel }) => {
  const { updateMokupBanner, loading } = useContext(MokupBannerContext);
  const { mockupZones, getAllMockupZone } = useContext(MockupZoneContext);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getAllMockupZone();
  }, []);

  useEffect(() => {
    if (banner) {
      form.setFieldsValue({
        title: banner.title,
        priority: banner.priority,
        status: banner.status,
        mokupzone: banner.mokupzone?._id || banner.mokupzone,
      });
    }
  }, [banner, form]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("status", values.status);
      formData.append("priority", values.priority);
      formData.append("mokupzone", values.mokupzone);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await updateMokupBanner(banner._id, formData);
      notification.success({
        message: "Banner updated successfully",
        duration: 2,
      });
      onCancel();
    } catch (error) {
      notification.error({
        message: error.response?.data?.message || "Error updating banner",
        duration: 2,
      });
    }
  };

  return (
    <Modal
      title="Edit Banner"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish} preserve={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please enter priority" }]}
        >
          <Input type="number" min={1} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="mokupzone"
          label="Mockup Zone"
          rules={[{ required: true, message: "Please select a mockup zone" }]}
        >
          <Select placeholder="Select Mockup Zone">
            {mockupZones?.map((zone) => (
              <Select.Option key={zone._id} value={zone._id}>
                {zone.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="New Image">
          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
          >
            <Button>Select New Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Banner
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MokupBannerEdit;
