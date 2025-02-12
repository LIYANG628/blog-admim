import React, { FC, PropsWithChildren, ReactNode } from 'react'
import styles from './css/auth-layout.module.less'

type Props = {
    children?: ReactNode | undefined;
}

const AuthLayout: FC<PropsWithChildren> = ({ children }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.boxTest}>{children}</div>
        </div>
    )
}

export default AuthLayout;