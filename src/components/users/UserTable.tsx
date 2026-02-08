import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Tooltip, Input, Tag, Typography, Avatar } from "antd";
import { Edit2, Trash2, Search, Mail, Phone } from "lucide-react";
import type { User, UserSchema } from "@/types/user";

const { Text, Link } = Typography;

interface UserTableProps {
    users: User[];
    schema: UserSchema;
    loading: boolean;
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    schema,
    loading,
    onEdit,
    onDelete,
}) => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<User[]>(users);

    useEffect(() => {
        const lowercasedSearchText = searchText.toLowerCase();
        const filtered = users.filter(user =>
            Object.values(user).some(value =>
                String(value).toLowerCase().includes(lowercasedSearchText)
            )
        );
        setFilteredData(filtered);
    }, [searchText, users]);

    const dynamicColumns = schema.fields.map((field) => ({
        title: field.label,
        dataIndex: field.name,
        key: field.name,
        ellipsis: true,
        render: (text: string | number, record: User) => {
            if (field.name === "firstName") {
                return (
                    <Space>
                        <Avatar
                            size="small"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.firstName}`}
                            style={{ backgroundColor: '#f0f2f5' }}
                        />
                        <Text strong>{text}</Text>
                    </Space>
                );
            }
            if (field.type === "email") {
                return (
                    <Space>
                        <Link href={`mailto:${text}`} style={{ fontSize: 13 }}>{text}</Link>
                    </Space>
                );
            }
            if (field.name === "phone") {
                return (
                    <Space>
                        <Text type="secondary" style={{ fontSize: 13 }}>{text}</Text>
                    </Space>
                );
            }
            return <Text style={{ fontSize: 13 }}>{text}</Text>;
        },
    }));

    const columns = [
        ...dynamicColumns,
        {
            title: "Actions",
            key: "actions",
            fixed: "right" as const,
            width: 100,
            render: (_: unknown, record: User) => (
                <Space size="small">
                    <Tooltip title="Edit Profile">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<Edit2 size={16} color="var(--primary-color)" />}
                            onClick={() => onEdit(record)}
                            className="hover-effect"
                        />
                    </Tooltip>
                    <Tooltip title="Remove User">
                        <Popconfirm
                            title="Are you sure?"
                            description="This user will be permanently removed."
                            onConfirm={() => onDelete(record.id!)}
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                        >
                            <Button
                                type="text"
                                shape="circle"
                                danger
                                icon={<Trash2 size={16} />}
                                className="hover-effect"
                            />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="table-responsive">
            <div className="flex justify-between items-center mb-6 px-4">
                <Space size="middle" className="w-full">
                    <Input
                        placeholder="Search by name, email, or credentials..."
                        prefix={<Search size={18} style={{ color: '#bfbfbf', marginRight: 4 }} />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: 320,
                            height: 40,
                            borderRadius: 8,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                        allowClear
                    />
                    <Tag color="processing" style={{ borderRadius: 4, fontWeight: 500 }}>
                        {filteredData.length} Users Listed
                    </Tag>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,

                    showTotal: (total) => `Total ${total} system users`
                }}
                scroll={{ x: 'max-content' }}
                className="premium-table"
            />
        </div>
    );
};

export default UserTable;
