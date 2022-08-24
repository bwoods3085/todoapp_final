import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDosForm from './ToDosForm'

export default function ToDosEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'>
            <Modal.Header>
                <h2>Editing {props.todos.name}</h2>
            </Modal.Header>
            <Modal.Body>
                <ToDosForm
                    setShowEdit={props.setShowEdit}
                    getTodos={props.getTodos}
                    todos={props.todos} />
            </Modal.Body>
    </Modal>
  )
}
