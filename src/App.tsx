import { ConfigProvider } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import UserManagement from "@/pages/users/UserManagement";
import "@/styles/App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            bodyBg: "#f0f2f5",
            siderBg: "#001529",
          },
          Menu: {
            darkItemSelectedBg: "#1677ff",
          },
          Card: {
            borderRadiusLG: 12,
          }
        },
      }}
    >
      <MainLayout>
        <UserManagement />
      </MainLayout>
    </ConfigProvider>
  );
}

export default App;
