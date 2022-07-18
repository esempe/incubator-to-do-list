import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    toDoListsId: string
    removeToDoList: (toDoListId: string) => void
    changeCheckBoxStatus: (toDoListId: string, taskId: string, isDone: boolean) => void
    tasks: Array<TaskType>
    removeTask: (toDoListId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, toDoListId: string) => void
    addTask: (toDoListId: string, title: string) => void
    filter: FilterValuesType
    editTask: (toDoListId: string, taskId: string, newTitle: string) => void
    editToDoList: (toDoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter("all", props.toDoListsId);
    const onActiveClickHandler = () => props.changeFilter("active", props.toDoListsId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.toDoListsId);
    const onDeleteListHandler = (id: string) => {
        props.removeToDoList(id)
    }

    const addTaskCallback = (title: string) => {
        props.addTask(props.toDoListsId, title)
    }
    const editTaskHandler = (taskId: string, newTitle: string) => {
        props.editTask(props.toDoListsId, taskId, newTitle)
    }
    const editTodoListHandler = (newTitle: string) => {
        props.editToDoList(props.toDoListsId, newTitle)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan title={props.title} callback={editTodoListHandler}/>
            <IconButton onClick={() => onDeleteListHandler(props.toDoListsId)}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let isDone = e.currentTarget.checked
                        props.changeCheckBoxStatus(props.toDoListsId, t.id, isDone,)
                    }
                    const onClickHandler = () => props.removeTask(props.toDoListsId, t.id)
                    return <li className={t.isDone === true ? "isDone" : ''} key={t.id}>
                        <input
                            type="checkbox"
                            onChange={onChangeCheckBoxHandler}
                            checked={t.isDone}/>
                        <EditableSpan callback={(newTitle) => editTaskHandler(t.id, newTitle)} title={t.title}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                variant={props.filter === 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}>All</Button>
            <Button
                variant={props.filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                variant={props.filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

