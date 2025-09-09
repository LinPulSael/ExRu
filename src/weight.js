import React, {useState} from 'react';
import './weight.css';


export default function Weight() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    const addTodo = () => {
        const value = input.trim();
        if(!value) return;
        setTodos([...todos, {text:value, done:false}]);
        setInput('');
    };

    const toggleDone = (index) => {
        const newTodos = [...todos];
        newTodos[index].done =! newTodos[index].done;
        setTodos(newTodos);

    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="header">
            <h2> 웨이트 트레이닝 To-do </h2>
            <input type="text" id="todoInput"
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter') addTodo();
            }}
             placeholder="내일 할 운동 입력"/> 
            <button id="addButton" onClick={addTodo}> 추가하기 </button>

            <ul className="todoList">
                {todos.map((todo, index) => (
                    <li key={index} id="todoItem"> 
                    <span onClick={() => toggleDone(index)}>{todo.text}</span>
                    <button onClick={() =>deleteTodo(index)}> 삭제하기 </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}