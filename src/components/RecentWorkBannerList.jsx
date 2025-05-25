import { Button, Col, Image, Input, Modal, Popconfirm, Row, Table } from "antd";
import { useContext, useState } from "react";
import RecentWorksBannerContext from "../context/RecentWorkBannerContext";
import RecentWorkBannerEdit from "./RecentWorkBannerEdit";
const RecentWorkBannerList = () => {
  //Modal for View
  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedRecentWork, setSelectedRecentWork] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input
  let { recentWorks,deleteRecentWorkBanner } = useContext(RecentWorksBannerContext);
  const handleViewCancel = () => {
    setIsModalVisibleForView(false);
    setSelectedRecentWork(null);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  // Filter recent works based on search term
  const filteredRecentWorks = recentWorks.filter(
    (work) =>
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (work.location &&
        work.location.toLowerCase().includes(searchTerm.toLowerCase())) // Optional location filter
  );

  const handleView = (record) => {
    setSelectedRecentWork(record);
    setIsModalVisibleForView(true);
    console.log(record);
  };
  const handleDelete = (record) => {
    deleteRecentWorkBanner(record._id);
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
      title: "Project Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "prioroty",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "prioroty",
      render: (image) => {
        return (
          <>
            <Image
              key={image}
              src={`${import.meta.env.VITE_URL}` + image}
              alt={image}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          </>
        );
      },
    },
    // {
    //   title: "Images",
    //   dataIndex: "images",
    //   key: "images",
    //   render: (images=[]) => (
    //     <div className="flex flex-wrap items-center">
    //       {images.slice(0, 2).map((image, index) => (
    //         <Image
    //           key={index}
    //           src={`${import.meta.env.VITE_URL}` + image}
    //           alt={`Image ${index + 1}`}
    //           style={{
    //             width: 100,
    //             height: 100,
    //             marginRight: 10,
    //             cursor: "pointer",
    //           }}
    //         />
    //       ))}
    //       {images.length > 2 && (
    //         <span className="ml-3 text-gray-500 font-bold">
    //           +{images.length - 2} more
    //         </span>
    //       )}
    //     </div>
    //   ),
    // },
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
          placeholder="Search by title, client or location"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        // dataSource={filteredRecentWorks.sort((a, b) => a.prioroty - b.prioroty)}
        dataSource={recentWorks}
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
            Project Name:
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.title}
            </span>
          </p>
          <p className="font-semibold text-xl mb-4">
            Prioroty:{" "}
            <span className="text-green-500 text-2xl">
              {selectedRecentWork?.priority}{" "}
            </span>
          </p>
        </div>
        <p style={{ fontWeight: "bold" }}>Images:</p>
        <Row gutter={[16, 16]}>
          {/* {selectedRecentWork?.images.map((image, index) => (
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
          ))} */}

          <Col>
            <Image.PreviewGroup>
              <Image
                preview={true} // Disable default preview
                src={`${import.meta.env.VITE_URL + selectedRecentWork?.image}`}
                //   alt={`Image ${index + 1}`}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
                lazy={true}
              />
            </Image.PreviewGroup>
          </Col>
        </Row>
      </Modal>

      {/* Modal for Edit */}
      <RecentWorkBannerEdit
        recentWork={selectedRecentWork}
        onCancel={handleEditCancel}
        visible={isModalVisibleForEdit}
      />
    </>
  );
};

export default RecentWorkBannerList;
