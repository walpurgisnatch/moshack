import { Metadata } from 'next';

import TaskCard from '@/components/taskCard';

export const metadata: Metadata = {
  title: 'Tasks'
};

const TasksPage = async () => {
  const res = await fetch('http://localhost:3000/api/tasks', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Ошибка загрузки задач');
  }

  const tasks = await res.json();

  return (
    <>
      <h1 className='text-center text-white mb-[50]'>
        Available tasks
      </h1>
      {tasks.map((task) => (
        <TaskCard
          name={task.name}
          description={task.description}
        />
      ))}
    </>
  );
};

export default TasksPage;
