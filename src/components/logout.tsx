import { Button, Popconfirm } from 'antd'
import { resetAllStore } from '../store/resetter';
import { useNavigate } from 'react-router';
type Props = {}

export default function Logout({ }: Props) {
    const navigate = useNavigate();
    const confirm = () => {
        resetAllStore();
        navigate('/login')
    };

    return (
        <Popconfirm
            title="Lougout"
            description="Are you sure to logout?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No">
            <Button type={'link'}>Logout</Button>
        </Popconfirm>
    )
}