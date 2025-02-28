import { Breadcrumb } from 'antd'
import { useMemo } from 'react'
import { useLoaderData, useLocation } from 'react-router'

type Props = {}

type BreadcrumbItem = {
    title: string
}

export default function RootBreadcrumb({ }: Props) {
    const data = useLoaderData() as { menus: MenuItem[] } | null;
    const currPathName = useLocation().pathname;
    const currentPath = currPathName == '/' ? '/home' : currPathName;

    const items = useMemo(() => {
        return resolveBreadcrumb(data, currentPath)
    }, [data, currPathName]);
    return (
        <Breadcrumb
            items={items}
        />
    )
}

const resolveBreadcrumb = (menus: MenuItem[] | undefined, currentPath: string, fullBreadcrumb: BreadcrumbItem[] = []): BreadcrumbItem[] | undefined => {
    if (!menus) return;
    for (const item of menus) {
        if (item.key == currentPath) {
            fullBreadcrumb.unshift({ title: item.label })
            return fullBreadcrumb;
        }
        if (item.children) {
            const result = resolveBreadcrumb(item.children, currentPath, fullBreadcrumb);
            if (result) {
                fullBreadcrumb.unshift({ title: item.label })
                return fullBreadcrumb;
            }
        }
    }
}