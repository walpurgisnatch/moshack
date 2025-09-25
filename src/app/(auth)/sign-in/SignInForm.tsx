'use client';

import { Button, Form, Input, Space, message } from 'antd';
import { IFormData } from '@/shared/types';
import { signInWithCredentials } from '@/actions/sign-in';
import { useSession } from 'next-auth/react';

import styles from '../Auth.module.scss';

const SignInForm = () => {
  const { update } = useSession();

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

      await update();
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error('Введённые данные не верны');
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
          <Button
            block
            type='primary'
            htmlType='submit'
            className={styles.button}
          >
            Войти
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default SignInForm;
