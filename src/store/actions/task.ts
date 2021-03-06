import { tasks_v1 } from 'googleapis';
import { Schema$Task } from '../../typings';
import { taskIds } from '../';

export enum TaskActionTypes {
  GET_ALL_TASKS = 'GET_ALL_TASKS',
  GET_ALL_TASKS_SUCCESS = 'GET_ALL_TASKS_SUCCESS',
  GET_ALL_TASKS_SILENT_SUCCESS = 'GET_ALL_TASKS_SILENT_SUCCESS',
  NEW_TASK = 'NEW_TASK',
  NEW_TASK_SUCCESS = 'NEW_TASK_SUCCESS',
  UPDATE_TASK = 'UPDATE_TASK',
  UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
  DELETE_COMPLETED_TASKS = 'DELETE_COMPLETED_TASKS',
  DELETE_COMPLETED_TASKS_SUCCESS = 'DELETE_COMPLETED_TASKS_SUCCESS',
  MOVE_TASKS = 'MOVE_TASKS',
  MOVE_TASKS_SUCCESS = 'MOVE_TASKS_SUCCESS',
  MOVE_TO_ANOHTER_LIST = 'MOVE_TO_ANOHTER_LIST',
  MOVE_TO_ANOHTER_LIST_SUCCESS = 'MOVE_TO_ANOHTER_LIST_SUCCESS',
  SET_FOCUSED = 'SET_FOCUSED'
}

type UUID = Schema$Task['uuid'];

export interface Payload$NewTask extends Pick<tasks_v1.Schema$Task, 'due'> {
  prevUUID?: UUID;
}

export interface Payload$DeleteTask extends Pick<Schema$Task, 'uuid'> {
  prevUUID?: UUID;
}

export interface Payload$MoveTask {
  prevUUID: UUID;
  uuid: UUID;
}

export type Payload$SortTasks = 'order' | 'date';

export interface Payload$MoveToAnotherList extends Schema$Task {
  tasklist: string;
}

export interface GetAllTasks {
  type: TaskActionTypes.GET_ALL_TASKS;
  payload: string;
}

export interface GetAllTasksSuccess {
  type: TaskActionTypes.GET_ALL_TASKS_SUCCESS;
  payload: tasks_v1.Schema$Task[];
}

export interface GetAllTasksSilentSuccess {
  type: TaskActionTypes.GET_ALL_TASKS_SILENT_SUCCESS;
  payload: tasks_v1.Schema$Task[];
}

export interface NewTask {
  type: TaskActionTypes.NEW_TASK;
  payload: Payload$NewTask & Pick<Schema$Task, 'uuid'>;
}

export interface NewTaskSuccess {
  type: TaskActionTypes.NEW_TASK_SUCCESS;
  payload: Schema$Task;
}

export interface UpdateTask {
  type: TaskActionTypes.UPDATE_TASK;
  payload: Schema$Task;
}

export interface UpdateTaskSuccess {
  type: TaskActionTypes.UPDATE_TASK_SUCCESS;
  payload: Schema$Task;
}

export interface DeleteTask {
  type: TaskActionTypes.DELETE_TASK;
  payload: Payload$DeleteTask;
}

export interface DeleteTaskSuccess {
  type: TaskActionTypes.DELETE_TASK_SUCCESS;
  payload: UUID;
}

export interface DeleteCompletedTasks {
  type: TaskActionTypes.DELETE_COMPLETED_TASKS;
}

export interface DeleteCompletedTasksSuccess {
  type: TaskActionTypes.DELETE_COMPLETED_TASKS_SUCCESS;
}

export interface MoveTask {
  type: TaskActionTypes.MOVE_TASKS;
  payload: Payload$MoveTask;
}

export interface MoveTaskSuccess {
  type: TaskActionTypes.MOVE_TASKS_SUCCESS;
  payload: tasks_v1.Schema$Task;
}

export interface MoveToAnotherList {
  type: TaskActionTypes.MOVE_TO_ANOHTER_LIST;
  payload: Payload$MoveToAnotherList;
}

export interface MoveToAnotherListSuccess {
  type: TaskActionTypes.MOVE_TO_ANOHTER_LIST_SUCCESS;
  payload?: Schema$Task;
}

export interface SetFocused {
  type: TaskActionTypes.SET_FOCUSED;
  payload: string | number | null;
}

export type TaskActions =
  | GetAllTasks
  | GetAllTasksSuccess
  | GetAllTasksSilentSuccess
  | NewTask
  | NewTaskSuccess
  | UpdateTask
  | UpdateTaskSuccess
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteCompletedTasks
  | DeleteCompletedTasksSuccess
  | MoveTask
  | MoveTaskSuccess
  | MoveToAnotherList
  | MoveToAnotherListSuccess
  | SetFocused;

export const getAllTasks = (payload: string): GetAllTasks => {
  return {
    type: TaskActionTypes.GET_ALL_TASKS,
    payload
  };
};

export const newTask = (payload?: Payload$NewTask): NewTask => {
  return {
    type: TaskActionTypes.NEW_TASK,
    payload: {
      ...payload,
      uuid: taskIds.next()
    }
  };
};

export const deleteTask = (payload: Payload$DeleteTask): DeleteTask => {
  return {
    type: TaskActionTypes.DELETE_TASK,
    payload
  };
};

export const moveTask = (payload: Payload$MoveTask): MoveTask => {
  return {
    type: TaskActionTypes.MOVE_TASKS,
    payload
  };
};

export const updateTask = (payload: Schema$Task): UpdateTask => {
  return {
    type: TaskActionTypes.UPDATE_TASK,
    payload
  };
};

export const deleteCompletedTasks = (): DeleteCompletedTasks => {
  return {
    type: TaskActionTypes.DELETE_COMPLETED_TASKS
  };
};

export const moveToAnotherList = (
  payload: Payload$MoveToAnotherList
): MoveToAnotherList => {
  return {
    type: TaskActionTypes.MOVE_TO_ANOHTER_LIST,
    payload
  };
};

export const setFocused = (payload: string | number | null): SetFocused => {
  return {
    type: TaskActionTypes.SET_FOCUSED,
    payload
  };
};

export const TaskActionCreators = {
  deleteTask,
  deleteCompletedTasks,
  getAllTasks,
  newTask,
  moveTask,
  moveToAnotherList,
  setFocused,
  updateTask
};
