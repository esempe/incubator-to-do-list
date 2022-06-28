import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type toDoListsType = {
    id: string, title: string, filter: FilterValuesType
}


function App() {

    /*    let [tasks, setTasks] = useState([
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ]);*/
    let toDoListId1 = v1();
    console.log(`TO DO list1 id:${toDoListId1}`)
    let toDoListId2 = v1();

    let [tasksObj, setTasks] = useState({
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
    let [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: toDoListId1, title: 'What to do', filter: 'all'},
        {id: toDoListId2, title: 'What to do', filter: 'all'},

    ])
    function addTask(toDoListId:string,title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasksObj,[toDoListId]:[newTask,...tasksObj[toDoListId]]})
    }
    const removeToDoList = (id: string) => {
        let filteredToDoList = toDoLists.filter(tl => tl.id != id)
        setToDoLists([...filteredToDoList])

    }

    function removeTask(toDoListId:string,taskId: string) {
        debugger
        setTasks({...tasksObj,[toDoListId]:tasksObj[toDoListId].filter(filtered => filtered.id !== taskId)})

    }

    function changeStatus(toDoListId:string,taskId: string, isDone: boolean) {
        setTasks({...tasksObj, [toDoListId]:[...tasksObj[toDoListId].map(
                task => task.id === taskId ? {...task, isDone: isDone} : task)]})
    }

    function changeFilter(value: FilterValuesType,toDoListId:string) {
        setToDoLists(toDoLists.map(filtered => filtered.id === toDoListId ? {...filtered, filter:value} : filtered))
    }
    const editTodoList = (toDoListID:string,title:string) => {
        setToDoLists(toDoLists.map(el=> el.id === toDoListID ? {...el,title:title} : el))
    }
    const addTodoList = (title: string) => {
        const newToDoList:toDoListsType = {
            id: v1(), title, filter: 'all'
        }
        //newToDoList
        setToDoLists([...toDoLists,newToDoList])
        setTasks({
            ...tasksObj,
            [newToDoList.id]:[]
        })
    }
    const editTask = (toDoListId:string,taskId:string,newTitle:string) => {
        setTasks({...tasksObj,[toDoListId]:tasksObj[toDoListId].map(el=> el.id===taskId ? {...el, title:newTitle}: el)})
    }
    let listsOfToDoLists = toDoLists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }

        return <Todolist title={tl.title}
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

    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {listsOfToDoLists}
        </div>
    );
}

export default App;
