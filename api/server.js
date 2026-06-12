require('dotenv').config()
const express = require('express')
const cors = require('cors')

const quartosRoutes = require('./src/routes/quartos.routes')
const reservasRoutes = require('./src/routes/reservas.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/quartos', quartosRoutes)
app.use('/reservas', reservasRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})