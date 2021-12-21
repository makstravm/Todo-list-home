import IconButton from '@material-ui/core/IconButton';
import { title } from 'process';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { idText } from 'typescript';
import { AddItemForm } from './AddItemForm';
import { FilterTaskType } from './App';
import s from './App.module.css'
import { EditTitleTask } from './EditTitleTask';
import { Button, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

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
                <Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={t.isDone}
                    onChange={onChangeHandler}
                />
                <span className={t.isDone ? s.isDone : ''}>
                    <EditTitleTask title={t.title}
                        addEditTitle={addNewEditTitle} />
                </span>
                <IconButton
                    aria-label="delete"
                    onClick={removeOnClickTask}>
                    <DeleteIcon />
                </IconButton>
            </li >
        )
    })
    const addNewTitle = (title: string) => { props.addTask(title, props.id) }
    const filterTodoListAll = () => props.changeFilter('all', props.id)
    const filterTodoListActive = () => props.changeFilter('active', props.id)
    const filterTodoListCompleted = () => props.changeFilter('completed', props.id)

    const filterActiveClassAll = props.filter === 'all' ? 'contained' : 'text'
    const filterActiveClassActive = props.filter === 'active' ? 'contained' : 'text'
    const filterActiveClassCompleted = props.filter === 'completed' ? 'contained' : 'text'
    const changeTodoListTitle = (title: string) => props.addNewEditTitleTodoList(title, props.id)
    return (
        <div>
            <h3>  <EditTitleTask title={props.title}
                addEditTitle={changeTodoListTitle} />
            </h3>
            <IconButton
                aria-label="delete"
                onClick={() => props.removeTodoList(props.id)}>
                <DeleteIcon />
            </IconButton>
            <AddItemForm
                addItem={addNewTitle} />
            <ul>
                {Todolist}
            </ul>
            <div>
                <Button
                    onClick={filterTodoListAll}
                    variant={filterActiveClassAll}
                >All
                </Button>
                <Button color={'primary'}
                    onClick={filterTodoListActive}
                    variant={filterActiveClassActive}
                >Active
                </Button>
                <Button color={'secondary'}
                    onClick={filterTodoListCompleted}
                    variant={filterActiveClassCompleted}
                >Completed
                </Button>
            </div>
        </div>
    )
}

