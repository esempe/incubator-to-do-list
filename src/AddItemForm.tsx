import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
///////////////////////////////////////////////
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { //РАБОТАЕТ
        setTitle(e.currentTarget.value)
    }
    const addTask = () => { //РАБОТАЕТ
        if (title.trim() === "") {
            setError('Field is required')
            return;
        }
        props.addItem(title)
        setTitle("");
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={'outlined'}
                       label="Type value"
                       className={error ? "error" : ""}
                       onChange={onChangeHandler}
                       error={!!error}
                       size={'small'}
                       helperText={error}
                       onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addTask}>
                <ControlPoint/>
            </IconButton>
            {/*{error && <div className='error-message'>Field is required</div>}*/}
        </div>
    )
}