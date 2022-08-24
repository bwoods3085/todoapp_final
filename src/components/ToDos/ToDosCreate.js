import React from 'react'
import ToDosForm from './ToDosForm'

export default function ToDosCreate(props) {
  return (
    <div className='createTodo m-2 text-center'>
      <ToDosForm
        categories={props.categories}
        setCategories={props.setCategories}
        getTodos={props.getTodos}
        setShowCreate={props.setShowCreate} />
    </div>
  )
}
