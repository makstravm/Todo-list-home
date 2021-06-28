import { Button, IconButton, TextField } from '@material-ui/core';
import { title } from 'process';
import QueueIcon from '@material-ui/icons/Queue';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './App.module.css'

type AddItemFormPorpsType = {
  addItem: (title: string) => void
}
export function AddItemForm(props: AddItemFormPorpsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskOnClick = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
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
  return (
    <div>
      <TextField variant="outlined" label="type value"
        value={newTaskTitle}
        onChange={onChangeTask}
        onKeyPress={onKeyPressAddTask}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTaskOnClick}><QueueIcon  color="primary"/></IconButton>
    </div>
  )
}