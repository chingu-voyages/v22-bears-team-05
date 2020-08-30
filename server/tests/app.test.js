// testing library
const { createTestClient } = require("apollo-server-integration-testing");

const dbHandler = require("./dbHandler")
const createTestServer = require("../testServer")

beforeAll(async () => await dbHandler.connect())

afterAll(async () => await dbHandler.closeDatabase())

test("resolvers", async () => {
    const server = createTestServer()
    const { query, mutate, setOptions } = createTestClient({
        apolloServer: server,
    })
    setOptions({ request: { session: { userId: null } } })

    const registerTest = `
    mutation Register($email: String!, $password: String!, $confirmPassword: String!){
        register(email: $email, password: $password, confirmPassword: $confirmPassword){
            email
            id
        }
    }
`
    // const loginTest = `
    // login
    // mutation Login($email: String!, $password: String!){
    //     login(email: $email, password: $password){
    //         email
    //         id
    //     }
    // }
    // `

    const response = await mutate(registerTest, { variables: { email: "abCd@gmail.com", password: "abCd1!", confirmPassword: "abCd1!" } });
    console.log(response)
    expect(response.data.register.email).toEqual("abCd@gmail.com");
})