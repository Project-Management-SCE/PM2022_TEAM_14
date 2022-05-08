const request = require('supertest')
const app = require('./app')
const server = require('./server')

jest.useFakeTimers('legacy')
describe("Integration Testing backend and frontend", () => {
    beforeAll(async () => {

    })

    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await server.close();
    });

    describe("Testing post routes ", () => {

        test("Get all posts should respond with a 200 status code", async () => {
            const response = await request(app).get("/api/posts")
            expect(response.statusCode).toBe(200)
        })

        test("Delete post without permissions should respond with a 401 status code", async () => {
            const response = await request(app).delete("/api/posts/625723f2eb32216ea39da867")
            expect(response.statusCode).toBe(403)
        })

        test("Delete not existing post should respond with a 403 status code", async () => {
            const response = await request(app).delete("/api/posts/6dsadasd")
            expect(response.statusCode).toBe(403)
        })

        test("Update post without permissions should respond with a 403 status code", async () => {
            const response = await request(app).patch("/api/posts/625723f2eb32216ea39da867").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
        })

        test("Update not existing post should respond with a 403 status code", async () => {
            const response = await request(app).patch("/api/posts/6dsadasd").send({title : 'test', description: 'test'})
            expect(response.statusCode).toBe(403)
        })
    })


    describe("Testing user routes ", () => {

        test("Get all users without permissions should respond with a 403 status code", async () => {
            const response = await request(app).get("/api/users")
            expect(response.statusCode).toBe(403)
        })

        test("Login with wrong values should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/users/login").send({})
            expect(response.statusCode).toBe(500)
        })

        test("Delete not existing user should respond with a 403 status code", async () => {
            const response = await request(app).delete("/api/users/dasdsa")
            expect(response.statusCode).toBe(403)
        })

        test("Update user info without permissions should respond with a 403 status code", async () => {
            const response = await request(app).patch("/api/users/625723f2eb32216ea39da867").send({name : 'test', email: 'test'})
            expect(response.statusCode).toBe(403)
        })
    })


    describe("Testing admin routes ", () => {

        test("Get all admin post a 200 status code", async () => {
            const response = await request(app).get("/api/admin/post")
            expect(response.statusCode).toBe(200)
        })

        test("Create post with wrong values should respond with a 403 status code", async () => {
            const response = await request(app).post("/api/admin/post/123123").send({})
            expect(response.statusCode).toBe(403)
        })
    })

})

