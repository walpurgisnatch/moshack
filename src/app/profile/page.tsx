import { Metadata } from 'next';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Tasks'
};

const TasksPage = async () => {
  const res = await fetch(
    'http://localhost:3000/api/profile',
    {
      cache: 'no-store'
    }
  );

  if (!res.ok) {
    throw new Error('Ошибка загрузки задач');
  }

  const tasks = await res.json();

  return (
    <>
      <h1 className='text-center text-white mb-[50]'>
        Available tasks
      </h1>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            name={task.name}
            description={task.description}
          />
        ))}
      </div>
    </>
  );
};

export default TasksPage;
