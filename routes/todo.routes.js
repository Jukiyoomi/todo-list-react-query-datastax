const { getTodos, getCompletedTodos, getNonCompletedTodos, createTodo, deleteTodo, updateTodo} = require('../controllers/todo.controllers')

const router = require('express').Router()

router.get('/all', getTodos)
router.get('/completed', getCompletedTodos)
router.get('/non-completed', getNonCompletedTodos)

router.post('/new', createTodo)
router.patch('/update/:id', updateTodo)

router.delete('/delete/:id', deleteTodo)

module.exports = router
