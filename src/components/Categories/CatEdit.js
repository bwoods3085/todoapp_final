import React from 'react'
import { Modal } from 'react-bootstrap'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header className='bg-danger' closeButton>
                <h3>Editing {props.category.catName}</h3>
            </Modal.Header>
            <Modal.Body>
                <CatForm
                    category={props.category}
                    setShowEdit={props.category}
                    getCategories={props.getCategories} />
            </Modal.Body>
    </Modal>    
  )
}
