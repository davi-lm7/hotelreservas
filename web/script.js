const API = 'http://localhost:3000'

function abrirModal(id) {
  document.getElementById(id).classList.add('ativo')
}

function fecharModal(id) {
  document.getElementById(id).classList.remove('ativo')
}

function formatarData(dataISO) {
  return dataISO.split('T')[0].split('-').reverse().join('/')
}

async function carregarQuartos() {
  const tbody = document.getElementById('lista-quartos')
  if (!tbody) return

  const res = await fetch(`${API}/quartos`)
  const quartos = await res.json()

  if (quartos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum quarto cadastrado.</td></tr>'
    return
  }

  tbody.innerHTML = quartos.map(q => `
    <tr>
      <td>${q.numero}</td>
      <td>${q.tipo}</td>
      <td style="display:flex; gap:8px">
        <button class="botao botao-sucesso" onclick="verReservas(${q.id}, '${q.numero}', '${q.tipo}')">
          👁 Ver Reservas
        </button>
        <button class="botao botao-perigo" onclick="confirmarExcluirQuarto(${q.id}, '${q.numero}')">
          🗑 Excluir
        </button>
      </td>
    </tr>
  `).join('')
}

function verReservas(id, numero, tipo) {
  localStorage.setItem('quarto', JSON.stringify({ id, numero, tipo }))
  location.href = 'reservas.html'
}

let quartoIdParaExcluir = null

function confirmarExcluirQuarto(id, numero) {
  quartoIdParaExcluir = id
  document.getElementById('modal-quarto-texto').textContent =
    `Deseja realmente excluir o quarto ${numero}?`
  abrirModal('modal-excluir-quarto')

  document.getElementById('btn-confirmar-excluir').onclick = async () => {
    await fetch(`${API}/quartos/${quartoIdParaExcluir}`, { method: 'DELETE' })
    fecharModal('modal-excluir-quarto')
    carregarQuartos()
  }
}

async function cadastrarQuarto() {
  const numero = document.getElementById('numero').value.trim()
  const tipo = document.getElementById('tipo').value

  if (!numero || !tipo) {
    alert('Preencha todos os campos!')
    return
  }

  await fetch(`${API}/quartos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numero, tipo })
  })

  alert('Quarto cadastrado com sucesso!')
  location.href = 'index.html'
}

function carregarDadosQuarto() {
  const quarto = JSON.parse(localStorage.getItem('quarto'))
  if (!quarto) { location.href = 'index.html'; return null }

  const titulo = document.getElementById('titulo-quarto')
  const tipo = document.getElementById('tipo-quarto')
  if (titulo) titulo.textContent = `Reservas do Quarto ${quarto.numero}`
  if (tipo) tipo.textContent = `Tipo: ${quarto.tipo}`

  return quarto
}

async function carregarReservas() {
  const tbody = document.getElementById('lista-reservas')
  if (!tbody) return

  const quarto = carregarDadosQuarto()
  if (!quarto) return

  const res = await fetch(`${API}/reservas/quarto/${quarto.id}`)
  const reservas = await res.json()

  if (reservas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Nenhuma reserva encontrada.</td></tr>'
    return
  }

  tbody.innerHTML = reservas.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.hospede}</td>
      <td>${formatarData(r.data_entrada)}</td>
      <td>${formatarData(r.data_saida)}</td>
      <td>
        <button class="botao botao-perigo" onclick="confirmarExcluirReserva(${r.id})">
          🗑 Excluir
        </button>
      </td>
    </tr>
  `).join('')
}

function confirmarExcluirReserva(id) {
  abrirModal('modal-excluir-reserva')

  document.getElementById('btn-confirmar-excluir-reserva').onclick = async () => {
    await fetch(`${API}/reservas/${id}`, { method: 'DELETE' })
    fecharModal('modal-excluir-reserva')
    carregarReservas()
  }
}

function carregarSubtituloReserva() {
  const quarto = JSON.parse(localStorage.getItem('quarto'))
  const subtitulo = document.getElementById('subtitulo-reserva')
  if (quarto && subtitulo) {
    subtitulo.textContent = `Quarto: ${quarto.numero} - ${quarto.tipo}`
  }
}

async function cadastrarReserva() {
  const quarto = JSON.parse(localStorage.getItem('quarto'))
  const hospede = document.getElementById('hospede').value.trim()
  const data_entrada = document.getElementById('data_entrada').value
  const data_saida = document.getElementById('data_saida').value

  if (!hospede || !data_entrada || !data_saida) {
    alert('Preencha todos os campos!')
    return
  }

  await fetch(`${API}/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hospede, data_entrada, data_saida, quarto_id: quarto.id })
  })

  alert('Reserva cadastrada com sucesso!')
  location.href = 'reservas.html'
}

carregarQuartos()
carregarReservas()
carregarSubtituloReserva()