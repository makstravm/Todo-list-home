import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {
  const [task, setTask] = useState(
    [
      { id: 1, title: 'HTML', isDone: true },
      { id: 2, title: 'CSS', isDone: true },
      { id: 3, title: 'JS', isDone: false },
      { id: 4, title: 'React', isDone: false }
    ]
  )
  const [filter, setFilter] = useState('all')

  function removeTask(taskId: number) {
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

  return (
    <div className="App">
      <TodoList
        title='What to learn'
        tasks={filterTaskForTodolist()}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
