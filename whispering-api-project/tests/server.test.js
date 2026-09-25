import request from 'supertest'
import app from '../server.js'

describe('API Whisper Routes', () => {
  let createdId

  it('GET /api/v1/whisper doit retourner un statut 200 et un tableau', async () => {
    const response = await request(app).get('/api/v1/whisper')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('POST /api/v1/whisper doit créer un nouveau murmure', async () => {
    const response = await request(app)
      .post('/api/v1/whisper')
      .send({ message: 'Mon premier test de murmure' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.message).toBe('Mon premier test de murmure')

    createdId = response.body.id
  })

  it('GET /api/v1/whisper/:id doit retourner un murmure spécifique', async () => {
    if (createdId) {
      const response = await request(app).get(`/api/v1/whisper/${createdId}`)
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Mon premier test de murmure')
    }
  })

  it('PUT /api/v1/whisper/:id doit mettre à jour un murmure', async () => {
    if (createdId) {
      const response = await request(app)
        .put(`/api/v1/whisper/${createdId}`)
        .send({ message: 'Murmure mis à jour !' })

      expect(response.status).toBe(200)

      const checkResponse = await request(app).get(`/api/v1/whisper/${createdId}`)
      expect(checkResponse.body.message).toBe('Murmure mis à jour !')
    }
  })

  it('DELETE /api/v1/whisper/:id doit supprimer le murmure', async () => {
    if (createdId) {
      const response = await request(app).delete(`/api/v1/whisper/${createdId}`)
      expect(response.status).toBe(200)
    }
  })
})