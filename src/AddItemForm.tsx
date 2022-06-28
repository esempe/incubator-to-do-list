import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
///////////////////////////////////////////////
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { //РАБОТАЕТ
        setTitle(e.currentTarget.value)
    }
    const addTask = () => { //РАБОТАЕТ
        if (title.trim() === "") {
            setError(true)
            return;
        }
        props.addItem(title)
        setTitle("");
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <input value={title}
                   className={error ? "error" : ""}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>Field is required</div>}
        </div>
    )
}