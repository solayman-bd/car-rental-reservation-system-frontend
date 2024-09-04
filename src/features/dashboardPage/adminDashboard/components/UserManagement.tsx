import {
  useGetAllUsersQuery,
  useUpdateAUserByAdminMutation,
} from "@/redux/features/auth/authApi";
import { IUser, TAuthState } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery(undefined);
  const currentUser = useSelector(
    (state: { auth: TAuthState }) => state.auth.user
  );
  const [updateUserByAdmin] = useUpdateAUserByAdminMutation();

  // Store loading states for specific user actions
  const [activeUserForRoleChange, setActiveUserForRoleChange] = useState<
    string | null
  >(null);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  // Filter users based on their roles and status
  const customers = users?.data?.filter(
    (user: IUser) => user.role === "user" && user.status !== "blocked"
  );
  const admins = users?.data?.filter(
    (user: IUser) => user.role === "admin" && user._id !== currentUser?._id
  );
  const blockedUsers = users?.data?.filter(
    (user: IUser) => user.status === "blocked"
  );

  const handleBlockActivate = async (user: IUser) => {
    try {
      setActiveUserForRoleChange(user._id); // Set active user for role change loading
      await updateUserByAdmin({
        userId: user._id,
        userInfo: { status: user.status === "active" ? "blocked" : "active" },
      });
      toast.success(`User status updated`);
    } catch (err: any) {
      toast.error(`Something went wrong...${err.data.message}`);
    } finally {
      setActiveUserForRoleChange(null); // Reset active user
    }
  };

  const handleRoleChange = async (user: IUser) => {
    try {
      setActiveUserForRoleChange(user._id); // Set active user for role change loading
      await updateUserByAdmin({
        userId: user._id,
        userInfo: { role: user.role === "user" ? "admin" : "user" },
      });
      toast.success(`User role updated`);
    } catch (err: any) {
      toast.error(`Something went wrong...${err.data.message}`);
    } finally {
      setActiveUserForRoleChange(null); // Reset active user
    }
  };

  return (
    <div className="p-4 max-h-screen overflow-y-scroll">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Customers</h2>
        {customers?.length === 0 ? (
          <div>No customers found</div>
        ) : (
          <div className="grid gap-4">
            {customers?.map((user: IUser) => (
              <div
                key={user._id}
                className="p-4 border rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p>{user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleBlockActivate(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : user.status === "active"
                      ? "Block"
                      : "Activate"}
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => handleRoleChange(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : "Make Admin"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Admins</h2>
        {admins?.length === 0 ? (
          <div>No admins found</div>
        ) : (
          <div className="grid gap-4">
            {admins?.map((user: IUser) => (
              <div
                key={user._id}
                className="p-4 border rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p>{user.email}</p>
                  <p>Status: {user.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleBlockActivate(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : user.status === "active"
                      ? "Block"
                      : "Activate"}
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                    onClick={() => handleRoleChange(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : "Make User"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Blocked Users</h2>
        {blockedUsers?.length === 0 ? (
          <div>No blocked users found</div>
        ) : (
          <div className="grid gap-4">
            {blockedUsers?.map((user: IUser) => (
              <div
                key={user._id}
                className="p-4 border rounded shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p>{user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleBlockActivate(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : "Activate"}
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => handleRoleChange(user)}
                    disabled={activeUserForRoleChange === user._id}
                  >
                    {activeUserForRoleChange === user._id
                      ? "Updating..."
                      : "Make Admin"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
