import { Metadata } from 'next';
import RegistrationForm from './RegistrationForm';

import styles from '../Auth.module.scss';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register Page'
};

const RegisterPage = () => (
  <>
    <h1 className={styles.title}>Регистрация</h1>
    <RegistrationForm />
    <div className={styles.hintWrapper}>
      <span className={styles.hintText}>
        У вас есть аккаунт?{' '}
        <Link className={styles.link} href='/sign-in'>
          Войти
        </Link>
      </span>
    </div>
  </>
);

export default RegisterPage;
