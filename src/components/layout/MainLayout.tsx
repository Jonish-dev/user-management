import React, { type ReactNode } from "react";
import { Layout, Menu, Typography, Avatar, Space, Badge } from "antd";
import {
    Users,
    LayoutDashboard,
    Settings,
    UserCircle,
    Bell
} from "lucide-react";

const { Header, Content, Sider, Footer } = Layout;
const { Title, Text } = Typography;

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const menuItems = [
     
        {
            key: "users",
            icon: <Users size={18} />,
            label: "User Management",
        },
    
    ];

    return (
        <Layout className="layout-container">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={260}
                className="animate-fade-in"
            >
                <div className="sider-logo">
                    <Space>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                background: 'var(--primary-gradient)',
                                borderRadius: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Users size={18} color="#fff" />
                        </div>
                        <span className="logo-text">URM</span>
                    </Space>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["users"]}
                    items={menuItems}
                    style={{ padding: '8px' }}
                />
            </Sider>

            <Layout>
                <Header className="main-header">
                    <div className="flex items-center">
                        <Title level={4} style={{ margin: 0 }}>User Management</Title>
                    </div>
                    <Space size="large">
                  
                        <Space style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }} className="hover-effect">
                            <Avatar icon={<UserCircle size={24} />} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                            <div className="flex flex-col" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text strong style={{ fontSize: 13, lineHeight: 1.2 }}>Senior Admin</Text>
                                <Text type="secondary" style={{ fontSize: 11 }}>Administrator</Text>
                            </div>
                        </Space>
                    </Space>
                </Header>

                <Content className="content-wrapper">
                    {children}
                </Content>

                <Footer style={{ textAlign: "center", color: 'var(--text-secondary)' }}>
                    User Management System ©{new Date().getFullYear()} Created by Senior Frontend Engineer
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
