import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <main
        style={{
          marginLeft: "220px",
          marginTop: "120px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout
