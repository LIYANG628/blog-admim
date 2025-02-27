import React, { FC, PropsWithChildren, ReactNode } from 'react'
import styles from './css/auth-layout.module.less'
import useAppStore, { selectToken } from '@/store';
import { Navigate } from 'react-router';

type Props = {
    children?: ReactNode | undefined;
}

const AuthLayout: FC<PropsWithChildren> = ({ children }: Props) => {
    const token = useAppStore(selectToken);
    if (token) {
        return <Navigate to={'/'} replace />
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.boxTest}>{children}</div>
            </div>
        )
    }

}

export default AuthLayout;