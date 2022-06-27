import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type toDoListsType = {
    id:string, title:string, filter:FilterValuesType
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
    let toDoListId2 = v1();
    let [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: toDoListId1, title:'What to do', filter:'all'},
        {id: toDoListId2, title:'What to do', filter:'all'},
    ])
    let [tasksObj, setTasksObj] = useState({
        [toDoListId1]:[
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
        ],
        [toDoListId2]:[
            { id: v1(), title: "bebra", isDone: false },
            { id: v1(), title: "milk shake bebra", isDone: true },
        ],


    })
    const removeToDoList = (id:string) => {
        let filteredToDoList = toDoLists.filter(tl=> tl.id != id)
        setToDoLists([...filteredToDoList])

    }
    function removeTask(id: string,toDoListId:string) {
        debugger
        let tasks = tasksObj[toDoListId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[toDoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    const changeCheckBoxStatus = (taskId:string, isDone:boolean,toDoListId:string) => {
        let tasks = tasksObj[toDoListId]
        let task = tasks.find(el => el.id == taskId)
        if(task){
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
    }
    function addTask(title: string,toDoListId:string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[toDoListId]
        let newTasks = [task,...tasks]
        tasksObj[toDoListId] = newTasks
        setTasksObj({...tasksObj});
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");


    function changeFilter(value: FilterValuesType,id:string) {
        let toDoList = toDoLists.find(tl => tl.id === id)

        if(toDoList){
            toDoList.filter = value;
            setToDoLists([...toDoLists])
        }
            setFilter(value);
    }

    let listsOfToDoLists = toDoLists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        return             <Todolist title={tl.title}
                                     toDoListsId={tl.id}
                                     removeToDoList={removeToDoList}
                                     key={tl.id}
                                     tasks={tasksForTodolist}
                                     changeCheckBoxStatus={changeCheckBoxStatus}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     filter={tl.filter}
        />

    })

    return (
        <div className="App">
            {listsOfToDoLists}
        </div>
    );
}

export default App;
