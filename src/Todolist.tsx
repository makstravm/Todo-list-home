import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTaskType } from './App';
import s from './App.module.css'

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
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterTaskType
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const Todolist = props.tasks.map(t => {
    const removeOnClickTask = () => props.removeTask(t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked)
    }
    return (
      <li key={t.id} >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={onChangeHandler}
        />
        <span className={t.isDone ? s.isDone : ''}>{t.title}</span>
        <button onClick={removeOnClickTask}>X</button>
      </li >
    )
  })

  const filterTodoListAll = () => props.changeFilter('all')
  const filterTodoListActive = () => props.changeFilter('active')
  const filterTodoListCompleted = () => props.changeFilter('completed')
  const addTaskOnClick = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle('')
    } else {
      setError('Field is required')
    }
  }
  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)

  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle('')
    } setError(null)
  }
  const filterActiveClassAll = s.btn + ' ' + (props.filter === 'all' ? s.active : '')
  const filterActiveClassActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
  const filterActiveClassCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onChangeTask}
          onKeyPress={onKeyPressAddTask}
          className={s.input + ' ' + (error ? s.error : '')}
        />
        <button onClick={addTaskOnClick}>+</button>
        {error && <div className={s.errorMessege}>{error}</div>}
      </div>
      <ul>
        {Todolist}
      </ul>
      <div>
        <button
          onClick={filterTodoListAll}
          className={filterActiveClassAll}
        >All
        </button>
        <button
          onClick={filterTodoListActive}
          className={filterActiveClassActive}
        >Active
        </button>
        <button
          onClick={filterTodoListCompleted}
          className={filterActiveClassCompleted}
        >Completed
        </button>
      </div>
    </div>
  )
}