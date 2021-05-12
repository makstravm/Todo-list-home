import React from 'react';
import { FilterTaskType } from './App';

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (value: FilterTaskType) => void
}

export function TodoList(props: PropsType) {
  const Todolist = props.tasks.map(t => {
    const removeOnClickTask = () => props.removeTask(t.id)
    return (
      <li>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={removeOnClickTask}>X</button>
      </li >
    )
  })
  const filterTodoListAll = () => props.changeFilter('all')
  const filterTodoListActive = () => props.changeFilter('active')
  const filterTodoListCompleted = () => props.changeFilter('completed')
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {Todolist}
      </ul>
      <div>
        <button onClick={filterTodoListAll}>All</button>
        <button onClick={filterTodoListActive}>Active</button>
        <button onClick={filterTodoListCompleted}>Completed</button>
      </div>
    </div>
  )
}