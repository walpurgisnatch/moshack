'use client';

import { Button, Form, Input, Space, message } from 'antd';

import { CreateTask } from '@/actions/task';
import { Panel } from '@/shared/ui';

interface IFormData {
  name: string;
  description: string;
  requiredLevel: number;
  experience: number;
  coins: number;
}

const CreateTaskForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (formData: IFormData) => {
    try {
      await CreateTask(formData);
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  return (
    <Panel>
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
          <Form.Item label='name' name='name'>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item label='description' name='description'>
            <Input placeholder='description' />
          </Form.Item>
          <Form.Item
            label='required level'
            name='requiredLevel'
          >
            <Input placeholder='requiredLevel' />
          </Form.Item>
          <Form.Item label='experience' name='experience'>
            <Input placeholder='experience' />
          </Form.Item>
          <Form.Item label='coins' name='coins'>
            <Input placeholder='coins' />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Space>
      </Form>
    </Panel>
  );
};

export default CreateTaskForm;
