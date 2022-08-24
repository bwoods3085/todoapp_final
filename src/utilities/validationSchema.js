import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Max 25 characters').required('Required Field'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required('Required Field'),
    moreInfo: Yup.string(),
    done: Yup.bool().required('Required'),
    categoryId: Yup.number().required()
})

export {todoSchema}
export {catSchema}