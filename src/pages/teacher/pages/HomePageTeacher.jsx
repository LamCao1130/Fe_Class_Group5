import { Outlet } from "react-router";
import MenuTeacher from "../components/Menu";
import { Layout, Button, Menu } from "antd";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function HomePageTeacher() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <MenuTeacher collapsed={collapsed} />

        <Layout>
          <Content style={{ padding: 24, background: "#fff" }}>
            <Outlet /> {/* 👈 phần render nội dung con ở đây */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
