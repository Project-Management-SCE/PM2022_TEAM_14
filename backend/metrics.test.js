const request = require('supertest')
const app = require('./app')
const server = require('./server')

jest.useFakeTimers('legacy')
describe("Metrics tests", () => {
    beforeAll(async () => {

    })

    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await server.close();
    });

    describe("Metrics Test for users ", () => {

        // test("Get all posts should respond with a 200 status code", async () => {
        //     const response = await request(app).get("/api/posts")
        //     expect(response.statusCode).toBe(200)
        // })

    })


    describe("Metrics for posts ", () => {

        // test("Update user info without permissions should respond with a 403 status code", async () => {
        //     const response = await request(app).patch("/api/users/625723f2eb32216ea39da867").send({name : 'test', email: 'test'})
        //     expect(response.statusCode).toBe(403)
        // })

    })


})

