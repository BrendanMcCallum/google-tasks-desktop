import React from 'react';
import { Input } from '../Mui/Input';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { Schema$Task } from '../../typings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

interface Props extends InputBaseComponentProps {
  task?: Schema$Task;
  onDueDateBtnClick?(): void;
}

export function TaskInput({
  inputRef,
  task,
  onDueDateBtnClick = () => {},
  ...inputProps
}: Props) {
  const { notes, due, status } = task!;

  return (
    <div className="task-input-content">
      <Input multiline inputProps={inputProps} inputRef={inputRef} />
      {notes && <div className="task-notes">{notes}</div>}
      {status === 'needsAction' && due && (
        <div
          className="task-due-date-button"
          onClick={onDueDateBtnClick}
          data-date={dateFormat(new Date(due))}
        >
          <EventAvailableIcon />
        </div>
      )}
    </div>
  );
}

function dateFormat(d: Date) {
  const now = new Date();

  if (d.compare(now).sameDate) {
    return 'Today';
  }

  if (d.compare(now.addDays(1)).sameDate) {
    return 'Tomorrow';
  }

  if (now < d) {
    return new Date(d).format('D, j M');
  }

  if (d.compare(now.addDays(-1)).sameDate) {
    return 'Yesterday';
  }

  const dayDiff = Math.floor((+now - +d) / 1000 / 60 / 60 / 24);

  if (dayDiff < 7) {
    return `${dayDiff} days ago`;
  }

  return `${Math.floor(dayDiff / 7)} weeks ago`;
}
