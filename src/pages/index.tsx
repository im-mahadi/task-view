import useTask from '@/hooks/useTask';
import extractText from '@/util/extract-text';
import { useState } from 'react';
import Card from '@/components/Card';
import Head from 'next/head';

export default function Home() {
  const [newTask, setNewTask] = useState<string>('');
  const { tasks, addTask, removeTask, updateTask } = useTask();

  /**
   * Handle enter press on input field to add new task to
   * tasks array and clear input field
   * @param e KeyboardEvent from input field
   */
  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const [title, description] = extractText(newTask);

      addTask({
        id: title + Math.random().toString(36).slice(2, 9),
        title,
        description,
        createdAt: new Date().getDate().toString(),
        completePercentage: 0,
        isPinned: false,
      });

      setNewTask('');
    }
  };

  return (
    <div className='h-screen w-screen overflow-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>Task Viewer</title>
        <meta name='description' content='view task and track the progress' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/task.ico' />
      </Head>
      <div className='mt-4 flex flex-col justify-center md:mt-8 lg:mt-10'>
        <input
          type='text'
          value={newTask}
          placeholder='Enter Task Here'
          className='input mx-auto w-11/12 lg:w-5/6 xl:w-4/6'
          onChange={(e) => setNewTask(e.currentTarget.value)}
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <div className='mx-auto mt-8 grid w-11/12 grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4'>
          {tasks.map((task) => (
            <div key={task.id}>
              <Card
                task={task}
                removeTask={removeTask}
                updateTask={updateTask}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
