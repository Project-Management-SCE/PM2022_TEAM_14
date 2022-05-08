const request = require('supertest')
const app = require('./app')
const server = require('./server')

jest.useFakeTimers('legacy')
describe("Integration Testing backend and frontend", () => {
    beforeAll(async () => {

    })

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        await server.close();
        done()
    });

    describe("Testing post routes ", () => {

        test("Get all posts should respond with a 200 status code", async (done) => {
            const response = await request(app).get("/api/posts")
            expect(response.statusCode).toBe(200)
        })

        test("Delete post without permissions should respond with a 401 status code", async (done) => {
            const response = await request(app).delete("/api/posts/625723f2eb32216ea39da867")
            expect(response.statusCode).toBe(403)
            done()
        })



        test("Update post without permissions should respond with a 403 status code", async (done) => {
            const response = await request(app).patch("/api/posts/625723f2eb32216ea39da867").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
            done()
        })



        test("Update not existing post should respond with a 403 status code", async (done) => {
            const response = await request(app).patch("/api/posts/6dsadasd").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
            done()
        })
    })

    describe("Testing user routes ", () => {

        test("Get all users without permissions should respond with a 403 status code", async (done) => {
            const response = await request(app).get("/api/users")
            expect(response.statusCode).toBe(403)
            done()
        })

    })

})

