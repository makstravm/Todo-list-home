import { title } from 'process';
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
      <input value={newTaskTitle}
        onChange={onChangeTask}
        onKeyPress={onKeyPressAddTask}
        className={s.input + ' ' + (error ? s.error : '')}
      />
      <button onClick={addTaskOnClick}>+</button>
      {error && <div className={s.errorMessege}>{error}</div>}
    </div>
  )
}