import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {AddItemForm} from "./AddItemForm";
import {v1} from 'uuid';
import {AppBarWrapper} from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addToDoListAC,
    changeFilterAC,
    editToDoListAC,
    removeToDoListAC,
    toDoListsReducer
} from "./reducers/toDoListsReducer";
import {addTaskAC, addTaskListAC, changeStatusAC, editTaskAC, removeTaskAC, taskReducer} from "./reducers/taskReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TasksType = {
    id: string, title: string, isDone: boolean
}
export type ToDoListsType = {
    id: string, title: string, filter: FilterValuesType
}
export type ListOfTasksType = {
   [key:string]: Array<TasksType>
}

function App() {

    const toDoListId1 = v1();
    console.log(`TO DO list1 id:${toDoListId1}`)
    const toDoListId2 = v1();


    /*    const [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
            {id: toDoListId1, title: 'What to do', filter: 'all'},
            {id: toDoListId2, title: 'What to do', filter: 'all'},
    const [tasksObj, setTasks] = useState<ListOfTasksType>
    ({
        [toDoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [toDoListId2]: [
            {id: v1(), title: "bebra", isDone: false},
            {id: v1(), title: "milk shake bebra", isDone: true},
        ],
    })
        ])*/
    const [toDoLists, dispatchToDo] = useReducer(toDoListsReducer, [
        {id: toDoListId1, title: 'What to do', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},

    ])
    const [tasksObj, dispatchTask] = useReducer
    (taskReducer,{
        [toDoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [toDoListId2]: [
            {id: v1(), title: "bebra", isDone: false},
            {id: v1(), title: "milk shake bebra", isDone: true},
        ],
    })

    function addTask(toDoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        //setTasks({...tasksObj, [toDoListId]: [newTask, ...tasksObj[toDoListId]]})
        dispatchTask(addTaskAC(toDoListId,title))
    }

    const removeToDoList = (id: string) => {
        dispatchToDo(removeToDoListAC(id))
    }

    function removeTask(toDoListId: string, taskId: string) {
        debugger
        //setTasks({...tasksObj, [toDoListId]: tasksObj[toDoListId].filter(filtered => filtered.id !== taskId)})
        dispatchTask(removeTaskAC(toDoListId,taskId))

    }
    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {
/*        setTasks({
            ...tasksObj, [toDoListId]: [...tasksObj[toDoListId].map(
                task => task.id === taskId ? {...task, isDone: isDone} : task)]
        })*/
        dispatchTask(changeStatusAC(toDoListId,taskId,isDone))
    }
    function changeFilter(value: FilterValuesType, toDoListId: string) {
        dispatchToDo(changeFilterAC(value, toDoListId))
    }

    const editTodoList = (toDoListID: string, title: string) => {
        dispatchToDo(editToDoListAC(toDoListID, title))
    }
    const addTodoList = (title: string) => {
        const newToDoList: ToDoListsType = {
            id: v1(), title, filter: 'all'
        }
        dispatchToDo(addToDoListAC(newToDoList))
/*        setTasks({
            ...tasksObj,
            [newToDoList.id]: []
        })*/
        dispatchTask(addTaskListAC(newToDoList.id))
    }
    const editTask = (toDoListId: string, taskId: string, newTitle: string) => {
/*        setTasks({
            ...tasksObj,
            [toDoListId]: tasksObj[toDoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })*/
        dispatchTask(editTaskAC(toDoListId,taskId,newTitle))
    }
    let listsOfToDoLists = toDoLists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }

        return (
            <Grid item>
                <Paper style={{padding: '15px'}}>
                    <Todolist title={tl.title}
                              toDoListsId={tl.id}
                              removeToDoList={removeToDoList}
                              key={tl.id}
                              tasks={tasksForTodolist}
                              changeCheckBoxStatus={changeStatus}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              editTask={editTask}
                              filter={tl.filter}
                              editToDoList={editTodoList}
                    />
                </Paper>
            </Grid>
        )

    })

    return (
        <div className="App">
            <AppBarWrapper/>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {listsOfToDoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
