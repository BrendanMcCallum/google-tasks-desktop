import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import network from './network';
import preferences from './preferences';
import task from './task';
import taskList from './taskList';

const rootReducer = (history: Parameters<typeof connectRouter>[0]) =>
  combineReducers({
    auth,
    network,
    preferences,
    router: connectRouter(history),
    task,
    taskList
  });

export * from './auth';
export * from './network';
export * from './preferences';
export * from './task';
export * from './taskList';

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default rootReducer;
