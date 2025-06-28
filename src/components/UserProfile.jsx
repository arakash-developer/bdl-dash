import { Card, Descriptions, Tag } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { userInfo } = useContext(AuthContext);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-6 shadow-lg">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userInfo?.name || "Unknown User"}
              </h2>
              <div className="space-y-1">
                <Tag
                  color={userInfo?.role === "admin" ? "green" : "blue"}
                  className="text-sm"
                >
                  {userInfo?.role ? userInfo.role.toUpperCase() : "USER"}
                </Tag>
                <p className="text-gray-600 text-sm">
                  {userInfo?.email || "No email provided"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Information Card */}
        <Card title="Account Details" className="shadow-lg">
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="User ID">
              {userInfo?._id || userInfo?.user || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {userInfo?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userInfo?.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={userInfo?.role === "admin" ? "green" : "blue"}>
                {userInfo?.role ? userInfo.role.toUpperCase() : "USER"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {userInfo?.phone || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={userInfo?.status === "active" ? "green" : "red"}>
                {userInfo?.status ? userInfo.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {formatDate(userInfo?.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {formatDate(userInfo?.updatedAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Last Login">
              {formatDate(userInfo?.lastLogin) || "Current Session"}
            </Descriptions.Item>
            <Descriptions.Item label="Token">
              {userInfo?.token
                ? `${userInfo.token.substring(0, 20)}...`
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
