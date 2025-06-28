import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Tag, notification } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { userInfo, fetchUserData } = useContext(AuthContext);

  // Get all user data from localStorage for debugging
  const rawUserData = localStorage.getItem("userInfo");
  const parsedUserData = rawUserData ? JSON.parse(rawUserData) : {};

  const handleRefreshUserData = async () => {
    if (userInfo._id || userInfo.user) {
      const userId = userInfo._id || userInfo.user;
      try {
        await fetchUserData(userId);
        notification.success({
          message: "User data refreshed successfully!",
          duration: 2,
        });
      } catch (error) {
        notification.error({
          message: "Failed to refresh user data",
          duration: 2,
        });
      }
    }
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleRefreshUserData}
            loading={false}
          >
            Refresh Data
          </Button>
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
              <Tag
                color={userInfo?.role === "admin" ? "red" : "blue"}
                className="text-sm"
              >
                {userInfo?.role ? userInfo.role.toUpperCase() : "USER"}
              </Tag>
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
              <Tag color={userInfo?.role === "admin" ? "red" : "blue"}>
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

        {/* API Response Status */}
        <Card title="Data Source Status" className="mt-6 shadow-lg">
          <div className="space-y-2">
            <p>
              <strong>Data loaded from:</strong> Backend API (/users/:id)
            </p>
            <p>
              <strong>User ID used:</strong>{" "}
              {userInfo?._id || userInfo?.user || "N/A"}
            </p>
            <p>
              <strong>Last updated:</strong> {new Date().toLocaleString()}
            </p>
          </div>
        </Card>

        {/* Raw Data Card (for debugging) */}
        <Card title="Raw User Data (localStorage)" className="mt-6 shadow-lg">
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(parsedUserData, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
