// testing library
const { createTestClient } = require("apollo-server-integration-testing");

const dbHandler = require("./dbHandler")
const createTestServer = require("../testServer")

beforeAll(async () => await dbHandler.connect())

afterAll(async () => await dbHandler.closeDatabase())

test("resolvers", async () => {
    const server = createTestServer()
    console.log(createTestClient)
    const { query, mutate } = createTestClient({
        apolloServer: server,
        extendMockRequest: { session: { userId: null } }
    })

    const registerTest = `{register(email:"abCd@gmail.com",password:"abCd1!"){email id}`
    //   {
    //     register(email:"abCd@gmail.com", password:"abCd1!") {
    //       email
    //       id
    //     }
    //   }
    //   `
    // const loginTest = `
    // {
    //     login(email:"abCd@gmail.com", password:"abCd1!"){
    //         email
    //         id
    //     }
    // }
    // `
    const response = await query(registerTest);
    expect(response.data.login.email).toEqual("abCd@gmail.com");
})