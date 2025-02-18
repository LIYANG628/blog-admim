import { LoginAPI } from '@/api/auth-api';
import { setToken } from '@/store';
import { Button, Checkbox, Form, Input, message } from 'antd';
import to from 'await-to-js';
import { ActionFunctionArgs, Link, redirect, useFetcher, useSearchParams } from 'react-router';

type Props = {}

export default function Login({ }: Props) {

  const [params, _] = useSearchParams();
  const username = params.get('username') ?? '';
  const fetcher = useFetcher();

  const onFinish = (values: LoginForm) => {
    fetcher.submit(values, {
      method: 'POST'
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ username }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' },
        {
          pattern: /^[a-zA-Z0-9]{1,10}$/,
          message: "Please provide value username"
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }, {
          pattern: /^[a-zA-Z0-9]{1,6}$/,
          message: "Please provide value password"
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={fetcher.state !== 'idle' && { delay: 200 }}>
          Login
        </Button>
        <Link to={'/register'}>  or Register</Link>
      </Form.Item>
    </Form>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const loginData = Object.fromEntries(fd) as LoginForm;
  const [err, res] = await to(LoginAPI(loginData));
  if (err) return;

  message.success(res?.message);
  setToken(res.token);
  return redirect('/');
}