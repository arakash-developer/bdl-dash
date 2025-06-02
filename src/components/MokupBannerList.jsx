import { Button, Image, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import { MokupBannerContext } from "../context/MokupBannerContext";
import MokupBannerEdit from "./MokupBannerEdit";

const MokupBannerList = () => {
  const { mokupBanners, deleteMokupBanner, loading } =
    useContext(MokupBannerContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  let siteurl = import.meta.env.VITE_URL;

  const handleView = (record) => {
    setSelectedBanner(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingBanner(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingBanner(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBanners = mokupBanners.filter((banner) =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={`${siteurl}/${image}`}
          alt="Banner"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
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
            title="Are you sure to delete this banner?"
            onConfirm={() => deleteMokupBanner(record._id)}
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
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Mokup Banners</h2>
        <Input.Search
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredBanners}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="View Banner Details"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedBanner(null);
        }}
        footer={null}
      >
        {selectedBanner && (
          <div>
            <p className="font-semibold text-xl mb-4">
              Title:{" "}
              <span className="text-green-500">{selectedBanner.title}</span>
            </p>
            <p className="font-semibold text-xl mb-4">
              Priority:{" "}
              <span className="text-green-500">{selectedBanner.priority}</span>
            </p>
            <p className="font-semibold text-xl mb-4">
              Status:{" "}
              <span className="text-green-500">{selectedBanner.status}</span>
            </p>
            <Image
              src={`${siteurl}/${selectedBanner.image}`}
              alt={selectedBanner.title}
              style={{ width: "100%", maxHeight: 400, objectFit: "contain" }}
            />
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <MokupBannerEdit
        banner={editingBanner}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </div>
  );
};

export default MokupBannerList;
