import React from 'react'
import CatForm from './CatForm'

export default function CatCreate(props) {
  return (
    <article className="createCat m-2 text-white justify-content-center">
        <CatForm   
            setShowCreate={props.setShowCreate}
            getCategories={props.getCategories} />
    </article>
  )
}
