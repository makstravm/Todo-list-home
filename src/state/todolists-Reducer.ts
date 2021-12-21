import { v1 } from "uuid"
import { FilterTaskType, StatesTodoListType } from "../App"



type todoListRemoveType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type todoListAddType = {
    type: 'ADD-TODOLIST'
    title: string
}
type todoListChangeTitleType = {
    id: string
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
}
type todoListChangeFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterTaskType
}

export const todolistsReducer = (todolists: Array<StatesTodoListType>, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...todolists,
            {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let resultTask = todolists.find(t => t.id === action.id)
            if (resultTask) {
                resultTask.title = action.title
            }
            return [...todolists]

        case 'CHANGE-TODOLIST-FILTER':
            let resultTaskFilter = todolists.find(t => t.id === action.id)
            if (resultTaskFilter) {
                resultTaskFilter.filter = action.filter
            }
            return [...todolists]
        default:
            return todolists
    }
}


// export type ActionTypes = `todoListRemoveType | todoListAddType | todoListChangeTitleType | todoListChangeFilterType

export const RemoveTodolistAC = (todolistId: string): todoListRemoveType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const AddTodolistAC = (title: string): todoListAddType => {
    return { type: 'ADD-TODOLIST', title }
}
export const TodoListChangeTitleAC = (title: string, id: string): todoListChangeTitleType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title, id }
}
export const TodoListChangeFilterAC = (filter: FilterTaskType, id: string): todoListChangeFilterType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
} 