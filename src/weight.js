import React, {useState, useEffect} from 'react';
import './weight.css';


export default function Weight() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    
    // 리스트 추가
    const addTodo = (e) => {
        if (e) e.preventDefault();
        const value = input.trim();
        if(!value) return; //공백 방지
        setTodos([...todos, {text:value, done:false}]);
        setInput('');
    };

    // 완료 체크박스 토글
    const toggleDone = (index) => {
        const newTodos = [...todos];
        newTodos[index].done =! newTodos[index].done;
        setTodos(newTodos);

    };
    // 리스트 삭제
    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };
    
    /* 페이지 새로고침 후에도 To-do 리스트 유지 | 불러오기, 저장 순 */ 
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="header">
            <h2> 웨이트 트레이닝 To-do </h2>
            <form onSubmit={addTodo} className="todoForm">
                <input type="text" value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder = "운동 입력" className="todoInput"/>

                <button type="submit" className="addButton"> 추가하기 </button>
            </form>
            
            <ul className="todoList">
                {todos.map((todo, index) => (
                    <li key={index} className={`todoItem ${todo.done ? 'done' : ''}`}> 
                    <input type="checkbox" checked={todo.done} 
                    onChange={() => toggleDone(index)} />
                    <span>{todo.text}</span>
                    <button className="deleteButton" onClick={() =>deleteTodo(index)}> 삭제하기 </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}