import { Metadata } from 'next';
import RegistrationForm from '@/components/forms/registration/RegistrationForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register Page'
};

const RegisterPage = () => (
  <>
    <h1 className='text-center text-white mb-[50]'>
      Регистрация
    </h1>
    <RegistrationForm />
  </>
);

export default RegisterPage;
