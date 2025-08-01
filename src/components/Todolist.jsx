import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useState } from "react";
import "./todo.css"
export default function Todolist() {

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const [inputText, setInputText] = useState("");
    const newInput = (e) => { setInputText(e.target.value) }
    const handleClick = () => {
        if (inputText.trim() === "") return alert('Вы не ввели задачу!!!');

        const newTask = {
            id: nanoid(),
            text: inputText,
            completed: false
        }
        setTodos([...todos, newTask])
        setInputText("");
    }

    const handleToggle = (id) => {
        setTodos(prev => prev.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
        )
    }

    const handleDelete = (id) => {
        setTodos(prev => prev.filter(task => task.id !== id))
    }

    const [filterType, setFilterType] = useState('all')

    const filterTodos = todos.filter(task => {
        if (filterType === 'active') return !task.completed
        if (filterType === 'completed') return task.completed
        return true
    })

    return (
        <div className="div1">
            <div>

                <h1>Todo List</h1>
                <input type="text" placeholder="Введите задачу"
                    value={inputText}
                    onChange={newInput}
                    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                    className="inp"
                />

                <button onClick={handleClick} className="addBtn">Add</button>


            </div>

            <div className="btnFilter">
                <button onClick={() => setFilterType('all')}
                    className={filterType === 'all' ? 'active' : ''}
                >All</button>
                <button
                    onClick={() => setFilterType('active')}
                    className={filterType === 'active' ? 'active' : ''}
                >
                    Active</button>
                <button
                    onClick={() => setFilterType('completed')}
                    className={filterType === 'completed' ? 'active' : ''}
                >Completed</button>
            </div>
            <ul className="ul">
                {filterTodos.map((todo) => (

                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                            className="checkbox"
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => handleDelete(todo.id)} className="delete">🗑️</button>
                    </li>

                ))}
            </ul>
        </div>
    )
}



