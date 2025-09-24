'use server';

import Task, { ITask } from "@/models/Task";

export async function CreateTask({
  name,
  description,
  requiredLevel,
  experience,
  coins,
}: ITask
) {
  try {
    const task = await Task.insertOne({
      name,
      description,
      requiredLevel,
      experience,
      coins
    })

    return task;
  } catch (err) {
    console.error('Ошибка', err);
    throw err;
  }
}

