import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
import { TaskListActions, TaskListActionTypes } from '../actions/taskList';
import { PATHS } from '../../constants';
import { lastVisit, createLocalStorage } from '../../storage';
import { Schema$TaskList } from '../../typings';
import { remove } from '../../utils/array';

export interface TaskListState {
  byIds: { [id: string]: Schema$TaskList };
  ids: string[];
  id?: string;
  sortByDate: boolean;
  creatingNewTaskList: boolean;
}

const sortByDateIds = createLocalStorage<string[]>(
  'SORT_BY_DATE_TASKS_LIST_IDS',
  { defaultValue: [] }
);

let sortByDateTasksListIds: string[] = sortByDateIds.getState();

const initialState: TaskListState = {
  byIds: {},
  ids: [],
  sortByDate: false,
  creatingNewTaskList: false
};

export default function(
  state = initialState,
  action: TaskListActions | RouterAction
): TaskListState {
  switch (action.type) {
    case LOCATION_CHANGE:
      return (() => {
        const matches = matchPath<{ taskListId?: string }>(
          action.payload.location.pathname,
          {
            path: PATHS.TASKLIST,
            strict: true
          }
        );

        const id = (matches && matches.params.taskListId) || state.ids[0];

        if (id) {
          lastVisit.setState(id).write(id);
          return {
            ...state,
            id,
            sortByDate: sortByDateTasksListIds.includes(id)
          };
        }

        return state;
      })();

    case TaskListActionTypes.GET_ALL_TASK_LIST:
      return {
        ...initialState,
        id: state.id,
        sortByDate: state.sortByDate
      };

    case TaskListActionTypes.GET_ALL_TASK_LIST_SUCCESS:
    case TaskListActionTypes.GET_ALL_TASK_LIST_SILENT_SUCCESS:
      return (() => {
        const ids: string[] = [];
        const byIds = action.payload.reduce<TaskListState['byIds']>(
          (acc, taskList) => {
            acc[taskList.id!] = taskList;
            ids.push(taskList.id!);
            return acc;
          },
          {}
        );

        return {
          ...state,
          byIds,
          ids,
          id: state.id || ids[0]
        };
      })();

    case TaskListActionTypes.DELETE_TASK_LIST:
      return (() => {
        const taskLisdId = action.payload || state.id;
        const { [taskLisdId!]: deleted, ...byIds } = state.byIds;
        return {
          ...state,
          byIds,
          ids: remove(state.ids, taskLisdId),
          id: undefined
        };
      })();

    case TaskListActionTypes.NEW_TASK_LIST:
      return {
        ...state,
        creatingNewTaskList: true
      };

    case TaskListActionTypes.NEW_TASK_LIST_SUCCESS:
      return {
        ...state,
        creatingNewTaskList: false,
        byIds: {
          ...state.byIds,
          [action.payload.id!]: action.payload
        },
        ids: [...state.ids, action.payload.id!]
      };

    case TaskListActionTypes.UPDATE_TASK_LIST:
      return (() => {
        const { tasklist, requestBody } = action.payload!;
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [tasklist!]: { ...state.byIds[tasklist!], ...requestBody }
          }
        };
      })();

    case TaskListActionTypes.TOGGLE_SORT_BY_DATE:
      return (() => {
        const sortByDate =
          typeof action.payload === 'boolean'
            ? action.payload
            : !state.sortByDate;

        if (sortByDate) {
          sortByDateTasksListIds.push(state.id!);
        } else {
          sortByDateTasksListIds = remove(sortByDateTasksListIds, state.id!);
        }

        sortByDateIds.setState(sortByDateTasksListIds).write();

        return {
          ...state,
          sortByDate
        };
      })();

    default:
      return state;
  }
}
