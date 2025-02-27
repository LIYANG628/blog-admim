import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  FileAddOutlined,
  FileTextOutlined,
  HomeOutlined,
  KeyOutlined,
  PictureOutlined,
  ProfileOutlined,
  ReadOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styles from './css/root.module.less'
import { Footer } from 'antd/es/layout/layout';
import logo from '../../assets/react.svg'
import RootHeader from '@/components/header';
import useAppStore, { selectCollapsed } from '@/store';
import { initUser } from '@/store/user-store';
import { getLeftMenus } from '@/api/user-api';
import { Outlet, useLoaderData } from 'react-router';
import RootMenu from '@/components/rootMenu';
const { Sider, Content } = Layout;

const iconMap = {
  HomeOutlined: <HomeOutlined />,
  ReadOutlined: <ReadOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  FileAddOutlined: <FileAddOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  SolutionOutlined: <SolutionOutlined />,
  PictureOutlined: <PictureOutlined />,
  KeyOutlined: <KeyOutlined />,
  UserOutlined: <UserOutlined />

}

const resolveMenuIcons = (menus: MenuItem[]) => {
  for (const item of menus) {
    const iconName = item.icon as keyof typeof iconMap;
    item.icon = iconMap[iconName];
    if (item.children) {
      resolveMenuIcons(item.children);
    }
  }
}

const Root: React.FC = () => {
  const collapsed = useAppStore(selectCollapsed);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menus = useLoaderData() as MenuItem[];
  if (!menus) return;
  resolveMenuIcons(menus);

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logoBox} >
          <img src={logo} className={styles.logo} />
          {!collapsed && <span className={styles.logoText}>Blog Admin</span>}
        </div>
        <RootMenu menu={menus} />
      </Sider>
      <Layout>
        <RootHeader />
        <Content
          style={{
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className={styles.content}
        >
          <Outlet/>
        </Content>
        <Footer className={styles.footer}>@1991-2024 Yang</Footer>
      </Layout>
    </Layout>
  );
};

// excute before route render
export const rootLoader = async () => {
  initUser();
  //get menus
  const menus = await getLeftMenus();
  return menus.data;
}

export default Root;