import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';

export type FilterTaskType = 'all' | 'active' | 'completed'

type StatesTodoListType = {
  id: string
  title: string
  filter: FilterTaskType
}


function App() {
  const taskTodoListIdOne = v1();
  const taskTodoListIdTwo = v1();
  const taskTodoListIdTree = v1();

  const [todoList, setTosoList] = useState<Array<StatesTodoListType>>(
    [
      { id: taskTodoListIdOne, title: 'What to learn', filter: 'all' },
      { id: taskTodoListIdTwo, title: 'What to buy', filter: 'all' },
      { id: taskTodoListIdTree, title: 'What to beer', filter: 'all' }
    ]

  )
  const [tasks, setTasks] = useState({
    [taskTodoListIdOne]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
      { id: v1(), title: 'React', isDone: false }
    ],
    [taskTodoListIdTwo]: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'LapTop', isDone: false },
      { id: v1(), title: 'iPhone', isDone: false }
    ],
    [taskTodoListIdTree]: [
      { id: v1(), title: 'Ale Rose', isDone: false },
      { id: v1(), title: 'Fragolino', isDone: true },
      { id: v1(), title: 'Cabinet', isDone: false },
      { id: v1(), title: 'Zhiguly', isDone: true }
    ]
  })
  function removeTodoList(todoListId: string) {
    const result = todoList.filter(ts => ts.id !== todoListId)
    setTosoList(result)
    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  function removeTask(taskId: string, todoListId: string) {
    const removeTasks = tasks[todoListId]
    let resultTask = removeTasks.filter(t => t.id !== taskId)
    tasks[todoListId] = resultTask
    setTasks({ ...tasks })
  }

  function changeFilter(value: FilterTaskType, todoListId: string) {
    let todoListFindId = todoList.find(tl => tl.id === todoListId)
    if (todoListFindId) {
      todoListFindId.filter = value
      setTosoList([...todoList])
    }

  }


  function addTask(title: string, todoListId: string) {
    const newTask = {
      id: v1(),
      title,
      isDone: false
    }
    const newAddTask = [newTask, ...tasks[todoListId]]
    tasks[todoListId] = newAddTask
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const findTasks = tasks[todoListId]
    let newTask = findTasks.find(t => t.id === taskId)
    if (newTask) {
      newTask.isDone = isDone
      setTasks({ ...tasks })
    }


  }
  const todoListReander = todoList.map(tl => {
    function filterTaskForTodolist() {
      if (tl.filter === 'active') {
        return tasks[tl.id].filter(t => t.isDone === false)
      }
      else if (tl.filter === 'completed') {
        return tasks[tl.id].filter(t => t.isDone === true)
      }
      else {
        return tasks[tl.id]
      }
    }
    return < TodoList
      key={tl.id}
      id={tl.id}
      title={tl.title}
      tasks={filterTaskForTodolist()}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      changeTaskStatus={changeStatus}
      filter={tl.filter}
      removeTodoList={removeTodoList}
    />
  })
  return (
    <div className="App">
      {todoListReander}
    </div>
  );
}

export default App;
