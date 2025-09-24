import { Metadata } from 'next';

import CreateTaskForm from './form';

export const metadata: Metadata = {
  title: 'Create task'
};
const CreateTaskPage = () => {
  
  return (
    <>
      <h1 className='text-center text-white mb-[50]'>
        Create task
      </h1>
     <CreateTaskForm />
    </>
  );
};

export default CreateTaskPage;
