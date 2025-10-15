import { Outlet } from "react-router";
import MenuTeacher from "../components/Menu";
import { Layout, Button, Menu } from "antd";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function HomePageTeacher() {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <MenuTeacher />

        <Layout>
          <Content style={{ padding: 24, background: "#fff" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
