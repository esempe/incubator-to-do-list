import {FilterValuesType, ToDoListsType} from "../App";

export const toDoListsReducer = (state: Array<ToDoListsType>, action: AllToDoListsActionType): Array<ToDoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return [...state.filter(tl => tl.id != action.payload)]
        }
        case "CHANGE-FILTER": {
            return state.map(filtered => filtered.id === action.payload.toDoListId ? {
                ...filtered,
                filter: action.payload.value
            } : filtered)
        }
        case "EDIT-TODOLIST": {
            return state.map(el => el.id === action.payload.toDoListID ? {...el, title: action.payload.title} : el)
        }
        case "ADD-TODOLIST": {
            return [...state, action.payload.newToDoList]
        }
    }
}

export type AllToDoListsActionType =
    ReturnType<typeof removeToDoListAC> |
    ReturnType<typeof changeFilterAC> |
    ReturnType<typeof editToDoListAC> |
    ReturnType<typeof addToDoListAC>


export const addToDoListAC = (newToDoList: ToDoListsType) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newToDoList
        }
    } as const
}

export const changeFilterAC = (value: FilterValuesType, toDoListId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            value,
            toDoListId
        }
    } as const;
}
export const editToDoListAC = (toDoListID: string, title: string) => {
    return {
        type: "EDIT-TODOLIST",
        payload: {
            toDoListID,
            title
        }
    } as const
}
export const removeToDoListAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: id
    } as const;
}