import { Task } from '@/interfaces/Task';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { Courgette } from '@next/font/google';

const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
});

export default function Card({
  task,
  removeTask,
  updateTask,
}: {
  task: Task;
  removeTask: (id: string) => void;
  updateTask: (id: string, completePercentage: number) => void;
}) {
  const [color, setColor] = useState('radial-progress text-error');

  /**
   * Set color of radial progress bar based on
   * completePercentage value of task object
   */
  useEffect(() => {
    if (task.completePercentage === 100) {
      setColor('radial-progress text-success');
    } else if (task.completePercentage === 75) {
      setColor('radial-progress text-primary');
    } else if (task.completePercentage === 50) {
      setColor('radial-progress text-secondary');
    } else if (task.completePercentage === 25) {
      setColor('radial-progress text-warning');
    } else if (task.completePercentage === 0) {
      setColor('radial-progress text-error');
    }
  }, [task.completePercentage]);

  return (
    <div className='card h-56 bg-base-100 shadow-2xl'>
      <div className='card-body relative'>
        <span className={courgette.className}>
          <p className='absolute -top-1 -left-5 -rotate-45 rounded-md bg-orange-200 p-1 text-4xl font-bold text-pink-600 shadow-lg'>
            {task.createdAt}th
          </p>
        </span>
        <p className='card-title'>{task.title}</p>
        <p>{task.description}</p>
        <div className='card-actions mt-5 justify-end'>
          {task.completePercentage > 100 ? (
            <div className='mt-8 flex gap-2'>
              <button
                onClick={() => removeTask(task.id)}
                className='btn-warning btn'
              >
                <AiFillDelete size={24} />
              </button>
              <button
                className='btn-secondary btn'
                onClick={() => {
                  updateTask(task.id, 0);
                }}
              >
                <BiReset size={24} />
              </button>
            </div>
          ) : (
            <button
              className={color}
              // @ts-ignore
              style={{ '--value': task.completePercentage }}
              onClick={() => {
                updateTask(task.id, task.completePercentage + 25);
              }}
            >
              <span className='font-bold'>{task.completePercentage}%</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
