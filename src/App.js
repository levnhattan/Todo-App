import React, { useEffect, useState, useRef } from 'react'
import Todo from './Todo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { db } from './firebase'
import { collection, query, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
const style = {
  bg: `h-screen w-screen p-10 bg-gradient-to-r from-[#82ccdd] to-[#55E6C1]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-sky-500/50 hover:bg-cyan-600 text-slate-100`,
  count: `text-center p-2`

}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const inputRef= useRef();
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todoArr);
    })
    return () => unsubscribe()
  }, [])

  const toggleCompleted = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === '') {
      alert("Please enter a todo")
    }else{
      await addDoc(collection(db, 'todos'), {
        text: input,
        completed: false,
      })
    }
    setInput('')
    inputRef.current.focus();
  }
  const deleteTodo = async (id) =>{
    await deleteDoc(doc(db, 'todos', id))
  }
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form} >
          <input 
            ref ={inputRef}
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className={style.input} type="text" placeholder='Add Todo...' 
          />
          <button className={style.button}><FontAwesomeIcon icon={faPlus} /> </button>
        </form >
        <ul>
          {todos.map((todo, index) => (
            <Todo 
              key={index} 
              todo={todo} 
              toggleCompleted={toggleCompleted} 
              deleteTodo = {deleteTodo}
            />
          ))}
        </ul>
        <ul>
          <p className={style.count}>{`Have ${todos.length} todo`}</p>
        </ul>
      </div>
    </div>
  );
}

export default App;
