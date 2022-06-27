import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    toDoListsId:string
    removeToDoList:(toDoListId:string)=>void
    changeCheckBoxStatus: (taskId: string, isDone: boolean,toDoListId:string) => void
    tasks: Array<TaskType>
    removeTask: (taskId: string,toDoListId:string) => void
    changeFilter: (value: FilterValuesType,toDoListId:string) => void
    addTask: (title: string,toDoListId:string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    const addTask = () => { //РАБОТАЕТ
        //if(title && title !=" " && title !="   "){
        if(title.trim() === ""){
            setError(true)
            return;
        }
        props.addTask(title, props.toDoListsId)
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { //РАБОТАЕТ

        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {

            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.toDoListsId);
    const onActiveClickHandler = () => props.changeFilter("active", props.toDoListsId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.toDoListsId);
    const onDeleteListHandler = (id:string) => {
        props.removeToDoList(id)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={()=>onDeleteListHandler(props.toDoListsId)}>X</button>
        </h3>
        <div>
            <input value={title}
                   className={error ? "error": ""}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>Field is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {


                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let isDone = e.currentTarget.checked
                        props.changeCheckBoxStatus(t.id,isDone,props.toDoListsId)
                        console.log(t.id)
                    }
                    const onClickHandler = () => props.removeTask(t.id,props.toDoListsId)
                    return <li key={t.id}>
                        <input
                            type="checkbox"
                            onChange={onChangeCheckBoxHandler}
                            checked={t.isDone}/>
                        <span className={t.isDone === true ? "isDone": ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
