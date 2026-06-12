const prisma = require('../data/prisma')

const listar = async (req, res) => {
  const quartos = await prisma.quarto.findMany()
  res.json(quartos)
}

const cadastrar = async (req, res) => {
  const { numero, tipo } = req.body
  const quarto = await prisma.quarto.create({
    data: { numero, tipo }
  })
  res.status(201).json(quarto)
}

const excluir = async (req, res) => {
  const { id } = req.params
  await prisma.quarto.delete({
    where: { id: Number(id) }
  })
  res.json({ mensagem: 'Quarto excluído com sucesso' })
}

module.exports = { 
    listar, 
    cadastrar, 
    excluir 
}