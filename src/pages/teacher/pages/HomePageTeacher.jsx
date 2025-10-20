import { Outlet } from "react-router";
import MenuTeacher from "../components/Menu";
import { Layout } from "antd";
import HeaderPageTeacher from "../components/HeaderPageTeacher";
import { useState } from "react";
import JoinClassroomModal from "../components/JoinClassroomModal";

const { Content } = Layout;

export default function HomePageTeacher() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MenuTeacher />

      <Layout>
        <HeaderPageTeacher setShowJoinModal={setShowJoinModal} />

        <Content style={{ background: "#fff" }}>
          <Outlet />
        </Content>
        <JoinClassroomModal
          show={showJoinModal}
          handleClose={() => setShowJoinModal(false)}
        />
      </Layout>
    </Layout>
  );
}
