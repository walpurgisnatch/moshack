import { Metadata } from 'next';

import SignInForm from '@/components/forms/sing-in/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In Page'
};

const LoginPage = () => (
  <>
    <h1 className='text-center text-white mb-[50]'>
      Авторизация
    </h1>
    <SignInForm />
  </>
);

export default LoginPage;
