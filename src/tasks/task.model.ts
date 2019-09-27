export type Status = 'open' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}
