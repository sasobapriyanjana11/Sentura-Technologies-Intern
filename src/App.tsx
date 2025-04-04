import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./components/ui/Button.tsx";
import Input from "./components/ui/Input.tsx";
import Table from "./components/ui/Table.tsx"

const API_BASE_URL = "https://weavy-cloud.weavy.io/api/users";
const API_KEY = "Bearer generated_key";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ uid: "", name: "" });
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_BASE_URL, {
                headers: { Authorization: API_KEY },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const createUser = async () => {
        try {
            await axios.post(API_BASE_URL, newUser, {
                headers: { Authorization: API_KEY, "Content-Type": "application/json" },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const updateUser = async (uid, name) => {
        try {
            await axios.put(`${API_BASE_URL}/${uid}`, { name }, {
                headers: { Authorization: API_KEY, "Content-Type": "application/json" },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUser = async (uid) => {
        try {
            await axios.delete(`${API_BASE_URL}/${uid}`, {
                headers: { Authorization: API_KEY },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">User Management</h1>
            <div className="my-4">
                <Input
                    placeholder="User ID"
                    value={newUser.uid}
                    onChange={(e) => setNewUser({ ...newUser, uid: e.target.value })}
                />
                <Input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Button onClick={createUser}>Create User</Button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.uid}>
                        <td>{user.uid}</td>
                        <td>{user.name}</td>
                        <td>
                            <Button onClick={() => updateUser(user.uid, "Updated Name")}>Edit</Button>
                            <Button onClick={() => deleteUser(user.uid)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersPage;
