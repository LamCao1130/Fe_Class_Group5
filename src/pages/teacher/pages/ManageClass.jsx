import { Layout } from "antd";
import ManageClassNaBar from "../components/ManageClassNabar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";

export default function ManageClass() {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <ManageClassNaBar></ManageClassNaBar>
        <Content style={{ background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>{" "}
    </>
  );
}
