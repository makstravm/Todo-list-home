import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './Todolist';

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {
  const [task, setTask] = useState(
    [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
      { id: v1(), title: 'React', isDone: false }
    ]
  )
  const [filter, setFilter] = useState('all')

  function removeTask(taskId: string) {
    const resultTask = task.filter(t => t.id !== taskId)
    setTask(resultTask)
  }

  function changeFilter(value: FilterTaskType) {
    setFilter(value);
  }

  function filterTaskForTodolist() {
    if (filter === 'active') {
      return task.filter(t => t.isDone === false)
    }
    else if (filter === 'completed') {
      return task.filter(t => t.isDone === true)
    }
    else {
      return task
    }
  }

  function addTask(title: string) {
    const newTask = {
      id: v1(),
      title,
      isDone: false
    }
    const newAddTask = [newTask, ...task]
    setTask(newAddTask);
  }

  return (
    <div className="App">
      <TodoList
        title='What to learn'
        tasks={filterTaskForTodolist()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
