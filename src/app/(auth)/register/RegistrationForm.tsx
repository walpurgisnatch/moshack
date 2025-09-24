'use client';

import { useState } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { redirect } from 'next/navigation';
import { registerUser } from '@/actions/register';
import { IFormData } from '@/shared/types';

import '../index.scss';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (formData: IFormData) => {
    setLoading(true);
    try {
      await registerUser(formData);
      messageApi.success('Вы успешно зарегистрировались');
      setTimeout(() => {
        redirect('/sign-in');
      }, 100);
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      } else {
        messageApi.error(
          'Произошла ошибка при регистрации'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout='vertical'
        name='user-register'
        onFinish={onFinish}
      >
        <Space
          size='small'
          direction='vertical'
          className='w-full'
        >
          <Form.Item
            label='Имя пользователя'
            name='username'
            className='mb-8'
            rules={[
              {
                required: true,
                message: 'Введите имя пользователя'
              },
              {
                min: 2,
                message:
                  'Имя пользователя должен быть не менее 2 символов'
              }
            ]}
          >
            <Input placeholder='Введите имя пользователя' />
          </Form.Item>
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
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Зарегистрироваться
          </Button>{' '}
        </Space>
      </Form>
    </>
  );
};

export default RegistrationForm;
