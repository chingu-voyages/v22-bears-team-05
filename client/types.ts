export type Goal = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
  tags: string[];
  tasks: Task[];
};

export type Task = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
  tags: string[];
  subtasks: Subtask[];
};

export type Subtask = {
  _id: string;
  name: string;
  description: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
  timeStarted?: number;
  tags: string[];
};
