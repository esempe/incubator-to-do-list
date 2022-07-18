import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


type propsType = {
    title: string;
    callback:(newTitle:string)=>void
}
export const EditableSpan = (props: propsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle]= useState<string>(props.title)
    const changeEditHandler = () => {
        setEdit(!edit)
        addTask()
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callback(newTitle)

    }
    return (
        edit
            ? <TextField size={'small'} variant="standard" onChange={onChangeTitle} autoFocus onBlur={changeEditHandler} value={newTitle}/>
            : <span  onDoubleClick={changeEditHandler}>{props.title}</span>

    );
};

