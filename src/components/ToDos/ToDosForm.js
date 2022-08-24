import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { todoSchema} from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDosForm(props) {

    

    const getCategories = () => {
        axios.get(`https://localhost:7064/api/Categories`).then(response => props.setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todos) {
            const todoToCreate = {
                name: values.name,
                moreInfo: values.moreInfo,
                done: false,
                categoryId: values.categoryId
            }

            axios.post(`https://localhost:7064/api/ToDos`, todoToCreate).then(() => {
                props.setShowCreate(false)
                props.getTodos()
            })
        }
        else {
            const todoToEdit = {
                toDoId: props.todos.toDoId,
                name: values.name,
                moreInfo: values.moreInfo,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7064/api/ToDos/${props.todos.toDoId}`, todoToEdit).then(() => {
                props.getTodos()
                props.setShowEdit(false)
            })

        }
    }

    useEffect(() => {
      getCategories()
    }, [])

  return (
    <Formik 
        initialValues={{
            name: props.todos ? props.todos.name : '',            
            moreInfo: props.todos ? props.todos.moreInfo : '',
            done: props.todos ? props.todos.done : false,
            categoryId: props.todos ? props.todos.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={values => handleSubmit(values)}>
            {({errors, touched}) => (
                <Form id='todoForm'>
                    <div className="form-group m-3">
                        <Field name='name' className='form-control' placeholder='Name' />
                        {/* Below we add validation UI */}
                        {errors.name && touched.name ? (
                            <div className="text-danger">{errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group m-3">
                        <Field name='moreInfo' className='form-control' placeholder='Additional Info' />
                        {/* Below we add validation UI */}
                        {errors.moreInfo && touched.moreInfo ? (
                            <div className="text-danger">{errors.moreInfo}</div>
                        ) : null}
                    </div>                                      
                    <div className="form-group m-3">
                        <Field as='select' name='categoryId' className='form-control'>
                            <option value='' disabled>**Select a Category**</option>
                            {/* We will map an option for every Category in our API */}
                            {props.categories.map(x =>
                                <option key={x.categoryId} value={x.categoryId}>
                                    {x.catName}
                                </option>
                            )}
                        </Field>
                    </div>
                    <div className="form-group m-3">
                        <button type='submit' className="btn btn-danger m-3">
                            Submit Task to API
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
  )
}
