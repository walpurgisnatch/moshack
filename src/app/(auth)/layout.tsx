import { ReactNode } from 'react';

const AuthLayout = ({
  children
}: {
  children: ReactNode;
}) => (
  <div className='h-screen flex flex-col justify-center items-center px-[20]'>
    <div className='max-w-[400] w-full text-4xl'>
      {children}
    </div>
  </div>
);
export default AuthLayout;
