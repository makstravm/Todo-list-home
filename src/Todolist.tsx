import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTaskType } from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterTaskType) => void
  addTask: (title: string) => void
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
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
  const addTaskOnClick = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('')
  }
  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle('')
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onChangeTask}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addTaskOnClick}>+</button>
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