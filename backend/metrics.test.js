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

        test("Get user metrics only for users with token", async () => {
            const response = await request(app).get("/api/users/stats");
            expect(response.statusCode).toBe(403)
        })


    })


    describe("Metrics for posts ", () => {
        test("Get post metrics only for users with token", async () => {
            const response = await request(app).get("/api/posts/stats");
            expect(response.statusCode).toBe(403)
        })
    })


})

