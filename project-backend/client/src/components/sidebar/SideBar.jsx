import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function getItem(label, key, icon, to, children, type) {
  return {
    key,
    icon,
    children,
    label,
    to,
    type,
  };
}

const items = [
  getItem("Trang chủ", "sub1", null, "/"),
  getItem("Sản Phẩm", "sub2", <AppstoreOutlined />, null, [
    getItem("Thẻ game", "1", null),
    getItem("Tài khoản game", "2", null),
    getItem("Nạp game", "3", null),
    getItem("Xác minh tài khoản game", "4", null),
  ]),
  getItem("Liên kết", "sub3", null, null, [
    getItem("Facebook", "5"),
    getItem("Zalo", "6"),
  ]),
  {
    type: "divider",
  },
];

const SideBar = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      {items.map((item) => {
        if (item.type === "divider") {
          return <Menu.Divider key={item.key} />;
        }

        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  {child.to ? (
                    <Link to={child.to}>{child.label}</Link>
                  ) : (
                    child.label
                  )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default SideBar;
