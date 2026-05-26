import { api, getUser, requireAuth } from '../api.js'

if (!requireAuth()) throw new Error('auth')
const user = getUser()
if (user?.is_admin) window.location.href = '/admin.html'

const form = document.getElementById('record-form')
const alertBox = document.getElementById('form-alert')

function hint(name, msg) {
  const el = document.getElementById(`${name}-hint`)
  if (el) el.textContent = msg || ''
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  alertBox.classList.add('d-none')
  hint("room_type", '')
  hint("start_date", '')
  hint("payment_method", '')
  const payload = {}
  payload["room_type"] = form["room_type"].value.trim()
  payload["start_date"] = form["start_date"].value.trim()
  payload["payment_method"] = form["payment_method"].value.trim()
  let ok = true
  if (!payload["room_type"] || (typeof payload["room_type"] === 'string' && !payload["room_type"])) {
    hint("room_type", "Тип помещения: обязательно")
    ok = false
  }
  if (!payload["start_date"] || (typeof payload["start_date"] === 'string' && !payload["start_date"])) {
    hint("start_date", "Дата начала банкета: обязательно")
    ok = false
  }
  if (!payload["payment_method"] || (typeof payload["payment_method"] === 'string' && !payload["payment_method"])) {
    hint("payment_method", "Способ оплаты: обязательно")
    ok = false
  }
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(payload["start_date"])) {
    hint("start_date", 'Формат ДД.ММ.ГГГГ')
    ok = false
  }
  if (!ok) return
  try {
    await api('/records', { method: 'POST', body: JSON.stringify(payload) })
    alertBox.textContent = 'Запись создана'
    alertBox.className = 'alert alert-success alert-inline'
    alertBox.classList.remove('d-none')
    form.reset()
    setTimeout(() => (window.location.href = '/cabinet.html'), 700)
  } catch (err) {
    alertBox.textContent = err.message
    alertBox.className = 'alert alert-warning alert-inline'
    alertBox.classList.remove('d-none')
  }
})
