import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, theme } from 'antd';
import useAppStore, { selectCollapsed, switchCollapsed } from '@/store';
import styles from './header.module.less';
import Logout from './logout';
import useUserStore, { selectAvatar, selectName } from '@/store/user-store';
import RootBreadcrumb from './rootBread';

const { Header } = Layout;

type Props = {

}

export default function RootHeader({ }: Props) {
    const collapsed = useAppStore(selectCollapsed);
    const username = useUserStore(selectName);
    const avatar = useUserStore(selectAvatar);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header className={styles.container}>
            <div style={{ display: 'flex' }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => switchCollapsed()}
                    className={styles.btnCollapsed}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Welcome {username}, current location:  .</span>
                    <span><RootBreadcrumb /></span>
                </div>
            </div>
            <div>
                {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
                <Logout />
            </div>
        </Header>
    )
}