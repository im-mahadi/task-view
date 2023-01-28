import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.body.title;
  const description = req.body.description;
  const reset: boolean = req.body.reset;

  if (req.method === 'POST') {
    createTask(title, description)
      .then(async (task) => {
        res.status(200).json(task);
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })
  }

  if (req.method === 'GET') {
    getTasks()
      .then(async (tasks) => {
        res.status(200).json(tasks);
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })
  }
  if (req.method === 'PUT') {
    updateTask(req.body.id, reset)
      .then(async (task) => {
        res.status(200).json(task);
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })
  }
  if (req.method === 'DELETE') {
    deleteTask(req.body.id)
      .then(async (task) => {
        res.status(200).json(task);
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })
  }
}

async function createTask(title: string, description: string) {
  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      createdAt: new Date(),
      completePercentage: 0
    },
  });

  return task;
}

async function getTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

async function updateTask(id: number, reset: boolean) {
  let task;
  if (reset) {
    task = await prisma.task.update({
      where: { id: id },
      data: { completePercentage: 0 },
    });
  }

  task = await prisma.task.update({
    where: { id: id },
    data: { completePercentage: { increment: 25 } },
  });

  return task;
}

async function deleteTask(id: number) {
  const task = await prisma.task.delete({
    where: { id: id },
  });
  return task;
}