import React from 'react'
import './Todo.css'
import {useState , useRef, useEffect} from 'react'
import {IoMdDoneAll} from "react-icons/io";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

function Todo() {
  const[todo, setTodo] =useState('')
  const[todos,setTodos] = useState([])
  const[editId,setEditId] = useState(0)
  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  const addTodo= () =>{
      if(todo !== ''){
        setTodos([...todos,{list:todo , id: Date.now() ,status:false}]);
        console.log(todos);
        setTodo('');
      }
      if(editId){
        const editTodo = todos.find((todo) =>todo.id == editId)
        const updateTodo = todos.map((to) =>to.id ==editTodo.id
        ? (to ={id:to.id , list:todo})
        : (to ={id :to.id ,list:to.list}))
        setTodos(updateTodo)
        setEditId(0);
        setTodo('')
      }
  }

  const inputRef = useRef('null')

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  const onDelete =(id) =>{
    setTodos(todos.filter((to) => to.id !== id))
  }

  const onComplete = (id) =>{
    let complete = todos.map((to)=>{
      if(to.id === id){
        return ({...to, status: !to.status })
      }
      return to
    })
    setTodos(complete)
  }


  const onEdit = (id) =>{
      const editTodo = todos.find((to)=> to.id === id)
      setTodo(editTodo.list)
      setEditId(editTodo.id)

  }
  return (

    <div className='container'>
      <h2>Todo</h2> 
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" value={todo} ref={inputRef} placeholder="make a todo list" className='form-control' onChange={(event)=>setTodo(event.target.value)}/>
        <button onClick={addTodo}>{editId ?'Edit' : 'ADD'}</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((todolist)=>(
              <li className='list-items'>
                <div className='list-item-list' id={ todolist.status ? 'list-item' :''}>
                 {todolist.list}
                  
                </div>
              <span>
                <IoMdDoneAll className='list-item-icons' id='complete' title="Complete"onClick={()=> onComplete(todolist.id)}/>
                <FiEdit className='list-item-icons' id='edit' title="Edit" onClick={()=> onEdit(todolist.id)} />
                <MdDelete className='list-item-icons' id= 'delete' title="Delete" onClick={()=> onDelete(todolist.id)}/>
              </span></li>
            ))
          }         
        </ul>
      </div>
    </div>
  )
}

export default Todo 