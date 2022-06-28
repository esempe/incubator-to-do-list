import React, {ChangeEvent, useState} from 'react';


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
            ? <input onChange={onChangeTitle} autoFocus onBlur={changeEditHandler} value={newTitle}/>
            : <span  onDoubleClick={changeEditHandler}>{props.title}</span>

    );
};

