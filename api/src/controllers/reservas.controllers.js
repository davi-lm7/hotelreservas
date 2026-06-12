const prisma = require('../data/prisma')

const listarPorQuarto = async (req, res) => {
  const { quarto_id } = req.params
  const reservas = await prisma.reserva.findMany({
    where: { quarto_id: Number(quarto_id) }
  })
  res.json(reservas)
}

const cadastrar = async (req, res) => {
  const { hospede, data_entrada, data_saida, quarto_id } = req.body
  const reserva = await prisma.reserva.create({
    data: {
      hospede,
      data_entrada: new Date(data_entrada),
      data_saida: new Date(data_saida),
      quarto_id: Number(quarto_id)
    }
  })
  res.status(201).json(reserva)
}

const excluir = async (req, res) => {
  const { id } = req.params
  await prisma.reserva.delete({
    where: { id: Number(id) }
  })
  res.json({ mensagem: 'Reserva excluída com sucesso' })
}

module.exports = { 
    listarPorQuarto, 
    cadastrar, 
    excluir 
}