import Link from 'next/link';
import { Metadata } from 'next';

import styles from './Page.module.scss';

export const metadata: Metadata = {
  title: 'Welcome'
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Приветствую, Искатель!
      </h1>
      <p className={styles.subtitle}>
        Твой путь к офферу начинается здесь.
      </p>
      <Link href='/register' className={styles.link}>
        Начать приключение
      </Link>
    </div>
  );
}
