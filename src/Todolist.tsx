import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { idText } from 'typescript';
import { AddItemForm } from './AddItemForm';
import { FilterTaskType } from './App';
import s from './App.module.css'
import { EditTitleTask } from './EditTitleTask';

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
  addEditTitle: (taskId: string, title: string, todoListId: string) => void
  addNewEditTitleTodoList: (title: string, todoListId: string) => void
}

export function TodoList(props: PropsType) {

  const Todolist = props.tasks.map(t => {
    const removeOnClickTask = () => props.removeTask(t.id, props.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    }
    const addNewEditTitle = (title: string) => props.addEditTitle(t.id, title, props.id)
    return (
      <li key={t.id} >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={onChangeHandler}
        />
        <span className={t.isDone ? s.isDone : ''}>
          <EditTitleTask title={t.title}
            addEditTitle={addNewEditTitle} />
        </span>
        <button onClick={removeOnClickTask}>X</button>
      </li >
    )
  })
  const addNewTitle = (title: string) => { props.addTask(title, props.id) }
  const filterTodoListAll = () => props.changeFilter('all', props.id)
  const filterTodoListActive = () => props.changeFilter('active', props.id)
  const filterTodoListCompleted = () => props.changeFilter('completed', props.id)

  const filterActiveClassAll = s.btn + ' ' + (props.filter === 'all' ? s.active : '')
  const filterActiveClassActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
  const filterActiveClassCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')
  const changeTodoListTitle = (title: string) => props.addNewEditTitleTodoList(title, props.id)
  return (
    <div>
      <h3>  <EditTitleTask title={props.title}
        addEditTitle={changeTodoListTitle} />
      </h3>
      <button onClick={() => props.removeTodoList(props.id)}>x</button>
      <AddItemForm
        addItem={addNewTitle} />
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

