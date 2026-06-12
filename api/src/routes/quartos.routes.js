const express = require('express')
const router = express.Router()
const controller = require('../controllers/quartos.controllers')

router.get('/', controller.listar)
router.post('/', controller.cadastrar)
router.delete('/:id', controller.excluir)

module.exports = router