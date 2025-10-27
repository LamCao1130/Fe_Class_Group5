import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu, Layout } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import teacherService from "../services/TeacherSerivceApi";
import { jwtDecode } from "jwt-decode";

const { Sider } = Layout;

const MenuTeacher = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [listClass, setListClass] = useState([]);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  let token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  useEffect(() => {
    console.log(decoded.accountId);
    let callList = async () => {
      let res = await teacherService.getListClassRoomByTeacherId(
        decoded.accountId
      );
      console.log(res);
      let listNew = res?.data.map((p) => {
        return {
          key: p.id,
          label: <Link to={"/teacher/manageClass/" + p.id}>{p.name}</Link>,
        };
      });
      setListClass(listNew);
    };
    callList();
  }, []);
  const items = [
    {
      key: "m1",
      icon: <PieChartOutlined />,
      label: <Link to="/teacher">Dashboard</Link>,
    },
    {
      key: "m2",
      icon: <DesktopOutlined />,
      label: "Quản lý lớp học",
      children: listClass,
    },
    {
      key: "sub1",
      label: "Quản lý học sinh ",
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];
  console.log(listClass);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={256}
      theme="light"
      style={{ height: "100vh" }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </Sider>
  );
};
export default MenuTeacher;
