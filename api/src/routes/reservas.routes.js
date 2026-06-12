const express = require('express')
const router = express.Router()
const controller = require('../controllers/reservas.controllers')

router.get('/quarto/:quarto_id', controller.listarPorQuarto)
router.post('/', controller.cadastrar)
router.delete('/:id', controller.excluir)

module.exports = router