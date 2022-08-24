import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Custom.css'

export default function FilterCat(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7064/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)            
        })
    }, [])

    const handleFilter = (cat, catName) => {
      props.setFilter(cat)
      props.setCategories(catName)
    }


  return (
    <div className='text-center mt-5'>
      {/* <button onClick={() => props.setFilter(0)} className="catButton btn btn-outline-light bg-danger m-1">
        All
      </button> */}
      {categories.map(x => 
        <button id='catButton' key={x.categoryId} className="btn btn-outline-light  m-1" onClick={() => handleFilter
            (Number(x.categoryId), x.catName)}>
            {x.catName}
        </button>
      )}
    </div>
  )
}
