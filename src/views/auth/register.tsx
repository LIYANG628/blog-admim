import { FC } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, redirect, useNavigation } from 'react-router';
import { RegisterAPI } from '@/api/auth-api';
import { ActionFunctionArgs } from 'react-router';
import { useSubmit } from 'react-router-dom';
import to from 'await-to-js';

type Props = {}


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

// define action, connect with router config
export const action = async ({ request }: ActionFunctionArgs) => {
    const fd = await request.formData();
    const data = Object.fromEntries(fd) as RegForm;
    const [err, res] = await to(RegisterAPI(data));
    if (err) return;

    message.success(res?.message);
    return redirect('/login?username=' + fd.get('username'));
}

const Register: FC = ({ }: Props) => {
    const submit = useSubmit();
    const navigation = useNavigation();

    const onFinish = (values: RegForm) => {
        submit(values, {
            action: '/register',
            method: 'POST'
        })
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' },
                { pattern: /^[a-zA-X0-8]{1,10}$/, message: "please provide valid name" }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },
                { pattern: /^\S{1,6}$/, message: "please provide valid password" }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Retype Password"
                name="repassword"
                dependencies={['password']}
                validateFirst
                rules={[{ required: true, message: 'Please re-input your password!' },
                { pattern: /^\S{1,6}$/, message: "please provide valid password" },
                ({ getFieldValue }) => ({
                    validator(rule, value, callback) {
                        if (value == getFieldValue('password')) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject("Password not equal");
                        }
                    }
                })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={navigation.state != 'idle' && { delay: 5 }}>
                    Register
                </Button>
                <div> Or <Link to={'/login'}>Login</Link> now</div>
            </Form.Item>

        </Form>
    )
}

export default Register;