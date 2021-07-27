import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EdiTableSpan from "./EdiTableSpan";


type TodoListPropsType = {
    id: string
    filter: FilterValueType
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (nextFilter: FilterValueType, todoListID: string) => void
    removeTodoList: (todoListsID:string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const  tasksJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string)=>
            props.changeTaskTitle(t.id, title, props.id)
        return(
            <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}

                />
                <EdiTableSpan title={t.title} changeTitle={changeTaskTitle} />
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTodoList = () => props.removeTodoList(props.id)

    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return(
        <div>
            <h3>
                <EdiTableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasksJSXElement}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList
