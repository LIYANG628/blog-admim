import useAppStore, { selectToken } from '@/store'
import { message } from 'antd';
import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router';


const AuthRoot: FC<PropsWithChildren> = ({ children }) => {
    const token = useAppStore(selectToken);
    if (token)
        return <div>{children}</div>
    else {
        message.info("Please login");
        return <Navigate to={'/login'} replace />
    }
}

export default AuthRoot;