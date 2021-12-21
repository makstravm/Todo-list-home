import { v1 } from "uuid";
import { FilterTaskType, StatesTodoListType } from "../App";
import { ActionTypes, AddTodolistAC, RemoveTodolistAC, TodoListChangeFilterAC, TodoListChangeTitleAC, todolistsReducer } from "./todolists-Reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<StatesTodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New Todolist";
    const startState: Array<StatesTodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New Todolist";
    const startState: Array<StatesTodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, TodoListChangeTitleAC(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: FilterTaskType = "completed";
    const startState: Array<StatesTodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState,TodoListChangeFilterAC(newFilter, todolistId2));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});