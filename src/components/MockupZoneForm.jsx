import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Progress, Select, Upload, message } from "antd";
import { useContext, useState } from "react";
import { MockupZoneContext } from "../context/MockupZoneContex";

const { Option } = Select;

const MockupZoneForm = () => {
  const [form] = Form.useForm();
  const { createMockupZone, loading } = useContext(MockupZoneContext);

  const [fileList, setFileList] = useState([]);
  const [videoFileList, setVideoFileList] = useState([]);
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // State for progress

  // Handle the change for image file uploads (multiple images)
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleVideoChange = ({ fileList: newVideoFileList }) => {
    setVideoFileList(newVideoFileList);
  };
  const handleThumbnailChange = ({ fileList: newThumbnailFileList }) => {
    setThumbnailFileList(newThumbnailFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values) => {
    console.log("Form submission started");
    console.log("Video files:", videoFileList);
    console.log("Thumbnail files:", thumbnailFileList);
    console.log("Image files:", fileList);

    // Custom validation: if video is uploaded, thumbnail must also be uploaded
    if (videoFileList.length > 0 && thumbnailFileList.length === 0) {
      message.error("Thumbnail is required when video is uploaded!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);

    // Append multiple image files
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      console.log("Images added to formData");
    } else {
      message.error("At least one image is required!");
      return;
    }

    // Append single video file (optional)
    if (videoFileList.length > 0) {
      formData.append("video", videoFileList[0].originFileObj);
      console.log("Video added to formData");
    } else {
      console.log("No video uploaded - this should be fine");
    }

    // Append single thumbnail file (only if video exists)
    if (thumbnailFileList.length > 0) {
      formData.append("thumbnail", thumbnailFileList[0].originFileObj);
      console.log("Thumbnail added to formData");
    } else {
      console.log("No thumbnail uploaded");
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

    try {
      await createMockupZone(formData, config); // Pass the config with progress
      form.resetFields();
      setFileList([]); // Reset the image file list after submission
      setVideoFileList([]);
      setThumbnailFileList([]);
      setUploadProgress(0); // Reset progress bar
    } catch (error) {
      message.error("Upload failed. Please try again.");
    }
  };

  return (
    <Card title="Create Mockup Zone" bordered={false} style={{ width: "100%" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "active" }}
      >
        <Form.Item
          label="Zone Name"
          name="name"
          rules={[{ required: true, message: "Please select a zone name!" }]}
        >
          <Select
            filterOption={(input, option) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            showSearch
            allowClear
            placeholder="Select a zone"
          >
            {[
              "Zone-1",
              "Zone-2",
              "Zone-3",
              "Zone-4",
              "Zone-5",
              "Zone-6",
              "Zone-7",
              "Zone-8",
              "Zone-9",
              "Zone-10",
              "Zone-11",
              "Zone-12",
              "Zone-13",
              "Zone-14",
              "Zone-15",
              "Zone-16",
              "Zone-17",
            ].map((zone) => (
              <Option key={zone} value={zone}>
                {zone}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Upload multiple images (Pictures Wall) */}
        <Form.Item
          label="Upload Images (Pictures Wall)"
          name="images"
          rules={[
            {
              required: true,
              validator: () => {
                if (fileList.length === 0) {
                  return Promise.reject(
                    new Error("Please upload at least one image!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            accept="image/*"
            action={null}
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple // Allow multiple image uploads
          >
            {fileList.length >= 40 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload single video */}
          <Form.Item label="Video (Optional)" className="w-full">
            <Upload
              accept="video/*"
              listType="picture-card"
              fileList={videoFileList}
              onChange={handleVideoChange}
              beforeUpload={() => false}
              className="w-full"
              maxCount={1}
            >
              {videoFileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          {/* Upload single thumbnail */}
          <Form.Item label="Thumbnail" className="w-full">
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={thumbnailFileList}
              onChange={handleThumbnailChange}
              beforeUpload={() => false}
              className="w-full"
              maxCount={1}
            >
              {thumbnailFileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </div>

        {/* Display progress bar when uploading */}
        {uploadProgress > 0 && (
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={uploadProgress}
            status="active"
            percentPosition={{
              align: "end",
              type: "inner",
            }}
            size={["large", 20]}
          />
        )}

        <Form.Item className="mt-3">
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Create Mockup Zone
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MockupZoneForm;
