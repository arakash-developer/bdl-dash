import { useRef } from "react";
import RegistrationForm from "../components/RegistrationForm";
import UsersTable from "../components/UsersTable";

const UserManagement = () => {
  const usersTableRef = useRef();

  const handleUserCreated = () => {
    // Refresh the users table when a new user is created
    if (usersTableRef.current) {
      usersTableRef.current.refreshUsers();
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <RegistrationForm onUserCreated={handleUserCreated} />
      </div>
      <div className="w-2/3">
        <UsersTable ref={usersTableRef} />
      </div>
    </div>
  );
};

export default UserManagement;
