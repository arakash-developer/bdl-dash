import { Button, Image, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import MokupBannerContext from "../context/MokupBannerContex";
import MokupBannerEdit from "./MokupBannerEdit";
const MokupBannerList = () => {
  //Modal for View
  const [isModalVisibleForView, setIsModalVisibleForView] = useState(false);
  const [isModalVisibleForEdit, setIsModalVisibleForEdit] = useState(false);
  const [selectedRecentWork, setSelectedRecentWork] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [series, setSeries] = useState([]);
  let { mokupBanner, deleteRecentWorkBanner } = useContext(MokupBannerContext);
  const handleViewCancel = () => {
    setIsModalVisibleForView(false);
    setSelectedRecentWork(null);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter recent works based on search term
  const filteredRecentWorks = mokupBanner.filter((work) =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      title: "Status",
      dataIndex: "status",
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
              alt={"Not Found"}
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
        dataSource={filteredRecentWorks.sort((a, b) => a.prioroty - b.prioroty)}
        // dataSource={mokupBanner}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
      {/* Modal for View */}
      <Modal
        title="View Mockup Banner"
        visible={isModalVisibleForView}
        onCancel={handleViewCancel}
        footer={null}
        style={{ top: 20 }}
        width={1200}
      >
        <div className="space-y-4">
          <p className="font-semibold text-xl">
            Title:
            <span className="ml-1 capitalize text-green-500 text-2xl">
              {selectedRecentWork?.title || "Untitled"}
            </span>
          </p>

          <p className="font-semibold text-xl">
            Zone:
            <span className="ml-1 capitalize text-green-500 text-2xl">
              {selectedRecentWork?.mokupzone}
            </span>
          </p>

          <p className="font-semibold text-xl">
            Project Name:
            <span className="ml-1 capitalize text-green-500 text-2xl">
              {selectedRecentWork?.projectName || "No Project Name"}
            </span>
          </p>

          <p className="font-semibold text-xl">
            Priority:
            <span className="ml-1 text-green-500 text-2xl">
              {selectedRecentWork?.priority}
            </span>
          </p>

          <p className="font-semibold text-xl">
            Status:
            <span className="ml-1 capitalize text-green-500 text-2xl">
              {selectedRecentWork?.status}
            </span>
          </p>

          <div>
            <p className="font-semibold text-xl mb-2">Banner Image:</p>
            <Image.PreviewGroup>
              <Image
                preview={true}
                src={`${import.meta.env.VITE_URL}${selectedRecentWork?.image}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                lazy={true}
              />
            </Image.PreviewGroup>
          </div>

          <p className="font-semibold text-xl">
            Created At:-
            <span className="ml-1 text-green-500 text-lg">
              {new Date(selectedRecentWork?.createdAt).toLocaleString()}
            </span>
          </p>

          <p className="font-semibold text-xl">
            Updated At:
            <span className="ml-1 text-green-500 text-lg">
              {new Date(selectedRecentWork?.updatedAt).toLocaleString()}
            </span>
          </p>
        </div>
      </Modal>
      {/* Modal for Edit */}
      <MokupBannerEdit
        recentWork={selectedRecentWork}
        onCancel={handleEditCancel}
        visible={isModalVisibleForEdit}
      />
    </>
  );
};

export default MokupBannerList;
