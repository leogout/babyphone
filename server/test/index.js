const request = require('supertest')
const app = require('../app')

describe('GET /random-url', () => {
  it('should return 404 error', (done) => {
    request(app)
      .get('/random-url')
      .expect(404, done)
  })
})
