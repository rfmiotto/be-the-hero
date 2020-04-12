const request = require('supertest')
const app = require('../../src/app')
connection = require('../../src/database/connections')

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new NGO', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "NGOname",
            email: "apae@domain.com",
            whatsapp: "11999999999",
            city: "Sao Paulo",
            uf: "SP"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})