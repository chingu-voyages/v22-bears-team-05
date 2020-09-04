export type Goal = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
  tasks: Task[];
};

export type Task = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
  subtasks: Subtask[];
};

export type Subtask = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
};
