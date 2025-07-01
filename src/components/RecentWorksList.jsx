import { Button, Col, Image, Input, Modal, Popconfirm, Row, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import RecentWorksContext from "../context/RecentWorksContext";
import RecentWorkEdit from "./RecentWorkEdit";

const RecentWorksList = () => {
  const { recentWorks, deleteRecentWork } = useContext(RecentWorksContext);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  const [series, setSeries] = useState([]); // State to store all series

  //Modal for View
  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedRecentWork, setSelectedRecentWork] = useState(null);

  // Fetch all series data
  const getAllSeries = async () => {
    try {
      const res = await axios.get("/series");
      console.log("Fetched Series Data:", res.data);
      setSeries(res.data);
    } catch (error) {
      console.error("Error fetching series:", error.message);
    }
  };

  useEffect(() => {
    getAllSeries();
  }, []);

  const handleViewCancel = () => {
    setIsModalVisibleForView(false);
    setSelectedRecentWork(null);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter recent works based on search term
  const filteredRecentWorks = recentWorks.filter(
    (work) =>
      (work.title &&
        work.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (work.projectId &&
        work.projectId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (work.client &&
        work.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (work.location &&
        work.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleView = (record) => {
    setSelectedRecentWork(record);
    setIsModalVisibleForView(true);
    console.log("Selected Recent Work:", record);
    console.log("All Series:", series);
    console.log("Selected Work Series:", record.series);
  };

  const handleDelete = (record) => {
    console.log(record);
    deleteRecentWork(record._id);
  };

  const handleEdit = (record) => {
    setSelectedRecentWork(record);
    setIsModalVisibleForEdit(true);
    console.log(record);
  };
  const handleEditCancel = () => {
    setIsModalVisibleForEdit(false);
    setSelectedRecentWork(null);
  };

  const columns = [
    {
      title: "Project Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Project Name",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Prioroty",
      dataIndex: "prioroty",
      key: "prioroty",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div className="flex flex-wrap items-center">
          {images.slice(0, 2).map((image, index) => (
            <Image
              key={index}
              src={`${import.meta.env.VITE_URL}` + image}
              alt={`Image ${index + 1}`}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          ))}
          {images.length > 2 && (
            <span className="ml-3 text-gray-500 font-bold">
              +{images.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this zone?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <Input.Search
          placeholder="Search by Project Title, Project Name, Client, or Location"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 400 }}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredRecentWorks.sort((a, b) => a.prioroty - b.prioroty)}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />

      {/* Modal for View */}
      <Modal
        title="View Recent Work"
        visible={isModalVisibleForView}
        onCancel={handleViewCancel}
        footer={null}
        style={{ top: 20 }}
        width={1200}
      >
        <div>
          <p className="font-semibold text-xl mb-4">
            Prioroty:{" "}
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.prioroty}{" "}
            </span>
          </p>
          <p className="font-semibold text-xl mb-4">
            Project Title:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.title}
            </span>
          </p>
          <p className="font-semibold text-xl mb-4">
            Project Name:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.projectId}
            </span>
          </p>
          <p className="font-semibold text-xl mb-4">
            Client:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.client}
            </span>
          </p>

          <p className="font-semibold text-xl mb-4">
            Location:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.location}
            </span>
          </p>

          <p className="font-semibold text-xl mb-4">
            Description:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.description}
            </span>
          </p>

          {/* Series Section */}
          {selectedRecentWork?.series &&
            selectedRecentWork.series.length > 0 && (
              <div className="mb-4">
                <p className="font-semibold text-xl mb-2">Selected Series:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRecentWork.series.map((seriesId, index) => {
                    console.log(`Looking for series ID: ${seriesId}`);
                    console.log("Available series:", series);

                    // Try to find the series by _id
                    let seriesItem = series.find((s) => s._id === seriesId);

                    // If not found, try by id (in case the field name is different)
                    if (!seriesItem) {
                      seriesItem = series.find((s) => s.id === seriesId);
                    }

                    console.log(`Found series item:`, seriesItem);

                    return (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {seriesItem
                          ? seriesItem.title ||
                            seriesItem.name ||
                            "Unnamed Series"
                          : `Series ID: ${seriesId}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
        </div>

        <p style={{ fontWeight: "bold" }}>Images:</p>
        <Row gutter={[16, 16]}>
          {selectedRecentWork?.images.map((image, index) => (
            <Col key={index}>
              <Image.PreviewGroup>
                <Image
                  preview={true} // Disable default preview
                  src={`${import.meta.env.VITE_URL}` + image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                  lazy={true}
                />
              </Image.PreviewGroup>
            </Col>
          ))}
        </Row>

        {/* Videos Section */}
        {selectedRecentWork?.videos && selectedRecentWork.videos.length > 0 && (
          <>
            <p style={{ fontWeight: "bold" }}>Videos:</p>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {selectedRecentWork.videos.map((video, index) => (
                <Col span={8} key={index}>
                  <video
                    width="100%"
                    height="150"
                    controls
                    poster={`${import.meta.env.VITE_URL}` + video.thumbnail}
                    src={`${import.meta.env.VITE_URL}` + video.video}
                    autoPlay={false}
                    style={{ objectFit: "cover" }}
                  ></video>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal>

      {/* Modal for Edit */}
      <RecentWorkEdit
        recentWork={selectedRecentWork}
        onCancel={handleEditCancel}
        visible={isModalVisibleForEdit}
      />
    </>
  );
};

export default RecentWorksList;
