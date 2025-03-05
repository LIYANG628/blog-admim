import { Button, Form, Input, message } from 'antd';
import useUserStore, { selectUserInfo } from '@/store/user-store';
import { useForm } from 'antd/es/form/Form';
import { ActionFunctionArgs, useActionData, useNavigation, useSubmit } from 'react-router';
import { updateUserInfo } from '@/api/user-api';

type Props = {}


export default function UserInfo({ }: Props) {
  const initUserInfo = useUserStore(selectUserInfo);
  const [formRef] = useForm();
  const submit = useSubmit();
  const navigation = useNavigation();

  const onFinish = (values: UserInfoForm) => {
    submit(values, { method: 'PATCH', })
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initUserInfo}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={formRef}
    >
      <Form.Item
        label="Id"
        name="id"
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item
        label="User Name"
        name="nickname"
        rules={[{ required: true, message: 'Please input your username!' }, { pattern: /^\S{1,10}$/, message: 'Must be 1-10' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="User Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="link" onClick={() => formRef.setFieldsValue(initUserInfo)}>
          Reset
        </Button>
        <Button type="primary" htmlType="submit" loading={navigation.state !== 'idle' && { delay: 100 }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export const editUserAction = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const res = await updateUserInfo(Object.fromEntries(fd));
  if (res.code == 1) return null;
  message.success("Update done")
  return null;
}