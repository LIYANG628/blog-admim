import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { ActionFunctionArgs, useActionData, useSubmit } from 'react-router';
import { useNavigation } from 'react-router';
import { updateUserPassword } from '@/api/user-api';
import { useForm } from 'antd/es/form/Form';

type Props = {

}


export default function UserPassword({ }: Props) {

  const pwdPattern = /^\S{6,15}$/
  const patternMsg = "Please provide 6-15 length";
  const submit = useSubmit();
  const navigation = useNavigation();
  const [formRef] = useForm();

  const actionData = useActionData() as { result: boolean } | null;
  if (actionData?.result) {
    formRef.resetFields();
  }

  const onFinish = (values: PasswordForm) => {
    submit(values, { method: 'PUT' })
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={formRef}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Current Password"
        name="old_pwd"
        rules={[
          { required: true, message: 'Please input your current password!' },
          { pattern: pwdPattern, message: patternMsg }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="new_pwd"
        validateFirst
        rules={[
          { required: true, message: 'Please input your new password!' },
          { pattern: pwdPattern, message: patternMsg }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Repeat Password"
        name="re_pwd"
        dependencies={['new_pwd']}
        validateFirst
        rules={[
          { required: true, message: 'Please repeat your password!' },
          { pattern: pwdPattern, message: patternMsg },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_pwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={navigation.state != 'idle' && { delay: 200 }}>
          Submit
        </Button>

        <Button type="default" style={{ marginLeft: 10 }} onClick={() => formRef.resetFields()}>
          Reset
        </Button>
      </Form.Item>

    </Form>
  )
}

export const updatePwdAction = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const res = await updateUserPassword(Object.fromEntries(fd) as PasswordForm);
  if (res.code == 1) return null;
  message.success("Update done, please relogin");
  return { result: true };;
}