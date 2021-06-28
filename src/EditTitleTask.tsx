import { TextField } from '@material-ui/core';
import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './App.module.css'

type EditTitleTaskPorpsType = {
  title: string
  addEditTitle: (title: string) => void
}
export function EditTitleTask(props: EditTitleTaskPorpsType) {
  const [newTaskTitle, setNewTaskTitle] = useState(props.title)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)

  const addTaskOnClick = () => {
    if (newTaskTitle.trim() !== '') {
      props.addEditTitle(newTaskTitle.trim());
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
      if (newTaskTitle.trim() !== '') {
        props.addEditTitle(newTaskTitle.trim());

        setEditMode(false)
      } else {
        setError('Field is required')
      }

    }
  }
  const editModetitle = () => setEditMode(true)
  const activeteViewMode = () => {
    if (newTaskTitle.trim() !== '') {
      props.addEditTitle(newTaskTitle.trim());
      setEditMode(false)
    } else {
      setError('Field is required')
    }

  }
  return (
    <span onDoubleClick={editModetitle}>
      {editMode ?
        <TextField
          value={newTaskTitle} autoFocus
          onChange={onChangeTask}
          onKeyPress={onKeyPressAddTask}
          onBlur={activeteViewMode}
          className={s.input + ' ' + (error ? s.error : '')}
        /> :
        props.title}
    </span >
  )
}