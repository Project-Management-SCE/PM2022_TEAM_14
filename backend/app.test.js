const request = require('supertest')
const app = require('./app')
const server = require('./server')

jest.useFakeTimers('legacy')
describe("Integration Testing backend and frontend", () => {
    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
      await server.close();
    });

    describe("Testing post routes ", () => {

        test("Update post without permissions should respond with a 403 status code", async () => {
            const response = await request(app).patch("/api/posts/625723f2eb32216ea39da867").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
        })

        test("Update not existing post should respond with a 403 status code", async () => {
            const response = await request(app).patch("/api/posts/6dsadasd").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
        })
    })

})

