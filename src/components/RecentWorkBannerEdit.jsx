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
import RecentWorksBannerContext from "../context/RecentWorkBannerContext";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const RecentWorkBannerEdit = ({ recentWork, onCancel, visible }) => {
  const { updateRecentWorkBanner, loading } = useContext(
    RecentWorksBannerContext
  );
  console.log(recentWork);
  const [form] = Form.useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState([]); // New images
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images to delete
  const [series, setSeries] = useState([]);

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

  useEffect(() => {
    if (recentWork) {
      form.setFieldsValue({
        title: recentWork.title,
        description: recentWork.description,
        client: recentWork.client,
        location: recentWork.location,
        priority: recentWork.priority,
        status: recentWork.status,
        series: recentWork.series,
      });

      //   Populate existing files
      if (recentWork.image) {
        setImage([
          {
            uid: 0,
            name: "Image 1",
            status: "done",
            url: `${import.meta.env.VITE_URL}${recentWork.image}`,
          },
        ]);
      }
    }
  }, [recentWork, form]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    if (values.title) formData.append("title", values.title);
    if (values.priority) formData.append("priority", values.priority);
    // if (values.status) formData.append("status", values.status);
    // if (values.file) formData.append("file", values.file);
    if (image.length > 0) {
      formData.append("image", image[0].originFileObj);
    }

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setUploadProgress(percent);
        }
      },
    };

    try {
      await updateRecentWorkBanner(recentWork._id, formData, config);
    } catch (error) {
      console.error(error);
      notification.error({
        message: error.response.data.message
          ? error.response.data.message
          : error.message,
        duration: 2,
      });
    } finally {
      form.resetFields();
      setImagesToDelete([]);
      setUploadProgress(0);
      onCancel();
    }
  };

  const handleFileRemove = (file, setList, setListToDelete) => {
    setList((prev) => prev.filter((item) => item.uid !== file.uid)); // Remove from fileList
    console.log(file.url.replace(import.meta.env.VITE_URL, ""));
    setListToDelete((prev) => [
      ...prev,
      file.url.replace(import.meta.env.VITE_URL, ""),
    ]); // Add to the deletion list
  };

  return (
    <>
      <Modal
        title="Edit Recent Work"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
        maskClosable={false}
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <div className="flex justify-between">
            {/* Title */}
            <Form.Item name="title" label="Title">
              <Input name="title" placeholder="Enter title" />
            </Form.Item>
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
              mode="multiple"
              name="series"
              allowClear
              style={{
                width: "100%",
              }}
              className="col-span-2"
              placeholder="Please select"
            >
              {series.map((item) => (
                <Select.Option
                  style={{ display: "flex", alignItems: "center" }}
                  key={item._id}
                  value={item._id}
                >
                  {/* <img
                    className="inline-block mr-1 mb-1"
                    src={`${import.meta.env.VITE_URL}` + item.image}
                    width={20}
                    alt=""
                  /> */}
                  <span className="inline-block">{item.title}</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
     

          {/* Images */}
          <Form.Item label="Images">
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={image}
              onChange={({ fileList }) => setImage(fileList)}
              onRemove={(file) =>
                handleFileRemove(file, setImage, setImagesToDelete)
              }
              beforeUpload={() => false} // Prevent automatic upload
              multiple
            >
              {uploadButton}
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

          {/* Submit button */}
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="mt-3"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecentWorkBannerEdit;

RecentWorkBannerEdit.propTypes = {
  recentWork: PropTypes.object,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};
