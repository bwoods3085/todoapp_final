import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ToDosEdit from './ToDosEdit'

library.add(fas)

export default function SingleToDo(props) {
  const { currentUser } = useAuth()
  const [showEdit, setShowEdit] = useState(false)
  const deleteTodo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todos.name}?`)) {
      axios.delete(`https://localhost:7064/api/ToDos/${id}`).then(() => {props.getTodos()})
    }
  }

  return (
    <tr className='singleTodo col-md-5 m-4'>
      <td>{props.todos.name}</td>
      <td>{props.todos.moreInfo !== null ? 
      <p>{props.todos.moreInfo}</p> 
      : 
      <p>No Info Provided</p>}
      </td>  
        <td>{props.todos.done ? 'completed' : 'pending'}</td>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <td>
          <button id='taskEdit' onClick={() => setShowEdit(true)} className='m-1 rounded'>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>  
          <button id='taskDelete' className='m-1 rounded' onClick={() => deleteTodo(props.todos.toDoId)}>
            <FontAwesomeIcon icon={['fas', 'trash-can']} />
          </button>
          {showEdit &&
           <ToDosEdit
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            getTodos={props.getTodos}
            todos={props.todos} />
          }
        </td>                   
      }
  </tr>
  )
}
