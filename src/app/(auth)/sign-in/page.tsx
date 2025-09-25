import { Metadata } from 'next';

import SignInForm from './SignInForm';

import styles from '../Auth.module.scss';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In Page'
};

const LoginPage = () => (
  <>
    <h1 className={styles.title}>Войти в аккаунт</h1>
    <SignInForm />
    <div className={styles.hintWrapper}>
      <span className={styles.hintText}>
        У вас нету аккаунт?{' '}
        <Link className={styles.link} href='/register'>
          Зарегистрироваться
        </Link>
      </span>
    </div>
  </>
);

export default LoginPage;
