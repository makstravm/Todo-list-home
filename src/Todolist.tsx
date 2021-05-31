import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterTaskType } from './App';
import s from './App.module.css'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (value: FilterTaskType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  filter: FilterTaskType
  id: string
  removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const Todolist = props.tasks.map(t => {
    const removeOnClickTask = () => props.removeTask(t.id, props.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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

  const filterTodoListAll = () => props.changeFilter('all', props.id)
  const filterTodoListActive = () => props.changeFilter('active', props.id)
  const filterTodoListCompleted = () => props.changeFilter('completed', props.id)
  const addTaskOnClick = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle('')
    } else {
      setError('Field is required')
    }
  }
  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
    setError(null)
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTaskOnClick()
    }
  }
  const filterActiveClassAll = s.btn + ' ' + (props.filter === 'all' ? s.active : '')
  const filterActiveClassActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
  const filterActiveClassCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')

  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={() => props.removeTodoList(props.id)}>x</button>
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