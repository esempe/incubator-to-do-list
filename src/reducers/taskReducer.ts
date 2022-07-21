import {v1} from "uuid";
import {ListOfTasksType} from "../App";


export const taskReducer = (state:ListOfTasksType,action:AllTaskReducersTypes):ListOfTasksType => {
    switch (action.type) {
        case"ADD-TASK":{
            return {...state,[action.payload.toDoListId]: [action.payload.newTask, ...state[action.payload.toDoListId]]};
        }
        case "REMOVE-TASK":{
            return{...state, [action.payload.toDoListId]: state[action.payload.toDoListId].filter(filtered => filtered.id !== action.payload.taskId)}
        }
        case "CHANGE-TASK-STATUS":{
            return {
            ...state, [action.payload.toDoListId]: [...state[action.payload.toDoListId].map(
                task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)]
            }
        }
        case "ADD-TASK-LIST":{
            return{
                ...state,
                [action.payload.toDoListID]: []
            }
        }
        case "EDIT-TASK":{
            return{
                ...state,
                [action.payload.toDoListId]: state[action.payload.toDoListId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
            }
        }
        default: return state;
    }
}

type AllTaskReducersTypes =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof changeStatusAC> |
    ReturnType<typeof addTaskListAC> |
    ReturnType<typeof editTaskAC>

export const addTaskAC = (toDoListId: string, title: string) => {
    return{
        type:"ADD-TASK",
        payload:{
            toDoListId,
            newTask:{id: v1(), title: title, isDone: false}
        }
    }as const
}

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return{
        type:"REMOVE-TASK",
        payload:{
            toDoListId, taskId
        }
    }as const
}
export const changeStatusAC = (toDoListId: string, taskId: string, isDone: boolean) => {
    return{
        type:"CHANGE-TASK-STATUS",
        payload:{
            toDoListId,
            taskId,
            isDone
        }
    }as const
}
export const addTaskListAC = (toDoListID: string) => {
    return{
    type:"ADD-TASK-LIST",
        payload: {toDoListID}
    }as const
}
export const editTaskAC = (toDoListId: string, taskId: string, newTitle: string) => {
    return{
        type:"EDIT-TASK",
        payload:{
            toDoListId,
            taskId,
            newTitle
        }
    }as const
}