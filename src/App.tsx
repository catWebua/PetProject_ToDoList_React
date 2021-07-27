import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
// import set = Reflect.set;

export type FilterValueType = "all" | "active" | "completed"

type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId_1, title: "what to learn?", filter: 'all'},
        {id: todoListId_2, title: "what to buy?", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "TEA", isDone: true},
        ]
    })


    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
        // setTasks(tasks.filter(t => t.id !== taskID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }

    const changeTodoListFilter = (filter: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter}: tl))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title}: tl))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks})
    }

    const removeTodoList = (todoListsID:string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsID))
        const copyTasks = {...tasks}
        delete  tasks[todoListsID]
        setTasks(copyTasks)
    }


    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListsType = {
            id: todoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})
    }

    //UI:
    const getTasksForRender = (todoList: TodoListsType): TaskType[] => {
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            default:
                return tasks[todoList.id]
        }

    }

    const todoListComponets = todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={getTasksForRender(tl)}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponets}
        </div>
    );
}

export default App;
