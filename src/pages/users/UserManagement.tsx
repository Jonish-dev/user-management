import React, { useState, useEffect, useCallback } from "react";
import { Typography, Button, Modal, message, Card, Space, Divider } from "antd";
import { Plus, Users, UserPlus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import DynamicForm from "@/components/common/DynamicForm";
import { userService } from "@/services/api";
import { userSchema } from "@/schemas/userSchema";
import type { User, UserFormData } from "@/types/user";

const { Title, Text } = Typography;

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            message.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = () => {
        setEditingUser(null);
        setModalVisible(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setModalVisible(true);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await userService.delete(id);
            message.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            message.error("Failed to delete user");
        }
    };

    const handleFormFinish = async (values: UserFormData) => {
        setFormLoading(true);
        try {
            if (editingUser) {
                await userService.update(editingUser.id!, values);
                message.success("User updated successfully");
            } else {
                await userService.create(values);
                message.success("User created successfully");
            }
            setModalVisible(false);
            fetchUsers();
        } catch (error) {
            message.error("Operation failed");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">

            <div className="page-header flex justify-between items-end">
                <div>

                    <Title level={2} style={{ margin: 0 }}>System Users</Title>
                    <Text type="secondary">Manage your system members, their roles and access levels.</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<Plus size={20} style={{ marginRight: 8 }} />}
                    onClick={handleAddUser}
                    className="flex items-center"
                    style={{ height: 48, padding: '0 24px', borderRadius: 10, fontWeight: 600 }}
                >
                    Add New User
                </Button>
            </div>


            <Card className="premium-card">
                <UserTable
                    users={users}
                    schema={userSchema}
                    loading={loading}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />
            </Card>

            <Modal
                title={
                    <div style={{ padding: '8px 0' }}>
                        <Space size="middle">
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: 'var(--primary-gradient)',
                                    borderRadius: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {editingUser ? <Users size={20} color="#fff" /> : <UserPlus size={20} color="#fff" />}
                            </div>
                            <div>
                                <Title level={4} style={{ margin: 0 }}>
                                    {editingUser ? "Edit Profile Settings" : "Registration Form"}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {editingUser ? `Updating details for ${editingUser.firstName}` : "Create a new user account below."}
                                </Text>
                            </div>
                        </Space>
                        <Divider style={{ margin: '16px 0 0' }} />
                    </div>
                }
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                destroyOnClose
                footer={null}
                width={680}
                centered
                style={{ top: 20 }}
            >
                <div style={{ padding: '0 8px' }}>
                    <DynamicForm
                        schema={userSchema}
                        initialValues={editingUser}
                        onFinish={handleFormFinish}
                        onCancel={() => setModalVisible(false)}
                        loading={formLoading}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
