import express from 'express'
import bodyParser from 'body-parser'
import * as store from './store.js'

const app = express()

app.use(bodyParser.json())

// GET /api/v1/whisper : Obtenir tous les chuchotements
app.get('/api/v1/whisper', async (req, res) => {
  const whispers = await store.getAll()
  res.json(whispers)
})

// GET /api/v1/whisper/:id : Obtenir un murmure par ID
app.get('/api/v1/whisper/:id', async (req, res) => {
  const whisper = await store.getById(req.params.id)
  if (!whisper) {
    return res.status(404).json({ error: "Murmure introuvable" })
  }
  res.json(whisper)
})

// POST /api/v1/whisper : Créer un nouveau murmure
app.post('/api/v1/whisper', async (req, res) => {
  const newWhisper = await store.create(req.body.message)
  res.status(201).json(newWhisper)
})

// PUT /api/v1/whisper/:id : Mettre à jour un murmure par ID
app.put('/api/v1/whisper/:id', async (req, res) => {
  await store.updateById(req.params.id, req.body.message)
  res.sendStatus(200)
})

// DELETE /api/v1/whisper/:id : Supprimer un murmure par ID
app.delete('/api/v1/whisper/:id', async (req, res) => {
  await store.deleteById(req.params.id)
  res.sendStatus(200)
})

export default app