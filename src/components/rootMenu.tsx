import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';

type Props = {
    menu: MenuItem[]
}

export default function RootMenu({ menu }: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey = location.pathname == '/' ? '/home' : location.pathname;

    // use Recursion to check the parent menu of a child menu
    const getParentKey = (menus: MenuItem[], selectedKey: string, parentKey: string = ""): string => {
        for (const menuItem of menus) {
            if (menuItem.key == selectedKey) return parentKey;
            if (menuItem.children) {
                const result = getParentKey(menuItem.children, selectedKey, menuItem.key)
                if (result) {
                    return result;
                }
            }
        }
        return '';
    }
    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([getParentKey(menu, selectedKey)]);

    const onOpenChange = (openKeys: string[]) => {
        if (openKeys.length == 0) {
            setStateOpenKeys([]);
        } else if (openKeys.length == 2) {
            setStateOpenKeys([openKeys[1]])
        } else {
            setStateOpenKeys(openKeys)
        }
    }

    const onMenuClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key);
    }

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            items={menu}
            onClick={onMenuClick}
        />
    )
}
