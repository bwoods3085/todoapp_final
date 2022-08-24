import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ToDos/ToDos.css'
//Edit Functionality
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CatEdit from './CatEdit'

library.add(fas)

export default function SingleCategory(props) {
  //Getting currentUser
  const { currentUser } = useAuth()
  //Hook for open/close Edit Modal
  const [showEdit, setShowEdit] = useState(false);

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)) {
      axios.delete(`https://localhost:7064/api/Categories/${id}`).then(() => {props.getCategories()})
    }
  }

  const navigate = useNavigate()
  const goToTasks = (filter) => {
    props.setFilter(filter)
    return navigate('/ToDos')
  }

  return (
    <div id='catCard' className='singleTodo col-md-5 m-4'>
    {/* EDIT UI */}
    {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
      <div>
        <button id='editLink' onClick={() => setShowEdit(true)}>
          <FontAwesomeIcon icon={['fas', 'edit']} />            
        </button>
        <button id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
          <FontAwesomeIcon icon={['fas', 'trash-can']} />
        </button>
          {showEdit &&
            <CatEdit
              category={props.category}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getCategories={props.getCategories} />
          }
      </div>
    }
      <h3>{props.category.catName}</h3>
       {props.category.catDesc !== null ?
        <p>{props.category.catDesc}</p> :
        <p>No Description Provided</p>
       }

        <button id='category' className='btn btn-danger' onClick={() => goToTasks(props.category.categoryId)} >
        Tasks 
      </button>        
    </div>
  )
}
