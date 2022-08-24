import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import './ToDos.css'
import '../Custom.css'
import SingleToDo from './SingleToDo';
import FilterCat from './FilterCat';
import { useAuth } from '../../contexts/AuthContext'
import ToDosCreate from './ToDosCreate'


export default function ToDos(props) {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([])
  const [showCreate, setShowCreate] = useState(false);
  const { currentUser } = useAuth()

  const getTodos = () => {
    axios.get(`https://localhost:7064/api/ToDos`).then(response => {
      setTodos(response.data)
      console.log(response)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <section className="todos p-3">
      <article id='prep' className=" p-5">
        <h1 className="text-center text-white">Preparation Checklists..</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div id='prep' className="bg-dark p-2 m-3 text-center">
            {showCreate ?
              <>
                  <button onClick={() => setShowCreate(false)} className="btn btn-danger">Cancel</button>
                  <ToDosCreate
                      categories={categories}
                      setCategories={setCategories}
                      getTodos={getTodos}
                      setShowCreate={setShowCreate} />
              </>
            : <button onClick={() => setShowCreate(true)} className='btn btn-danger'>Create Task</button>
            }
          </div>
      }
        <FilterCat setFilter={props.setFilter} setCategories={setCategories}/>
      <Container>
        <table id='table' className="table table-striped bg-dark table-light mt-3 mb-0 ">
          <thead id='head' className='table-secondary text-uppercase'>
            <tr>
              <th>Task {props.filter !== 0 && <span>({categories})</span>}</th>
              <th>More Info</th>
              <th>Done</th>
              {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                <th>Actions</th>
              }
            </tr>            
          </thead>
          <tbody>            
          {props.filter === 0 ? todos.map(x =>
            <SingleToDo
                key={x.toDoId}
                todos={x} 
                getTodos={getTodos} />
          ) : todos.filter(x => x.categoryId === props.filter).map(x =>
              <SingleToDo
                key={x.toDoId}
                todos={x}
                getTodos={getTodos} />  
          )
          }
          </tbody>

        </table>
          {props.filter !== 0 && todos.filter(x => x.categoryId === props.filter).length === 0 &&
                    <h2 className='alert alert-danger text-dark'>
                        There are no results for this Category
                    </h2>
          }
      </Container>
    </section>
  )
}
