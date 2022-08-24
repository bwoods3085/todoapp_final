import React from 'react'
import { Formik, Form, Field } from 'formik'
import {catSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {
    
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category) {
            const catToCreate = values
            axios.post(`https://localhost:7064/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)
                props.getCategories()
            }) 
        }
    
        else {
        const catToEdit = {
            categoryId: props.category.categoryId,
            catName: values.catName,
            catDesc: values.catDesc
            }

            axios.put(`http://localhost:7064/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.getCategories()
                props.setShowEdit(false)
            })
        }
    }

  return (
    <Formik 
    initialValues={{
        catName: props.category ? props.category.catName : '',        
        catDesc: props.category ? props.category.catDesc : ''        
    }}
    validationSchema={catSchema}
    onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='catForm'>
                <div className="form-group m-3">
                    <Field name='catName' className='form-control' placeholder='Name' />
                    {/* Below we add validation UI */}
                    {errors.catName && touched.catName ? (
                        <div className="text-danger">{errors.catName}</div>
                    ) : null}
                </div>                                
                <div className="form-group m-3">
                <Field as='textarea' name='catDesc' className='form-control' placeholder='Description' style={{resize: 'none', height: '5em'}} />
                    {/* Below we add validation UI */}
                    {errors.catDesc && touched.catDesc ? (
                        <div className="text-danger">{errors.catDesc}</div>
                    ) : null}
                </div>                
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-info m-3">
                        Submit Categories to API
                    </button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
