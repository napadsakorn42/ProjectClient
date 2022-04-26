import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import config from "../config/config";
import axios from "axios";

export default function MainLayout({ children }) {
  const { Header, Content } = Layout;
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logout = async () => {
    await axios.get(`${config.URL}/logout`, {
      withCredentials: true,
    });
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Header
        style={{
          background: "#fff",
          margin: 0,
          padding: "0 1.5rem",
          borderBottom: "thin solid #d1d1d1",
        }}
      >
        <MenuOutlined style={{ fontSize: "1.5rem" }} onClick={showDrawer} />
      </Header>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: "fixed" }}
      >
        <Menu>
          <Menu.Item
            key="1"
            onClick={() => {
              setVisible(false);
              router.push("/");
            }}
          >
            Account
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              setVisible(false);
              router.push("/register");
            }}
          >
            Register
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              setVisible(false);
              router.push("/login");
            }}
          >
            Login
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              setVisible(false);
              router.push("/profile");
            }}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="5"
            onClick={() => {
              setVisible(false);
              router.push("/getConfig");
            }}
          >
            Config
          </Menu.Item>
          <Menu.Item key="6" onClick={() => logout()}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
      <Content style={{ padding: "2.5rem", background: "#fff" }}>
        {children}
      </Content>
    </Layout>
  );
}
