import express from 'express'
import bodyParser from 'body-parser'
import * as store from './store.js'

const app = express()

// Configuration du moteur de template et des fichiers statiques
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

// --- Routes API REST ---
app.get('/api/v1/whisper', async (req, res) => {
  const whispers = await store.getAll()
  res.json(whispers)
})

app.get('/api/v1/whisper/:id', async (req, res) => {
  const whisper = await store.getById(req.params.id)
  if (!whisper) {
    return res.status(404).json({ error: "Murmure introuvable" })
  }
  res.json(whisper)
})

app.post('/api/v1/whisper', async (req, res) => {
  const newWhisper = await store.create(req.body.message)
  res.status(201).json(newWhisper)
})

app.put('/api/v1/whisper/:id', async (req, res) => {
  await store.updateById(req.params.id, req.body.message)
  res.sendStatus(200)
})

app.delete('/api/v1/whisper/:id', async (req, res) => {
  await store.deleteById(req.params.id)
  res.sendStatus(200)
})

// --- Route pour la page d'accueil / à propos (Vue EJS) ---
app.get('/about', async (req, res) => {
  const whispers = await store.getAll()
  res.render('about', { whispers })
})

export default app