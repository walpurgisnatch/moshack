import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

const AuthLayout = ({
  children
}: {
  children: ReactNode;
}) => (
  <div className='h-screen flex flex-col justify-center items-center px-[20]'>
    <div className='max-w-[400] w-full text-4xl'>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: `var(--color-text)`
            },
            Input: {
              paddingBlock: 10
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  </div>
);
export default AuthLayout;
