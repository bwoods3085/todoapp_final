import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory'
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'
import '../ToDos/ToDos.css'



export default function Categories(props) {

  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false);


  const getCategories = () => {
    axios.get(`https://localhost:7064/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <section className="categories">
      <br/>
      <article id='cat' className="p-4">
        <h1 className="text-center">Categories</h1>        
      </article>
      {/* CREATE UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div id='cat' className='pg-dark p-2 mb-3 text-center'>
          <button onClick={() => setShowCreate(!showCreate)} className="btn btn-danger">
            {!showCreate ? 'Create New Category' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate &&
                <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            }
          </div>
        </div>
      }      
      <Container className='p-2'>
        <article className='todoGallery row justify-content-center'>                                     
            {categories.map(x => 
              <SingleCategory
                  key={x.categoryId}  
                  category={x}
                  getCategories={getCategories} 
                  setFilter={props.setFilter} />
            )}          
        </article>
      </Container>
    </section>
  )
}
