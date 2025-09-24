'use client';

import { Button, Form, Input, Space, message } from 'antd';
import { IFormData } from '@/shared/types';
import { signInWithCredentials } from '@/actions/sign-in';

import '../index.scss';

const SignInForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (
    formData: Pick<IFormData, 'email' | 'password'>
  ) => {
    try {
      await signInWithCredentials(
        formData.email,
        formData.password
      );
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      } else {
        messageApi.error('Произошла ошибка авторизации');
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout='vertical'
        name='user-signin'
        onFinish={onFinish}
      >
        <Space
          size='small'
          direction='vertical'
          className='w-full'
        >
          <Form.Item
            label='Почта'
            name='email'
            rules={[
              { required: true, message: 'Введите почту' },
              {
                type: 'email',
                message: 'Введите корректную почту'
              }
            ]}
          >
            <Input placeholder='Введите почту' />
          </Form.Item>
          <Form.Item
            colon
            label='Пароль'
            name='password'
            rules={[
              { required: true, message: 'Введите пароль' },
              {
                min: 6,
                message:
                  'Пароль не может быть менее 6 символов'
              }
            ]}
          >
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default SignInForm;
